"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, LinkIcon, CheckCircle, XCircle, Clock, AlertTriangle, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationRequest } from "@/types/verification"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationProjectsProps {
  projects: ResumeData["projects"]
  verificationRequests: VerificationRequest[]
  updateProfile: (profile: Partial<ResumeData>) => void
}

export function VerificationProjects({
  projects = [],
  verificationRequests,
  updateProfile,
}: VerificationProjectsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<string>("github")
  const [githubUrl, setGithubUrl] = useState<string>("")
  const [projectUrl, setProjectUrl] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleVerificationRequest = async () => {
    if (!selectedProject) return

    setIsLoading(true)

    try {
      // Prepare request data based on verification method
      const requestData = {
        type: "project",
        itemId: selectedProject.id || `proj-${Date.now()}`,
        method: verificationMethod,
        githubUrl: verificationMethod === "github" ? githubUrl : undefined,
        projectUrl: verificationMethod === "live_project" ? projectUrl : undefined,
      }

      // Handle file upload if document_upload method
      if (verificationMethod === "document_upload" && uploadedFile) {
        const formData = new FormData()
        formData.append("file", uploadedFile)
        formData.append("type", "project")
        formData.append("itemId", requestData.itemId)

        const uploadResponse = await fetch("/api/verification/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload document")
        }
      }

      // Submit verification request
      const response = await fetch("/api/verification/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit verification request")
      }

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Verification Request Submitted",
          description: "Your verification request has been submitted successfully.",
        })

        // Close dialog
        setIsDialogOpen(false)

        // Reset form
        setVerificationMethod("github")
        setGithubUrl("")
        setProjectUrl("")
        setUploadedFile(null)
      } else {
        throw new Error(data.message || "Failed to submit verification request")
      }
    } catch (error) {
      console.error("Error submitting verification request:", error)
      toast({
        title: "Error",
        description: "Failed to submit verification request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getVerificationStatus = (projectId: string | undefined) => {
    if (!projectId) return null

    const request = verificationRequests.find((req) => req.itemId === projectId)

    if (!request) return null

    switch (request.status) {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Verification</CardTitle>
          <CardDescription>Verify your projects to increase credibility with employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No projects to verify. Add projects in your profile first.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <Card key={project.id || index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                            {project.technologies && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.technologies.map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            {project.verified ? (
                              <VerificationBadge score={100} size="sm" />
                            ) : (
                              getVerificationStatus(project.id) || (
                                <Dialog
                                  open={isDialogOpen && selectedProject?.id === project.id}
                                  onOpenChange={(open) => {
                                    setIsDialogOpen(open)
                                    if (!open) setSelectedProject(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedProject(project)}>
                                      Verify
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Verify Project</DialogTitle>
                                      <DialogDescription>
                                        Choose a verification method for your {project.name} project
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="verification-method">Verification Method</Label>
                                        <Select value={verificationMethod} onValueChange={setVerificationMethod}>
                                          <SelectTrigger id="verification-method">
                                            <SelectValue placeholder="Select a verification method" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="github">GitHub Repository</SelectItem>
                                            <SelectItem value="live_project">Live Project URL</SelectItem>
                                            <SelectItem value="document_upload">Document Upload</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {verificationMethod === "github" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="github-url">GitHub Repository URL</Label>
                                          <div className="flex items-center space-x-2">
                                            <Github className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                              id="github-url"
                                              placeholder="https://github.com/username/repository"
                                              value={githubUrl || project.url || ""}
                                              onChange={(e) => setGithubUrl(e.target.value)}
                                            />
                                          </div>
                                        </div>
                                      )}

                                      {verificationMethod === "live_project" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="project-url">Live Project URL</Label>
                                          <div className="flex items-center space-x-2">
                                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                              id="project-url"
                                              placeholder="https://your-project.com"
                                              value={projectUrl || project.url || ""}
                                              onChange={(e) => setProjectUrl(e.target.value)}
                                            />
                                          </div>
                                        </div>
                                      )}

                                      {verificationMethod === "document_upload" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="document-upload">Upload Document</Label>
                                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                              Upload screenshots, documentation, or other proof
                                            </p>
                                            <input
                                              id="document-upload"
                                              type="file"
                                              className="hidden"
                                              accept=".pdf,.jpg,.jpeg,.png"
                                              onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                  setUploadedFile(e.target.files[0])
                                                }
                                              }}
                                            />
                                            <Button
                                              variant="outline"
                                              onClick={() => document.getElementById("document-upload")?.click()}
                                            >
                                              Select File
                                            </Button>
                                            {uploadedFile && (
                                              <p className="text-sm mt-2">Selected: {uploadedFile.name}</p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="submit"
                                        onClick={handleVerificationRequest}
                                        disabled={
                                          isLoading ||
                                          (verificationMethod === "github" && !githubUrl && !project.url) ||
                                          (verificationMethod === "live_project" && !projectUrl && !project.url) ||
                                          (verificationMethod === "document_upload" && !uploadedFile)
                                        }
                                      >
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Submit for Verification
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      {project.verified && (
                        <div className="bg-green-50 p-4 border-l flex items-center justify-center">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">Verified via</p>
                            <p className="text-xs text-green-600 capitalize">
                              {project.verificationMethod || "github"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

