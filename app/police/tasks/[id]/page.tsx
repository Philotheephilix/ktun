"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  Shield,
  ArrowLeft,
  MapPin,
  Phone,
  MessageSquare,
  AlertTriangle,
  Camera,
  Upload,
  Mic,
  FileText,
  Send,
  Ambulance,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ComplaintTimeline } from "@/components/complaint-timeline"

// Mock data for demonstration
const MOCK_TASK = {
  id: "JKL12131",
  type: "Traffic Violation",
  description:
    "Cars speeding in residential area with children playing nearby. Multiple incidents reported over the past week. Residents are concerned about safety.",
  location: "101 Elm Street, Hamletville",
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
  },
  distance: "3.7 km",
  severity: "high",
  status: "urgent",
  timestamp: "2025-03-10T16:20:00Z",
  complainant: {
    name: "Sarah Williams",
    phone: "+1 (555) 234-5678",
    email: "sarah.williams@example.com",
  },
  evidence: [
    {
      id: 1,
      type: "image",
      url: "/placeholder.svg",
      description: "Photo of speeding car",
      timestamp: "2025-03-10T16:15:00Z",
    },
    {
      id: 2,
      type: "video",
      url: "/placeholder.svg",
      description: "Video of traffic situation",
      timestamp: "2025-03-10T16:18:00Z",
    },
    {
      id: 3,
      type: "audio",
      url: "/placeholder.svg",
      description: "Audio recording of complainant",
      timestamp: "2025-03-10T16:20:00Z",
    },
  ],
  aiAnalysis:
    "Multiple vehicles observed exceeding speed limit in residential zone. Recommended action: Increased patrol and speed monitoring in the area. Consider temporary speed bumps or traffic calming measures.",
  timeline: [
    {
      id: 1,
      status: "received",
      title: "Complaint received",
      description: "Complaint submitted via mobile app",
      timestamp: "2025-03-10T16:20:00Z",
      completed: true,
    },
    {
      id: 2,
      status: "processing",
      title: "AI processing completed",
      description: "Complaint analyzed and categorized as high priority",
      timestamp: "2025-03-10T16:25:00Z",
      completed: true,
    },
    {
      id: 3,
      status: "assigned",
      title: "Officer assigned",
      description: "Officer John Smith has been assigned to the case",
      timestamp: "2025-03-10T16:30:00Z",
      completed: true,
    },
    {
      id: 4,
      status: "dispatched",
      title: "Officer dispatched",
      description: "Officer is en route to the location",
      timestamp: "2025-03-10T16:45:00Z",
      completed: false,
    },
    {
      id: 5,
      status: "arrived",
      title: "Officer arrived",
      description: "Officer has arrived at the location",
      timestamp: null,
      completed: false,
    },
    {
      id: 6,
      status: "action",
      title: "Action taken",
      description: "Officer has addressed the issue",
      timestamp: null,
      completed: false,
    },
    {
      id: 7,
      status: "resolved",
      title: "Resolved",
      description: "The complaint has been resolved",
      timestamp: null,
      completed: false,
    },
  ],
  activityLog: [
    {
      id: 1,
      action: "Task created",
      user: "System",
      timestamp: "2025-03-10T16:20:00Z",
    },
    {
      id: 2,
      action: "Task assigned to Officer John Smith",
      user: "Dispatch",
      timestamp: "2025-03-10T16:30:00Z",
    },
    {
      id: 3,
      action: "Officer notified",
      user: "System",
      timestamp: "2025-03-10T16:31:00Z",
    },
  ],
}

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [activityNote, setActivityNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // In a real app, we would fetch the task data from an API
    // For now, we'll use the mock data
    setTimeout(() => {
      setTask(MOCK_TASK)
      setStatus(MOCK_TASK.status)
      setLoading(false)
    }, 1000)
  }, [taskId])

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus)
    // In a real app, we would update the status via API
  }

  const handleAddActivity = () => {
    if (!activityNote.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Update the activity log
      const newActivity = {
        id: task.activityLog.length + 1,
        action: activityNote,
        user: "Officer John Smith",
        timestamp: new Date().toISOString(),
      }

      setTask({
        ...task,
        activityLog: [...task.activityLog, newActivity],
      })

      setActivityNote("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleReportArrival = () => {
    // Update the timeline
    const updatedTimeline = task.timeline.map((item: any) => {
      if (item.id === 5) {
        // "Officer arrived" step
        return {
          ...item,
          timestamp: new Date().toISOString(),
          completed: true,
        }
      }
      return item
    })

    // Add to activity log
    const newActivity = {
      id: task.activityLog.length + 1,
      action: "Officer reported arrival at location",
      user: "Officer John Smith",
      timestamp: new Date().toISOString(),
    }

    setTask({
      ...task,
      timeline: updatedTimeline,
      activityLog: [...task.activityLog, newActivity],
      status: "in_progress",
    })

    setStatus("in_progress")
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500">
            Urgent
          </Badge>
        )
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">
            New
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
            Pending
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
            Resolved
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
            <p className="mt-4 text-muted-foreground">Loading task information...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">PoliceConnect</span>
        </div>
        <Card className="w-full max-w-3xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Task Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find a task with the ID: {taskId}</p>
            <Button asChild>
              <Link href="/police/dashboard">Return to Dashboard</Link>
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
            <Link href="/police/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>

        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        <div className="grid gap-6 ">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {task.type}
                      {getSeverityBadge(task.severity)}
                    </CardTitle>
                    <CardDescription>Task ID: {task.id}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(status)}
                    <Select value={status} onValueChange={handleStatusUpdate}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending Resolution</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                    <p>{task.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{task.location}</span>
                      <span className="text-xs text-muted-foreground">({task.distance} away)</span>
                    </div>
                  </div>

                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">AI Analysis</h3>
                    <div className="bg-primary/5 p-4 rounded-md">
                      <p>{task.aiAnalysis}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 pt-0">
                <div className="w-full">
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      className="gap-2"
                      onClick={handleReportArrival}
                      disabled={task.timeline[4].completed} // If "Officer arrived" is already completed
                    >
                      <MapPin className="h-4 w-4" />
                      Report Arrival
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Ambulance className="h-4 w-4" />
                      Call Ambulance
                    </Button>
                    <Button className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    Mark as Resolved
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Escalate to FIR
                  </Button>
                    
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ComplaintTimeline timeline={task.timeline} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md divide-y">
                    {task.activityLog.map((activity: any) => (
                      <div key={activity.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p>{activity.action}</p>
                            <p className="text-xs text-muted-foreground">By: {activity.user}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add activity note..."
                      value={activityNote}
                      onChange={(e) => setActivityNote(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleAddActivity}
                      disabled={!activityNote.trim() || isSubmitting}
                      className="self-end"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

