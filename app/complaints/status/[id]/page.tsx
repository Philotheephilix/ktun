"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Shield, ArrowLeft, Phone, MessageSquare, Clock, AlertTriangle, PlusCircle, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ComplaintTimeline } from "@/components/complaint-timeline"

// Mock data for demonstration
const MOCK_COMPLAINT = {
  id: "ABC12345",
  status: "in_progress",
  location: "123 Main Street, Cityville",
  type: "Noise Complaint",
  summary: "Loud music playing after hours from neighboring apartment",
  createdAt: "2025-03-20T18:30:00Z",
  assignedOfficer: {
    name: "Officer John Smith",
    badge: "B-4567",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder.svg",
  },
  timeline: [
    {
      id: 1,
      status: "received",
      title: "Voicemail received",
      description: "Your complaint has been received via voicemail",
      timestamp: "2025-03-20T18:30:00Z",
      completed: true,
    },
    {
      id: 2,
      status: "processing",
      title: "AI processing completed",
      description: "Your complaint has been processed and categorized",
      timestamp: "2025-03-20T18:35:00Z",
      completed: true,
    },
    {
      id: 3,
      status: "assigned",
      title: "Police assigned",
      description: "Officer John Smith has been assigned to your case",
      timestamp: "2025-03-20T19:00:00Z",
      completed: true,
    },
    {
      id: 4,
      status: "dispatched",
      title: "Police dispatched",
      description: "Officer is en route to the location",
      timestamp: "2025-03-20T19:15:00Z",
      completed: true,
    },
    {
      id: 5,
      status: "arrived",
      title: "Police arrived",
      description: "Officer has arrived at the location",
      timestamp: "2025-03-20T19:30:00Z",
      completed: true,
    },
    {
      id: 6,
      status: "action",
      title: "Action taken",
      description: "Officer has addressed the issue with the neighbor",
      timestamp: "2025-03-20T19:45:00Z",
      completed: false,
    },
    {
      id: 7,
      status: "resolved",
      title: "Resolved",
      description: "Your complaint has been resolved",
      timestamp: null,
      completed: false,
    },
  ],
}

export default function ComplaintStatusPage() {
  const params = useParams()
  const complaintId = params.id as string
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, we would fetch the complaint data from an API
    // For now, we'll use the mock data
    setTimeout(() => {
      setComplaint(MOCK_COMPLAINT)
      setLoading(false)
    }, 1000)
  }, [complaintId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-blue-500"
      case "processing":
        return "bg-purple-500"
      case "assigned":
        return "bg-yellow-500"
      case "dispatched":
        return "bg-orange-500"
      case "arrived":
        return "bg-cyan-500"
      case "action":
        return "bg-indigo-500"
      case "resolved":
        return "bg-green-500"
      case "escalated":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            Resolved
          </Badge>
        )
      case "escalated":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500">
            Escalated
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">PoliceConnect</span>
        </div>
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading complaint information...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">PoliceConnect</span>
        </div>
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Complaint Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find a complaint with the ID: {complaintId}</p>
            <Button asChild>
              <Link href="/complaints/track">Try Another ID</Link>
            </Button>
          </CardContent>
        </Card>
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
            <Link href="/complaints/track">
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
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Complaint Status</CardTitle>
                  {getStatusBadge(complaint.status)}
                </div>
                <CardDescription>Tracking ID: {complaint.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplaintTimeline timeline={complaint.timeline} />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 pt-0">
                <div className="w-full">
                  <Separator className="my-4" />
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button className="gap-2 flex-1">
                      <PlusCircle className="h-4 w-4" />
                      Add Information
                    </Button>
                    {complaint.status === "resolved" && (
                      <Button variant="outline" className="gap-2 flex-1">
                        <ThumbsUp className="h-4 w-4" />
                        Submit Feedback
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                    <p>{complaint.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                    <p>{complaint.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Summary</h3>
                    <p>{complaint.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Officer</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={complaint.assignedOfficer.photo} alt={complaint.assignedOfficer.name} />
                  <AvatarFallback>
                    {complaint.assignedOfficer.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{complaint.assignedOfficer.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">Badge #{complaint.assignedOfficer.badge}</p>
                <div className="flex flex-col gap-2 w-full">
                  <Button variant="outline" className="gap-2 w-full">
                    <Phone className="h-4 w-4" />
                    Call Officer
                  </Button>
                  <Button variant="outline" className="gap-2 w-full">
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estimated Resolution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Estimated time to resolution</p>
                <p className="text-2xl font-bold">2-4 hours</p>
                <p className="text-xs text-muted-foreground mt-2">Last updated: {new Date().toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you need immediate assistance or have questions about your complaint, please contact our helpline.
                </p>
                <Button className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Helpline
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

