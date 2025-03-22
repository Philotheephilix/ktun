"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  Bell,
  User,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  Phone,
  Ambulance,
  FileText,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for demonstration
const MOCK_TASKS = [
  {
    id: "ABC12345",
    type: "Noise Complaint",
    description: "Loud music playing after hours from neighboring apartment",
    location: "123 Main Street, Cityville",
    distance: "0.8 km",
    severity: "low",
    status: "new",
    timestamp: "2025-03-20T18:30:00Z",
    complainant: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    id: "DEF67890",
    type: "Theft",
    description: "Bicycle stolen from front yard",
    location: "456 Oak Avenue, Townsville",
    distance: "2.3 km",
    severity: "medium",
    status: "in_progress",
    timestamp: "2025-03-18T14:15:00Z",
    complainant: {
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
    },
  },
  {
    id: "GHI10111",
    type: "Suspicious Activity",
    description: "Unknown person loitering around the neighborhood",
    location: "789 Pine Road, Villageton",
    distance: "5.1 km",
    severity: "medium",
    status: "pending",
    timestamp: "2025-03-15T09:45:00Z",
    complainant: {
      name: "Robert Johnson",
      phone: "+1 (555) 456-7890",
    },
  },
  {
    id: "JKL12131",
    type: "Traffic Violation",
    description: "Cars speeding in residential area",
    location: "101 Elm Street, Hamletville",
    distance: "3.7 km",
    severity: "high",
    status: "urgent",
    timestamp: "2025-03-10T16:20:00Z",
    complainant: {
      name: "Sarah Williams",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: "MNO14151",
    type: "Domestic Dispute",
    description: "Loud argument heard from neighboring apartment",
    location: "202 Maple Drive, Boroughtown",
    distance: "1.5 km",
    severity: "high",
    status: "urgent",
    timestamp: "2025-03-21T20:10:00Z",
    complainant: {
      name: "Michael Brown",
      phone: "+1 (555) 345-6789",
    },
  },
  {
    id: "PQR16171",
    type: "Vandalism",
    description: "Graffiti on public property",
    location: "303 Cedar Lane, Districtville",
    distance: "4.2 km",
    severity: "low",
    status: "new",
    timestamp: "2025-03-19T11:25:00Z",
    complainant: {
      name: "Emily Davis",
      phone: "+1 (555) 567-8901",
    },
  },
  {
    id: "STU18191",
    type: "Missing Person",
    description: "Child not returned home from school",
    location: "404 Birch Street, Countyville",
    distance: "6.3 km",
    severity: "high",
    status: "resolved",
    timestamp: "2025-03-17T15:40:00Z",
    complainant: {
      name: "David Wilson",
      phone: "+1 (555) 678-9012",
    },
  },
  {
    id: "VWX20212",
    type: "Public Intoxication",
    description: "Intoxicated individual causing disturbance",
    location: "505 Walnut Avenue, Regiontown",
    distance: "2.8 km",
    severity: "medium",
    status: "resolved",
    timestamp: "2025-03-16T22:05:00Z",
    complainant: {
      name: "Jennifer Taylor",
      phone: "+1 (555) 789-0123",
    },
  },
]

export default function PoliceDashboardPage() {
  const [activeTab, setActiveTab] = useState("urgent")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")

  const filteredTasks = MOCK_TASKS.filter((task) => {
    if (activeTab === "urgent" && task.status !== "urgent") {
      return false
    }
    if (activeTab === "new" && task.status !== "new") {
      return false
    }
    if (activeTab === "in_progress" && task.status !== "in_progress") {
      return false
    }
    if (activeTab === "pending" && task.status !== "pending") {
      return false
    }
    if (activeTab === "resolved" && task.status !== "resolved") {
      return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        task.id.toLowerCase().includes(query) ||
        task.type.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.location.toLowerCase().includes(query) ||
        task.complainant.name.toLowerCase().includes(query)
      )
    }

    return true
  })

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PoliceConnect</span>
          </div>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Officer" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Officer John Smith</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Badge #4567</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clock className="mr-2 h-4 w-4" />
                  Shift Schedule
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Officer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Officer John Smith</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <Button className="gap-2">
              <MapPin className="h-4 w-4" />
              View Map
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Shift: 08:00 - 16:00
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-red-50 dark:bg-red-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <div className="text-2xl font-bold">{MOCK_TASKS.filter((t) => t.status === "urgent").length}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-2xl font-bold">{MOCK_TASKS.filter((t) => t.status === "new").length}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                  <div className="text-2xl font-bold">
                    {MOCK_TASKS.filter((t) => t.status === "in_progress").length}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div className="text-2xl font-bold">{MOCK_TASKS.filter((t) => t.status === "resolved").length}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4 text-red-500" />
              Emergency Services
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Ambulance className="h-4 w-4 text-blue-500" />
              Request Ambulance
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Shield className="h-4 w-4 text-yellow-500" />
              Request Backup
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>View and manage all assigned tasks</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                  >
                    Map
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tasks..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {viewMode === "list" ? (
                <Tabs defaultValue="urgent" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="urgent" className="relative">
                      Urgent
                      {MOCK_TASKS.filter((t) => t.status === "urgent").length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                          {MOCK_TASKS.filter((t) => t.status === "urgent").length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>

                  <div className="space-y-4">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No tasks found</p>
                      </div>
                    ) : (
                      filteredTasks.map((task) => (
                        <Card key={task.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <Link
                              href={`/police/tasks/${task.id}`}
                              className="block p-6 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{task.type}</h3>
                                    {getStatusBadge(task.status)}
                                    {getSeverityBadge(task.severity)}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                    <span>{task.location}</span>
                                    <span className="text-xs text-muted-foreground">({task.distance} away)</span>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:items-end gap-1">
                                  <div className="text-sm font-medium">ID: {task.id}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(task.timestamp).toLocaleString()}
                                  </div>
                                  <Button size="sm" variant="outline" className="mt-2 gap-1">
                                    View Details
                                    <ArrowUpRight className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </Tabs>
              ) : (
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Map View</p>
                    <p className="text-xs text-muted-foreground">Tasks will be displayed on the map</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

