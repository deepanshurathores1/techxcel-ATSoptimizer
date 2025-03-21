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
import { Loader2, Upload, Link, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationRequest } from "@/types/verification"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationCertificationsProps {
  certifications: ResumeData["certifications"]
  verificationRequests: VerificationRequest[]
  updateProfile: (profile: Partial<ResumeData>) => void
}

export function VerificationCertifications({
  certifications = [],
  verificationRequests,
  updateProfile,
}: VerificationCertificationsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[0] | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<string>("certification_authority")
  const [credentialId, setCredentialId] = useState<string>("")
  const [credentialUrl, setCredentialUrl] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleVerificationRequest = async () => {
    if (!selectedCertification) return

    setIsLoading(true)

    try {
      // Prepare request data based on verification method
      const requestData = {
        type: "certification",
        itemId: selectedCertification.id || `cert-${Date.now()}`,
        method: verificationMethod,
        credentialId: verificationMethod === "certification_authority" ? credentialId : undefined,
        credentialUrl: verificationMethod === "certification_authority" ? credentialUrl : undefined,
      }

      // Handle file upload if document_upload method
      if (verificationMethod === "document_upload" && uploadedFile) {
        const formData = new FormData()
        formData.append("file", uploadedFile)
        formData.append("type", "certification")
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
        setVerificationMethod("certification_authority")
        setCredentialId("")
        setCredentialUrl("")
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

  const getVerificationStatus = (certificationId: string | undefined) => {
    if (!certificationId) return null

    const request = verificationRequests.find((req) => req.itemId === certificationId)

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
          <CardTitle>Certification Verification</CardTitle>
          <CardDescription>Verify your certifications to increase credibility with employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {certifications.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No certifications to verify. Add certifications in your profile first.
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={cert.id || index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            <p className="text-xs text-muted-foreground">
                              Issued: {cert.issueDate}
                              {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                            </p>
                          </div>
                          <div>
                            {cert.verified ? (
                              <VerificationBadge score={100} size="sm" />
                            ) : (
                              getVerificationStatus(cert.id) || (
                                <Dialog
                                  open={isDialogOpen && selectedCertification?.id === cert.id}
                                  onOpenChange={(open) => {
                                    setIsDialogOpen(open)
                                    if (!open) setSelectedCertification(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedCertification(cert)}>
                                      Verify
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Verify Certification</DialogTitle>
                                      <DialogDescription>
                                        Choose a verification method for your {cert.name} certification
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
                                            <SelectItem value="certification_authority">
                                              Certification Authority
                                            </SelectItem>
                                            <SelectItem value="document_upload">Document Upload</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {verificationMethod === "certification_authority" && (
                                        <div className="space-y-4">
                                          <div className="space-y-2">
                                            <Label htmlFor="credential-id">Credential ID</Label>
                                            <Input
                                              id="credential-id"
                                              placeholder="Enter your credential ID"
                                              value={credentialId || cert.credentialId || ""}
                                              onChange={(e) => setCredentialId(e.target.value)}
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor="credential-url">Credential URL</Label>
                                            <div className="flex items-center space-x-2">
                                              <Link className="h-4 w-4 text-muted-foreground" />
                                              <Input
                                                id="credential-url"
                                                placeholder="https://example.com/verify/credential"
                                                value={credentialUrl || cert.credentialUrl || ""}
                                                onChange={(e) => setCredentialUrl(e.target.value)}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {verificationMethod === "document_upload" && (
                                        <div className="space-y-2">
                                          <Label htmlFor="document-upload">Upload Document</Label>
                                          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                              Upload certificate, badge, or other proof
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
                                          (verificationMethod === "certification_authority" &&
                                            !credentialId &&
                                            !cert.credentialId) ||
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
                      {cert.verified && (
                        <div className="bg-green-50 p-4 border-l flex items-center justify-center">
                          <div className="text-center">
                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xs text-green-600 font-medium">Verified by</p>
                            <p className="text-xs text-green-600">{cert.issuer}</p>
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

