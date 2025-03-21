"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { useResume } from "@/context/resume-context"

interface AIResumeEnhancementProps {
  jobDescription?: string
  currentSummary?: string
  currentExperience?: Array<{
    company: string
    position: string
    description: string
  }>
}

export default function GeminiAIIntegration({
  jobDescription = "",
  currentSummary = "",
  currentExperience = [],
}: AIResumeEnhancementProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [activeTab, setActiveTab] = useState("summary")
  const [suggestions, setSuggestions] = useState({
    summary: "",
    experience: [] as string[],
    skills: [] as string[],
  })
  const [success, setSuccess] = useState<string | null>(null)
  const { updateResumeData, resumeData } = useResume()

  const generateSuggestions = async (type: "summary" | "experience" | "skills") => {
    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // In a real implementation, you would call your backend API here
      // For this example, we'll simulate an API call
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          type,
          jobDescription,
          resumeData: {
            summary: currentSummary,
            experience: currentExperience,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate suggestions: ${response.statusText}`)
      }

      const data = await response.json()

      // Update suggestions based on the type
      setSuggestions((prev) => ({
        ...prev,
        [type]: data.suggestions,
      }))
    } catch (err) {
      console.error("Gemini API error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate suggestions")
    } finally {
      setIsLoading(false)
    }
  }

  const applySuggestion = (type: "summary" | "experience" | "skills", index?: number) => {
    if (type === "summary") {
      updateResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: suggestions.summary,
        },
      })
    } else if (type === "experience" && typeof index === "number") {
      const updatedExperience = [...resumeData.experience]
      if (updatedExperience[index]) {
        updatedExperience[index] = {
          ...updatedExperience[index],
          description: suggestions.experience[index],
        }

        updateResumeData({
          ...resumeData,
          experience: updatedExperience,
        })
      }
    } else if (type === "skills") {
      // Add suggested skills to existing skills
      const existingSkills = resumeData.skills || []
      const newSkills = [...existingSkills]

      suggestions.skills.forEach((skill) => {
        if (!existingSkills.some((s) => s.name.toLowerCase() === skill.toLowerCase())) {
          newSkills.push({ name: skill })
        }
      })

      updateResumeData({
        ...resumeData,
        skills: newSkills,
      })
    }

    setSuccess(`Successfully applied ${type} suggestion!`)
    setTimeout(() => setSuccess(null), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Gemini AI Resume Enhancement
        </CardTitle>
        <CardDescription>Get AI-powered suggestions to improve your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Gemini API Key</label>
          <Input
            type="password"
            placeholder="Enter your Gemini API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your API key from the{" "}
            <a href="https://ai.google.dev/" className="underline" target="_blank" rel="noopener noreferrer">
              Google AI Studio
            </a>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Button onClick={() => generateSuggestions("summary")} disabled={isLoading} className="w-full">
              {isLoading && activeTab === "summary" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Professional Summary
                </>
              )}
            </Button>

            {suggestions.summary && (
              <div className="space-y-2">
                <Textarea value={suggestions.summary} readOnly rows={5} className="bg-muted" />
                <Button onClick={() => applySuggestion("summary")} size="sm">
                  Apply Suggestion
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <Button onClick={() => generateSuggestions("experience")} disabled={isLoading} className="w-full">
              {isLoading && activeTab === "experience" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance Job Descriptions
                </>
              )}
            </Button>

            {suggestions.experience && suggestions.experience.length > 0 && (
              <div className="space-y-4">
                {suggestions.experience.map((suggestion, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-md">
                    <p className="text-sm font-medium">
                      {resumeData.experience[index]?.position} at {resumeData.experience[index]?.company}
                    </p>
                    <Textarea value={suggestion} readOnly rows={4} className="bg-muted text-sm" />
                    <Button onClick={() => applySuggestion("experience", index)} size="sm">
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Button onClick={() => generateSuggestions("skills")} disabled={isLoading} className="w-full">
              {isLoading && activeTab === "skills" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Suggest Relevant Skills
                </>
              )}
            </Button>

            {suggestions.skills && suggestions.skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                  {suggestions.skills.map((skill, index) => (
                    <span key={index} className="bg-muted px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <Button onClick={() => applySuggestion("skills")} size="sm">
                  Add All Skills
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

