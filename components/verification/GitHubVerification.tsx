"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Github, AlertCircle, CheckCircle2, Star, GitFork, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GitHubVerificationProps {
  onProjectVerified: (project: {
    name: string
    description: string
    technologies: string[]
    url?: string
    githubUrl: string
    verified: boolean
    verificationMethod: string
    stars: number
    forks: number
  }) => void
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

export default function GitHubVerification({ onProjectVerified }: GitHubVerificationProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [selectedRepos, setSelectedRepos] = useState<number[]>([])
  const { toast } = useToast()

  const fetchRepositories = async () => {
    if (!username.trim()) {
      setError("Please enter your GitHub username")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, you would call your backend API
      // For this example, we'll call the GitHub API directly
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`)
      }

      const data: GitHubRepo[] = await response.json()
      setRepos(data)

      if (data.length === 0) {
        setError("No public repositories found for this username")
      }
    } catch (err) {
      console.error("GitHub fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch GitHub repositories")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos((prev) => (prev.includes(repoId) ? prev.filter((id) => id !== repoId) : [...prev, repoId]))
  }

  const verifySelectedRepos = () => {
    if (selectedRepos.length === 0) {
      setError("Please select at least one repository to verify")
      return
    }

    // Process each selected repository
    selectedRepos.forEach((repoId) => {
      const repo = repos.find((r) => r.id === repoId)
      if (repo) {
        // Notify parent component of verified project
        onProjectVerified({
          name: repo.name,
          description: repo.description || `A GitHub repository by ${username}`,
          technologies: [repo.language, ...(repo.topics || [])].filter(Boolean) as string[],
          url: repo.homepage || undefined,
          githubUrl: repo.html_url,
          verified: true,
          verificationMethod: "GitHub API",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        })

        toast({
          title: "Project Verified",
          description: `${repo.name} has been verified and added to your resume.`,
        })
      }
    })

    // Clear selection after verification
    setSelectedRepos([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Project Verification
        </CardTitle>
        <CardDescription>Verify your projects and skills through GitHub repositories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="github-username">GitHub Username</Label>
            <Input
              id="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your GitHub username"
            />
          </div>
          <Button onClick={fetchRepositories} disabled={isLoading || !username.trim()} className="self-end">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Fetch Repos"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {repos.length > 0 && (
          <div className="space-y-2">
            <Label>Select repositories to verify (up to 5)</Label>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedRepos.includes(repo.id) ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => toggleRepoSelection(repo.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{repo.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {repo.description || "No description provided"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {repo.language && (
                      <Badge variant="secondary" className="text-xs">
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics &&
                      repo.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    {repo.topics && repo.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{repo.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center mt-2 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live Demo
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={verifySelectedRepos} disabled={selectedRepos.length === 0} className="w-full">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Verify Selected Projects
        </Button>
      </CardFooter>
    </Card>
  )
}

