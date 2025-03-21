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
import { Loader2, Upload, Mail, Link, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationRequest } from "@/types/verification"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationExperienceProps {
  experience: ResumeData["experience"]
  verificationRequests: VerificationRequest[]
  updateProfile: (profile: Partial<ResumeData>) => void
}

export function VerificationExperience({
  experience,
  verificationRequests,
  updateProfile,
}: VerificationExperienceProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<(typeof experience)[0] | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<string>("employer_direct")
  const [verifierEmail, setVerifierEmail] = useState<string>("")
  const [verifierName, setVerifierName] = useState<string>("")
  const [verifierTitle, setVerifierTitle] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [linkedInUrl, setLinkedInUrl] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleVerificationRequest = async () => {
    if (!selectedExperience) return

    setIsLoading(true)

    try {
      // Prepare request data based on verification method
      const requestData = {
        type: "experience",
        itemId: selectedExperience.id || `exp-${Date.now()}`,
        method: verificationMethod,
        verifierEmail: verificationMethod === "employer_direct" ? verifierEmail : undefined,
        verifierName: verificationMethod === "employer_direct" ? verifierName : undefined,
        verifierTitle: verificationMethod === "employer_direct" ? verifierTitle : undefined,
        linkedInUrl: verificationMethod === "linkedin" ? linkedInUrl : undefined,
      }

      // Handle file upload if document_upload method
      if (verificationMethod === "document_upload" && uploadedFile) {
        const formData = new FormData()
        formData.append("file", uploadedFile)
        formData.append("type", "experience")
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
        setVerificationMethod("employer_direct")
        setVerifierEmail("")
        setVerifierName("")
        setVerifierTitle("")
        setUploadedFile(null)
        setLinkedInUrl("")
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

  const getVerificationStatus = (experienceId: string | undefined) => {
    if (!experienceId) return null

    const request = verificationRequests.find((req) => req.itemId === experienceId)

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
          <CardTitle>Experience Verification</CardTitle>
          <CardDescription>Verify your work experience to increase credibility with employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {experience.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No experience entries to verify. Add experience in your profile first.
              </div>
            ) : (
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <Card key={exp.id || index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{exp.position}</h3>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">
                              {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                          <div>
                            {exp.isVerified ? (
                              <VerificationBadge score={100} size="sm" />
                            ) : (
                              getVerificationStatus(exp.id) || (
                                <Dialog
                                  open={isDialogOpen && selectedExperience?.id === exp.id}
                                  onOpenChange={(open) => {
                                    setIsDialogOpen(open)
                                    if (!open) setSelectedExperience(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedExperience(exp)}>
                                      Verify
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Verify Experience</DialogTitle>
                                      <DialogDescription>
                                        Choose a verification method for your experience at {exp.company}
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
                                            <SelectItem value="employer_direct">Employer Email Verification</SelectItem>
                                            <SelectItem value="document_upload">Document Upload</SelectItem>
                                            <SelectItem value="linkedin">LinkedIn Profile</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {verificationMethod === "employer_direct" && (
                                        <div className="space-y-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="verifier-email">Employer Email</Label>
                                            <div className="flex items-center space-x-2">
                                              <Mail className="h-4 w-4 text-muted-foreground" />
                                              <Input
                                                id="verifier-email"
                                                type="email"
                                                placeholder="hr@company.com"
                                                value={verifierEmail}
                                                onChange={(e) => setVerifierEmail(e.target.value)}
                                              />
                                            </div>
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="verifier-name">Contact Name</Label>
                                            <Input
                                              id="verifier-name"
                                              placeholder="Jane Smith"
                                              value={verifierName}
                                              onChange={(e) => setVerifierName(e.target.value)}
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="verifier-title">Contact Title</Label>
                                            <Input
                                              id="verifier-title"
                                              placeholder="HR Manager"
                                              value={verifierTitle}
                                              onChange={(e) => setVerifierTitle(e.target.value)}
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
                                              Upload offer letter, employment contract, or other proof
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

                                      {verificationMethod === "linkedin" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                                          <div className="flex items-center space-x-2">
                                            <Link className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                              id="linkedin-url"
                                              placeholder="https://www.linkedin.com/in/yourprofile"
                                              value={linkedInUrl}
                                              onChange={(e) => setLinkedInUrl(e.target.value)}
                                            />
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
                                          (verificationMethod === "employer_direct" && !verifierEmail) ||
                                          (verificationMethod === "document_upload" && !uploadedFile) ||
                                          (verificationMethod === "linkedin" && !linkedInUrl)
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
                      {exp.isVerified && (
                        <div className="bg-green-50 p-4 border-l flex items-center justify-center">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">Verified by</p>
                            <p className="text-xs text-green-600">{exp.verificationSource || "Employer"}</p>
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

