# KTUN

# 🚨 AI & Blockchain-Powered Police Complaint Management System

A cutting-edge emergency response and FIR filing system leveraging **AI**, **blockchain**, and **decentralized storage** to solve deep-rooted issues in complaint handling and law enforcement transparency.

---

## 🌟 Overview

This platform enables **citizens** to raise emergency complaints via **voice or text**, which are then analyzed by an AI engine to assign **priority levels**. Authorities are automatically dispatched, real-time tracking is initiated, and every action is recorded on the **EDUCHAIN blockchain** to prevent tampering.

Our solution restores **public trust** in emergency services and law enforcement by making the complaint process **secure, trackable, and transparent**.

---

## 🔍 Key Problems Solved

- **FIR Tampering & Delays**  
  Immutable blockchain records make manipulation impossible and automate escalation.

- **Lack of Transparency**  
  Real-time tracking of officer response and case status visible to users.

- **Inefficient Complaint Handling**  
  AI prioritizes urgent cases and routes them automatically to the right personnel.

- **Privacy Risks**  
  Decentralized storage ensures data privacy with verifiable access controls.

---

## 💡 Core Features

### 🧠 1. AI-Based Voice & Text Complaint Analysis
- Citizens can file complaints via call or text.
- Ollama running **DeepSeek R1 8B** parses the content and urgency.
- Assigns a **priority score** (e.g. red = critical, yellow = moderate).

### 🚔 2. Officer Auto-Assignment & SLA Tracking
- Nearest available officer is automatically notified.
- Officers must update:
  - 📍 Live location
  - 🚨 Status (en route, investigating, resolved)
- Tracks SLA (response time, handling time) compliance.

### 🔗 3. Blockchain-Powered FIR Recording
- Each case, once verified, becomes a **smart contract-backed FIR**.
- Stored immutably on **EDUCHAIN** using Solidity smart contracts.
- All updates are version-controlled and cryptographically signed.

### 🗄️ 4. IPFS-Based Complaint & Evidence Storage
- Complaint forms, voice logs, and attachments are uploaded to **IPFS**.
- Access is controlled through encryption and smart contracts.
- Protects from leaks, deletion, or unauthorized viewing.

### 🔁 5. Escalation Engine for Inaction
- AI auto-monitors every complaint.
- If no action is taken in X minutes:
  - Escalates to higher authority (e.g. DSP, SP)
  - Sends reminders via Telegram/Web interface

### 🤖 6. Telegram Bot Interface (for Citizens)
- Citizens can use a **Telegram WebApp bot** to:
  - Submit complaints with voice/text/image
  - Track complaint status
  - View FIR logs and assigned officer details

---

## 🧬 Novelty & Differentiators

| Feature                            | What's Unique |
|-----------------------------------|---------------|
| AI + Blockchain Hybrid System     | Not just analytics or logging—our AI prioritizes, routes, and escalates complaints, while blockchain guarantees record immutability. |
| Telegram Bot for Instant Access   | Makes decentralized tech accessible via familiar interfaces like Telegram. |
| End-to-End Transparency           | Users track every action from submission to resolution in real time. |
| Auto-Escalation with AI & SLA     | Escalation isn’t manual—it’s SLA-based and tracked algorithmically. |
| ZK-Friendly Design                | Future-ready for Zero-Knowledge Proof integrations for privacy compliance. |

---

## 🧱 Tech Stack

| Layer        | Tools / Libraries                              |
|--------------|------------------------------------------------|
| 🧠 AI         | Ollama + DeepSeek R1 8B                        |
| 🌐 Frontend  | Next.js                                        |
| 🤖 Bot       | Node.js + Telegram Bot API                     |
| 🧾 Contracts | Solidity + Hardhat                             |
| 🔗 Chain     | EDUCHAIN                                       |
| 📦 Storage   | IPFS                                           |

---

## 📜 Smart Contract Address

> **EDUCHAIN Testnet**  
> `0xB339eae8a44256CB77DCbFe10138377cdeFaD5C9`
> `0xa64fEE7cED2C1AcE815aA35F705968eeC27fD620`

---

## 🚀 How to Run

1. Clone the repo  
2. `npm install && npm run dev` (Next.js frontend)  
3. `node index.js && node patrol_bot.js` (Telegram bot)  
4. `npx hardhat compile && npx hardhat deploy` (Smart contract)  
5. Run AI server using Ollama + DeepSeek model  

---

## ✉️ Contact

Interested in partnerships, pilots, or open-source collaboration?  
Drop us a message at [contact@email.com] or via Telegram!

---

> _“Justice delayed is justice denied — we make justice real-time, secure, and decentralized.”_
