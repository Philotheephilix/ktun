"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, ArrowLeft, MapPin, Camera, Mic, Upload, ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ComplaintTypeSelector } from "@/components/complaint-type-selector"

export default function NewComplaintPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [complaintType, setComplaintType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [contactMethod, setContactMethod] = useState("phone")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(6) // Go to confirmation step
    }, 2000)
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8 px-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <CheckCircle className="h-5 w-5" /> : i}
            </div>
            <span className="text-xs mt-1 hidden sm:block">
              {i === 1 ? "Type" : i === 2 ? "Location" : i === 3 ? "Evidence" : i === 4 ? "Contact" : "Review"}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PoliceConnect</span>
          </div>
          <Button variant="ghost" size="icon" asChild className="ml-4">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Register New Complaint</h1>
          <p className="text-muted-foreground mb-6">
            Please provide the details of your complaint. All information will be kept confidential.
          </p>

          {step < 6 && renderStepIndicator()}

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Complaint Type</CardTitle>
                <CardDescription>Select the type of complaint you want to register</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplaintTypeSelector selectedType={complaintType} onSelect={setComplaintType} />

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Brief Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Please describe the issue in detail"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/">Cancel</Link>
                </Button>
                <Button onClick={handleNext} disabled={!complaintType || !description}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Location Details</CardTitle>
                <CardDescription>Provide the location where the incident occurred</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Map View</p>
                    <p className="text-xs text-muted-foreground">Click to select location</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <MapPin className="h-4 w-4" />
                    Use Current Location
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Location
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter the address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location-notes">Additional Location Notes</Label>
                  <Textarea
                    id="location-notes"
                    placeholder="Provide any additional details about the location"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!location}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Evidence Submission</CardTitle>
                <CardDescription>Upload photos, videos, or audio recordings related to your complaint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                    <Camera className="h-8 w-8 mb-1" />
                    <span>Take Photo/Video</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                    <Upload className="h-8 w-8 mb-1" />
                    <span>Upload from Gallery</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                    <Mic className="h-8 w-8 mb-1" />
                    <span>Record Audio</span>
                  </Button>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">
                      No evidence? You can still submit your complaint without evidence.
                    </p>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <p className="text-sm text-center text-muted-foreground mb-4">No files uploaded yet</p>
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Upload Files
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evidence-description">Evidence Description</Label>
                  <Textarea id="evidence-description" placeholder="Describe the evidence you are submitting" rows={3} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Contact Information</CardTitle>
                <CardDescription>Provide your contact details so we can update you on your complaint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup
                    value={contactMethod}
                    onValueChange={setContactMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="contact-phone" />
                      <Label htmlFor="contact-phone">Phone Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="contact-sms" />
                      <Label htmlFor="contact-sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="contact-email" />
                      <Label htmlFor="contact-email">Email</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 5: Review & Submit</CardTitle>
                <CardDescription>Please review your complaint details before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Complaint Type</h3>
                    <p>{complaintType || "Noise Complaint"}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {description || "Loud music playing after hours from neighboring apartment"}
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Location</h3>
                    <p>{location || "123 Main Street, Cityville"}</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Evidence</h3>
                    <p className="text-sm text-muted-foreground">No files uploaded</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Contact Information</h3>
                    <p>John Doe</p>
                    <p>+1 (555) 000-0000</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Preferred contact method:{" "}
                      {contactMethod === "phone" ? "Phone Call" : contactMethod === "sms" ? "SMS" : "Email"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By submitting this complaint, I confirm that all information provided is true and accurate to the
                      best of my knowledge.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!termsAccepted || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Complaint"
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 6 && (
            <Card>
              <CardHeader className="text-center pb-2">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Complaint Submitted Successfully!</CardTitle>
                <CardDescription>Your complaint has been registered with the tracking ID:</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-muted p-4 rounded-md mb-6">
                  <p className="text-2xl font-bold tracking-wider">XYZ12345</p>
                </div>

                <div className="space-y-4 text-left mb-6">
                  <h3 className="font-medium">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Your complaint will be processed by our AI system</li>
                    <li>A police officer will be assigned to your case</li>
                    <li>You will receive updates via your preferred contact method</li>
                    <li>You can track the status of your complaint using your tracking ID</li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="flex-1">
                    <Link href={`/complaints/status/XYZ12345`}>Track Complaint</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/complaints/new">Register Another Complaint</Link>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="link" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

