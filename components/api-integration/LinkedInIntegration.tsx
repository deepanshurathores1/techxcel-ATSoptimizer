"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Linkedin, AlertCircle } from "lucide-react"
import { useResume } from "@/context/resume-context"

interface LinkedInProfile {
  firstName: string
  lastName: string
  headline: string
  summary: string
  email: string
  location: string
  positions: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    fieldOfStudy: string
    endDate: string
  }>
  skills: Array<{
    name: string
  }>
}

export default function LinkedInIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [linkedInUrl, setLinkedInUrl] = useState("")
  const [apiKey, setApiKey] = useState("")
  const { updateResumeData, resumeData } = useResume()

  const fetchLinkedInProfile = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your LinkedIn API key")
      return
    }

    if (!linkedInUrl.trim()) {
      setError("Please enter your LinkedIn profile URL")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Extract LinkedIn username from URL
      const urlParts = linkedInUrl.split("/")
      const username = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]

      // In a real implementation, you would call your backend API here
      // For this example, we'll simulate an API call
      const response = await fetch(`/api/linkedin?username=${username}`, {
        headers: {
          "x-api-key": apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}`)
      }

      const data: LinkedInProfile = await response.json()

      // Update resume data with LinkedIn profile information
      updateResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          fullName: `${data.firstName} ${data.lastName}`,
          title: data.headline,
          summary: data.summary,
          email: data.email,
          location: data.location,
        },
        experience: data.positions.map((position) => ({
          company: position.company,
          position: position.title,
          startDate: position.startDate,
          endDate: position.endDate || "Present",
          description: position.description,
        })),
        education: data.education.map((edu) => ({
          institution: edu.school,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          graduationDate: edu.endDate,
        })),
        skills: data.skills,
      })

      // Show success message
      setError(null)
    } catch (err) {
      console.error("LinkedIn fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch LinkedIn profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Linkedin className="h-5 w-5" />
          LinkedIn Integration
        </CardTitle>
        <CardDescription>Import your professional experience directly from LinkedIn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn API Key</label>
          <Input
            type="password"
            placeholder="Enter your LinkedIn API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from the{" "}
            <a href="https://developer.linkedin.com/" className="underline" target="_blank" rel="noopener noreferrer">
              LinkedIn Developer Portal
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">LinkedIn Profile URL</label>
          <Input
            placeholder="https://www.linkedin.com/in/yourprofile"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={fetchLinkedInProfile} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            "Import from LinkedIn"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

