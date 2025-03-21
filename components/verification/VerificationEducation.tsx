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
import { Loader2, Upload, Mail, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationRequest } from "@/types/verification"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationEducationProps {
  education: ResumeData["education"]
  verificationRequests: VerificationRequest[]
  updateProfile: (profile: Partial<ResumeData>) => void
}

export function VerificationEducation({ education, verificationRequests, updateProfile }: VerificationEducationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState<(typeof education)[0] | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<string>("education_institution")
  const [verifierEmail, setVerifierEmail] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [credentialId, setCredentialId] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleVerificationRequest = async () => {
    if (!selectedEducation) return

    setIsLoading(true)

    try {
      // Prepare request data based on verification method
      const requestData = {
        type: "education",
        itemId: selectedEducation.id || `edu-${Date.now()}`,
        method: verificationMethod,
        verifierEmail: verificationMethod === "education_institution" ? verifierEmail : undefined,
        credentialId: verificationMethod === "credential_verification" ? credentialId : undefined,
      }

      // Handle file upload if document_upload method
      if (verificationMethod === "document_upload" && uploadedFile) {
        const formData = new FormData()
        formData.append("file", uploadedFile)
        formData.append("type", "education")
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
        setVerificationMethod("education_institution")
        setVerifierEmail("")
        setUploadedFile(null)
        setCredentialId("")
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

  const getVerificationStatus = (educationId: string | undefined) => {
    if (!educationId) return null

    const request = verificationRequests.find((req) => req.itemId === educationId)

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
          <CardTitle>Education Verification</CardTitle>
          <CardDescription>Verify your educational background to increase credibility with employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {education.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No education entries to verify. Add education in your profile first.
              </div>
            ) : (
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <Card key={edu.id || index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {edu.degree} in {edu.fieldOfStudy}
                            </h3>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-muted-foreground">Graduated: {edu.graduationDate}</p>
                          </div>
                          <div>
                            {edu.isVerified ? (
                              <VerificationBadge score={100} size="sm" />
                            ) : (
                              getVerificationStatus(edu.id) || (
                                <Dialog
                                  open={isDialogOpen && selectedEducation?.id === edu.id}
                                  onOpenChange={(open) => {
                                    setIsDialogOpen(open)
                                    if (!open) setSelectedEducation(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedEducation(edu)}>
                                      Verify
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Verify Education</DialogTitle>
                                      <DialogDescription>
                                        Choose a verification method for your education at {edu.institution}
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
                                            <SelectItem value="education_institution">
                                              Institution Email Verification
                                            </SelectItem>
                                            <SelectItem value="document_upload">Document Upload</SelectItem>
                                            <SelectItem value="credential_verification">
                                              Credential Verification
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {verificationMethod === "education_institution" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="verifier-email">Institution Email</Label>
                                          <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <Input
                                              id="verifier-email"
                                              type="email"
                                              placeholder="registrar@university.edu"
                                              value={verifierEmail}
                                              onChange={(e) => setVerifierEmail(e.target.value)}
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
                                              Upload diploma, transcript, or other proof
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

                                      {verificationMethod === "credential_verification" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="credential-id">Credential ID</Label>
                                          <Input
                                            id="credential-id"
                                            placeholder="Enter your credential ID"
                                            value={credentialId}
                                            onChange={(e) => setCredentialId(e.target.value)}
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                            This can be found on your diploma or transcript
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="submit"
                                        onClick={handleVerificationRequest}
                                        disabled={
                                          isLoading ||
                                          (verificationMethod === "education_institution" && !verifierEmail) ||
                                          (verificationMethod === "document_upload" && !uploadedFile) ||
                                          (verificationMethod === "credential_verification" && !credentialId)
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
                      {edu.isVerified && (
                        <div className="bg-green-50 p-4 border-l flex items-center justify-center">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">Verified by</p>
                            <p className="text-xs text-green-600">{edu.verificationSource || "Institution"}</p>
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

