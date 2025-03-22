import os
import torch
import librosa
import tempfile
from flask import Flask, request, jsonify
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2FeatureExtractor, pipeline
from urgency_analysis import get_urgency_analysis
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
EMOTION_LABELS = [
    "Neutral", "Happy", "Sad", "Angry", "Fearful", "Disgusted", "Surprised"
]

MODEL_NAME = "superb/wav2vec2-base-superb-er"
LOCAL_MODEL_DIR = "."
LOCAL_FEATURE_EXTRACTOR_DIR = "."

pipe = pipeline("automatic-speech-recognition", model="openai/whisper-base")

def load_model():
    """Load the model and feature extractor from local or Hugging Face"""
    try:
        model_files_exist = any(f.startswith("pytorch_model") for f in os.listdir(LOCAL_MODEL_DIR))
        config_file_exists = os.path.exists(os.path.join(LOCAL_MODEL_DIR, "config.json"))
        feature_extractor_exists = os.path.exists(os.path.join(LOCAL_FEATURE_EXTRACTOR_DIR, "preprocessor_config.json"))
        
        if model_files_exist and config_file_exists and feature_extractor_exists:
            print("Loading model and feature extractor from local files...")
            feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(LOCAL_FEATURE_EXTRACTOR_DIR)
            model = Wav2Vec2ForSequenceClassification.from_pretrained(LOCAL_MODEL_DIR)
        else:
            print("Local files not found. Loading model from Hugging Face...")
            feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(MODEL_NAME)
            model = Wav2Vec2ForSequenceClassification.from_pretrained(MODEL_NAME)
        
        return model, feature_extractor
    except Exception as e:
        print(f"Error loading model: {e}")
        from transformers import AutoFeatureExtractor, AutoModelForAudioClassification
        feature_extractor = AutoFeatureExtractor.from_pretrained(MODEL_NAME)
        model = AutoModelForAudioClassification.from_pretrained(MODEL_NAME)
        return model, feature_extractor

model, feature_extractor = load_model()
model.eval()

def predict_emotion(temp_path):
    try:

        speech_array, sampling_rate = librosa.load(temp_path, sr=16000)
        inputs = feature_extractor(speech_array, sampling_rate=sampling_rate, return_tensors="pt")

        with torch.no_grad():
            logits = model(**inputs).logits
        predicted_class_id = torch.argmax(logits, dim=-1).item()
        predicted_emotion = EMOTION_LABELS[predicted_class_id]

        return predicted_emotion
    
    except Exception as e:
        print(f"Prediction error: {e}")
        return "error"


@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
        
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    allowed_extensions = {'wav', 'mp3', 'm4a'}
    if '.' not in file.filename or file.filename.split('.')[-1].lower() not in allowed_extensions:
        return jsonify({"error": "Invalid file format. Supported formats: WAV, MP3, M4A"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name

        result = pipe(tmp_path)
        transcription = result['text']
        print("Transcription done:", transcription)

        emotion_response = predict_emotion(tmp_path)
        print("Emotion detected:", emotion_response)

        os.unlink(tmp_path)
        urgency_analysis = get_urgency_analysis(transcription, emotion_response)
        urgency_analysis["emotion"] = emotion_response
        urgency_analysis["transcription"] = transcription
        return jsonify({
            "status": "success",
            "audio_data": urgency_analysis
        })

    except Exception as e:
        print(e)
        return jsonify({
            "status": "error",
            "message": f"Error processing file: {str(e)}"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
