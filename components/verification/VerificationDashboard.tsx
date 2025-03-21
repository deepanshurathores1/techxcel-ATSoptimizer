"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Download, Upload, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationStats, VerificationRequest } from "@/types/verification"
import { VerificationExperience } from "./VerificationExperience"
import { VerificationEducation } from "./VerificationEducation"
import { VerificationCertifications } from "./VerificationCertifications"
import { VerificationSkills } from "./VerificationSkills"
import { VerificationProjects } from "./VerificationProjects"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationDashboardProps {
  profile: ResumeData
  updateProfile: (profile: ResumeData) => void
}

export function VerificationDashboard({ profile, updateProfile }: VerificationDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [verificationStats, setVerificationStats] = useState<VerificationStats | null>(null)
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([])
  const { toast } = useToast()

  // Fetch verification data
  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        setIsLoading(true)
        // In a real implementation, you would fetch from your API
        const response = await fetch("/api/verification")

        if (!response.ok) {
          throw new Error("Failed to fetch verification data")
        }

        const data = await response.json()

        if (data.success) {
          setVerificationStats(data.data.stats)
          setVerificationRequests(data.data.requests || [])
        } else {
          throw new Error(data.message || "Failed to fetch verification data")
        }
      } catch (error) {
        console.error("Error fetching verification data:", error)
        toast({
          title: "Error",
          description: "Failed to load verification data",
          variant: "destructive",
        })

        // Set mock data for development
        const mockStats: VerificationStats = {
          experience: {
            totalItems: profile.experience?.length || 0,
            verifiedItems: profile.experience?.filter((exp) => exp.isVerified)?.length || 0,
            pendingItems: 1,
            rejectedItems: 0,
            verificationScore: 75,
            lastUpdated: new Date().toISOString(),
          },
          education: {
            totalItems: profile.education?.length || 0,
            verifiedItems: profile.education?.filter((edu) => edu.isVerified)?.length || 0,
            pendingItems: 0,
            rejectedItems: 0,
            verificationScore: 80,
            lastUpdated: new Date().toISOString(),
          },
          certifications: {
            totalItems: profile.certifications?.length || 0,
            verifiedItems: profile.certifications?.filter((cert) => cert.verified)?.length || 0,
            pendingItems: 1,
            rejectedItems: 0,
            verificationScore: 90,
            lastUpdated: new Date().toISOString(),
          },
          skills: {
            totalItems: profile.skills?.length || 0,
            verifiedItems: profile.skills?.filter((skill) => skill.verified)?.length || 0,
            pendingItems: 2,
            rejectedItems: 1,
            verificationScore: 65,
            lastUpdated: new Date().toISOString(),
          },
          projects: {
            totalItems: profile.projects?.length || 0,
            verifiedItems: profile.projects?.filter((project) => project.verified)?.length || 0,
            pendingItems: 0,
            rejectedItems: 0,
            verificationScore: 70,
            lastUpdated: new Date().toISOString(),
          },
          overall: {
            totalItems: 0,
            verifiedItems: 0,
            pendingItems: 0,
            rejectedItems: 0,
            verificationScore: 0,
            lastUpdated: new Date().toISOString(),
          },
        }

        // Calculate overall stats
        const totalItems =
          mockStats.experience.totalItems +
          mockStats.education.totalItems +
          mockStats.certifications.totalItems +
          mockStats.skills.totalItems +
          mockStats.projects.totalItems

        const verifiedItems =
          mockStats.experience.verifiedItems +
          mockStats.education.verifiedItems +
          mockStats.certifications.verifiedItems +
          mockStats.skills.verifiedItems +
          mockStats.projects.verifiedItems

        const pendingItems =
          mockStats.experience.pendingItems +
          mockStats.education.pendingItems +
          mockStats.certifications.pendingItems +
          mockStats.skills.pendingItems +
          mockStats.projects.pendingItems

        const rejectedItems =
          mockStats.experience.rejectedItems +
          mockStats.education.rejectedItems +
          mockStats.certifications.rejectedItems +
          mockStats.skills.rejectedItems +
          mockStats.projects.rejectedItems

        mockStats.overall = {
          totalItems,
          verifiedItems,
          pendingItems,
          rejectedItems,
          verificationScore: totalItems > 0 ? Math.round((verifiedItems / totalItems) * 100) : 0,
          lastUpdated: new Date().toISOString(),
        }

        setVerificationStats(mockStats)

        // Mock verification requests
        const mockRequests: VerificationRequest[] = [
          {
            id: "vr-1",
            type: "experience",
            itemId: profile.experience?.[0]?.id || "exp-1",
            status: "pending",
            method: "employer_direct",
            requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            verifierEmail: "hr@company.com",
            verifierOrganization: profile.experience?.[0]?.company || "Company Inc.",
            notes: "Waiting for employer confirmation",
          },
          {
            id: "vr-2",
            type: "certification",
            itemId: profile.certifications?.[0]?.id || "cert-1",
            status: "verified",
            method: "certification_authority",
            requestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            verificationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            verifierName: "Certification Authority",
            verifierOrganization: profile.certifications?.[0]?.issuer || "Cert Authority",
            proofUrl: "https://example.com/cert/verify",
            score: 100,
          },
          {
            id: "vr-3",
            type: "skill",
            itemId: profile.skills?.[0]?.id || "skill-1",
            status: "pending",
            method: "skills_assessment",
            requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            notes: "Assessment scheduled for next week",
          },
          {
            id: "vr-4",
            type: "skill",
            itemId: profile.skills?.[1]?.id || "skill-2",
            status: "rejected",
            method: "skills_assessment",
            requestDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            verificationDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
            notes: "Assessment score below threshold",
            score: 35,
          },
          {
            id: "vr-5",
            type: "education",
            itemId: profile.education?.[0]?.id || "edu-1",
            status: "verified",
            method: "education_institution",
            requestDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            verificationDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            verifierName: "University Registrar",
            verifierOrganization: profile.education?.[0]?.institution || "University",
            score: 100,
          },
        ]

        setVerificationRequests(mockRequests)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerificationData()
  }, [profile, toast])

  const refreshVerificationData = async () => {
    setIsRefreshing(true)

    try {
      // In a real implementation, you would fetch from your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: "Verification data refreshed successfully",
      })
    } catch (error) {
      console.error("Error refreshing verification data:", error)
      toast({
        title: "Error",
        description: "Failed to refresh verification data",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const exportVerificationReport = async () => {
    try {
      // In a real implementation, you would generate and download a report
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Verification report downloaded successfully",
      })
    } catch (error) {
      console.error("Error exporting verification report:", error)
      toast({
        title: "Error",
        description: "Failed to export verification report",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!verificationStats) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load verification data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-amber-600 border-amber-200 bg-amber-50">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-red-600 border-red-200 bg-red-50">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-gray-600 border-gray-200 bg-gray-50">
            <AlertTriangle className="h-3 w-3" />
            Expired
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Resume Verification</CardTitle>
          <CardDescription>Verify your resume information to increase credibility with employers</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshVerificationData} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="ml-2">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" onClick={exportVerificationReport}>
            <Download className="h-4 w-4" />
            <span className="ml-2">Export Report</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-6 md:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verification Score</span>
                        <span className="font-medium">{verificationStats.overall.verificationScore}%</span>
                      </div>
                      <Progress value={verificationStats.overall.verificationScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Total Items</span>
                        <span className="font-medium">{verificationStats.overall.totalItems}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Verified Items</span>
                        <span className="font-medium text-green-600">{verificationStats.overall.verifiedItems}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Pending Items</span>
                        <span className="font-medium text-amber-600">{verificationStats.overall.pendingItems}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Rejected Items</span>
                        <span className="font-medium text-red-600">{verificationStats.overall.rejectedItems}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <VerificationBadge score={verificationStats.overall.verificationScore} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Verification Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {verificationRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-start justify-between border-b pb-2 last:border-0">
                        <div>
                          <div className="font-medium text-sm capitalize">{request.type} Verification</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    ))}

                    {verificationRequests.length === 0 && (
                      <div className="text-center py-2 text-sm text-muted-foreground">No verification requests yet</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Verification Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Email Verification</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Verify
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Document Upload</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">LinkedIn Integration</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">GitHub Integration</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">Skills Assessment</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <Progress value={verificationStats.experience.verificationScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span>{verificationStats.experience.verificationScore}%</span>
                      </div>
                    </div>
                    <div className="text-xs grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-muted-foreground">Total</div>
                        <div>{verificationStats.experience.totalItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Verified</div>
                        <div className="text-green-600">{verificationStats.experience.verifiedItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pending</div>
                        <div className="text-amber-600">{verificationStats.experience.pendingItems}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <Progress value={verificationStats.education.verificationScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span>{verificationStats.education.verificationScore}%</span>
                      </div>
                    </div>
                    <div className="text-xs grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-muted-foreground">Total</div>
                        <div>{verificationStats.education.totalItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Verified</div>
                        <div className="text-green-600">{verificationStats.education.verifiedItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pending</div>
                        <div className="text-amber-600">{verificationStats.education.pendingItems}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <Progress value={verificationStats.certifications.verificationScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span>{verificationStats.certifications.verificationScore}%</span>
                      </div>
                    </div>
                    <div className="text-xs grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-muted-foreground">Total</div>
                        <div>{verificationStats.certifications.totalItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Verified</div>
                        <div className="text-green-600">{verificationStats.certifications.verifiedItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pending</div>
                        <div className="text-amber-600">{verificationStats.certifications.pendingItems}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <Progress value={verificationStats.skills.verificationScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span>{verificationStats.skills.verificationScore}%</span>
                      </div>
                    </div>
                    <div className="text-xs grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-muted-foreground">Total</div>
                        <div>{verificationStats.skills.totalItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Verified</div>
                        <div className="text-green-600">{verificationStats.skills.verifiedItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pending</div>
                        <div className="text-amber-600">{verificationStats.skills.pendingItems}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1">
                      <Progress value={verificationStats.projects.verificationScore} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Score</span>
                        <span>{verificationStats.projects.verificationScore}%</span>
                      </div>
                    </div>
                    <div className="text-xs grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-muted-foreground">Total</div>
                        <div>{verificationStats.projects.totalItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Verified</div>
                        <div className="text-green-600">{verificationStats.projects.verifiedItems}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pending</div>
                        <div className="text-amber-600">{verificationStats.projects.pendingItems}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">All Verification Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationRequests.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">No verification requests yet</div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm bg-muted">
                        <div>Type</div>
                        <div>Method</div>
                        <div>Date</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      {verificationRequests.map((request) => (
                        <div key={request.id} className="grid grid-cols-5 gap-4 p-4 text-sm border-t">
                          <div className="capitalize">{request.type}</div>
                          <div className="capitalize">{request.method.replace(/_/g, " ")}</div>
                          <div>{new Date(request.requestDate).toLocaleDateString()}</div>
                          <div>{getStatusBadge(request.status)}</div>
                          <div>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <VerificationExperience
              experience={profile.experience || []}
              verificationRequests={verificationRequests.filter((req) => req.type === "experience")}
              updateProfile={updateProfile}
            />
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <VerificationEducation
              education={profile.education || []}
              verificationRequests={verificationRequests.filter((req) => req.type === "education")}
              updateProfile={updateProfile}
            />
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <VerificationCertifications
              certifications={profile.certifications || []}
              verificationRequests={verificationRequests.filter((req) => req.type === "certification")}
              updateProfile={updateProfile}
            />
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <VerificationSkills
              skills={profile.skills || []}
              verificationRequests={verificationRequests.filter((req) => req.type === "skill")}
              updateProfile={updateProfile}
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <VerificationProjects
              projects={profile.projects || []}
              verificationRequests={verificationRequests.filter((req) => req.type === "project")}
              updateProfile={updateProfile}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

