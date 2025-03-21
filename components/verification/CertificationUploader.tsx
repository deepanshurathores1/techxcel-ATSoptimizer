"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, AlertCircle, CheckCircle2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CertificationUploaderProps {
  onCertificationVerified: (certification: {
    name: string
    issuer: string
    issueDate: string
    credentialId: string
    credentialUrl?: string
    verified: boolean
    verificationProof: string
  }) => void
}

export default function CertificationUploader({ onCertificationVerified }: CertificationUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [certificationName, setCertificationName] = useState("")
  const [issuer, setIssuer] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [credentialId, setCredentialId] = useState("")
  const [credentialUrl, setCredentialUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([])

  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png"]
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF, JPEG, or PNG file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload")
      return
    }

    if (!certificationName || !issuer || !issueDate || !credentialId) {
      setError("Please fill in all required fields")
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("certificationName", certificationName)
      formData.append("issuer", issuer)
      formData.append("issueDate", issueDate)
      formData.append("credentialId", credentialId)
      if (credentialUrl) formData.append("credentialUrl", credentialUrl)

      // In a real implementation, you would upload to your backend
      // For this example, we'll simulate a successful upload
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful upload response
      const uploadUrl = URL.createObjectURL(selectedFile)

      // Add to uploaded files list
      setUploadedFiles((prev) => [...prev, { name: selectedFile.name, url: uploadUrl }])

      // Notify parent component of verified certification
      onCertificationVerified({
        name: certificationName,
        issuer,
        issueDate,
        credentialId,
        credentialUrl,
        verified: true,
        verificationProof: uploadUrl,
      })

      // Reset form
      setSelectedFile(null)
      setCertificationName("")
      setIssuer("")
      setIssueDate("")
      setCredentialId("")
      setCredentialUrl("")

      // Show success message
      setSuccess("Certification uploaded and verified successfully")
      toast({
        title: "Certification Verified",
        description: "Your certification has been uploaded and verified successfully.",
      })
    } catch (err) {
      console.error("Upload error:", err)
      setError("Failed to upload certification. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Verification</CardTitle>
        <CardDescription>Upload your certificates to verify your credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="certification-name">Certification Name *</Label>
            <Input
              id="certification-name"
              value={certificationName}
              onChange={(e) => setCertificationName(e.target.value)}
              placeholder="AWS Certified Solutions Architect"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization *</Label>
            <Input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="Amazon Web Services"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="issue-date">Issue Date *</Label>
            <Input id="issue-date" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credential-id">Credential ID *</Label>
            <Input
              id="credential-id"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="ABC123XYZ"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="credential-url">Credential URL (Optional)</Label>
          <Input
            id="credential-url"
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            placeholder="https://www.credly.com/badges/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certificate-file">Upload Certificate (PDF, JPEG, PNG) *</Label>
          <Input id="certificate-file" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
          <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Certificates</Label>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      Verified
                    </Badge>
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeUploadedFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={isUploading || !selectedFile} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload & Verify
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

