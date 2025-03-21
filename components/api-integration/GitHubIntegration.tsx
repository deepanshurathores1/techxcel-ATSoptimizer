"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Github, AlertCircle } from "lucide-react"
import { useResume } from "@/context/resume-context"

interface GitHubProfile {
  name: string
  bio: string
  location: string
  email: string
  company: string
  blog: string
  repos: Array<{
    name: string
    description: string
    language: string
    stargazers_count: number
    html_url: string
  }>
  languages: string[]
}

export default function GitHubIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [apiKey, setApiKey] = useState("")
  const { updateResumeData, resumeData } = useResume()

  const fetchGitHubProfile = async () => {
    if (!username.trim()) {
      setError("Please enter your GitHub username")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, you would call your backend API here
      // For this example, we'll simulate an API call
      const headers: HeadersInit = {}
      if (apiKey) {
        headers.Authorization = `token ${apiKey}`
      }

      const response = await fetch(`/api/github?username=${username}`, {
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub profile: ${response.statusText}`)
      }

      const data: GitHubProfile = await response.json()

      // Update resume data with GitHub profile information
      // We'll add GitHub projects as a custom section
      const existingCustomSections = resumeData.customSections || []

      // Create a formatted projects section
      const projectsContent = data.repos
        .slice(0, 5) // Take top 5 repos
        .map(
          (repo) =>
            `${repo.name}: ${repo.description || "No description"}\n` +
            `Technologies: ${repo.language || "Not specified"}\n` +
            `Stars: ${repo.stargazers_count}\n` +
            `URL: ${repo.html_url}\n`,
        )
        .join("\n\n")

      // Add GitHub skills to existing skills
      const existingSkills = resumeData.skills || []
      const newSkills = [...existingSkills]

      // Add programming languages as skills if they don't already exist
      data.languages.forEach((language) => {
        if (!existingSkills.some((skill) => skill.name.toLowerCase() === language.toLowerCase())) {
          newSkills.push({ name: language })
        }
      })

      updateResumeData({
        ...resumeData,
        skills: newSkills,
        customSections: [
          ...existingCustomSections,
          {
            id: `github-projects-${Date.now()}`,
            title: "GitHub Projects",
            content: projectsContent,
          },
        ],
      })

      // Show success message
      setError(null)
    } catch (err) {
      console.error("GitHub fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch GitHub profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Integration
        </CardTitle>
        <CardDescription>Import your projects and technical skills from GitHub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub Personal Access Token (Optional)</label>
          <Input
            type="password"
            placeholder="Enter your GitHub token for private repos"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Create a token in{" "}
            <a
              href="https://github.com/settings/tokens"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Settings
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">GitHub Username</label>
          <Input placeholder="yourusername" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={fetchGitHubProfile} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importing...
            </>
          ) : (
            "Import from GitHub"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

