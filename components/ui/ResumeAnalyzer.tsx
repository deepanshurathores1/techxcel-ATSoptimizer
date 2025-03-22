"use client"

import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { CheckCircle2, AlertCircle, FileText, Frown, Meh, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Keep these arrays as fallbacks in case the API fails
const suggestions = [
  "Add more quantifiable achievements to strengthen impact",
  "Include relevant keywords from the job description",
  "Tailor your resume for each specific job application",
  "Use action verbs to start each bullet point",
  "Ensure consistent formatting throughout the document",
  "Proofread for grammar and spelling errors",
  "Highlight your most recent and relevant experience",
  "Keep your resume concise and to the point",
  "Include a strong summary or objective statement",
  "Customize your skills section for each job application",
]

const strengths = [
  "Clear and concise writing style",
  "Strong use of action verbs",
  "Relevant skills highlighted effectively",
  "Quantifiable achievements included",
  "Well-organized and easy to read",
  "Tailored to the specific job or industry",
  "Professional formatting and design",
  "Compelling summary or objective statement",
  "Demonstrates career progression",
  "Showcases relevant certifications or training",
]

const improvementAreas = [
  "Lack of quantifiable achievements",
  "Inconsistent formatting",
  "Too wordy or lengthy",
  "Missing relevant keywords",
  "Weak or generic summary statement",
  "Outdated or irrelevant information included",
  "Not tailored to the specific job",
  "Lack of action verbs",
  "Too much focus on job duties rather than achievements",
  "Gaps in employment not addressed",
]

export function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState<{
    score: number
    suggestions: string[]
    strengths: string[]
    improvements: string[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      // Don't automatically analyze - wait for job description and submission
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  })

  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a resume file")
      return
    }
    
    if (!jobDescription || jobDescription.trim().length < 10) {
      setError("Please enter a detailed job description")
      return
    }

    setError(null)
    setIsAnalyzing(true)
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobDescription", jobDescription)
      
      // Call the API route
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze resume")
      }
      
      const result = await response.json()
      
      // Set the analysis data from API result
      setAnalysis({
        score: result.atsAnalysis.score,
        suggestions: result.resumeFeedback.suggestions,
        strengths: result.resumeFeedback.strengths,
        improvements: result.resumeFeedback.areas_for_improvement,
      })
    } catch (err) {
      console.error("Error analyzing resume:", err)
      setError((err as Error).message || "Failed to analyze resume")
      
      // Fallback to random data if API fails
      setAnalysis({
        score: getRandomScore(),
        suggestions: getRandomItems(suggestions, 3),
        strengths: getRandomItems(strengths, 3),
        improvements: getRandomItems(improvementAreas, 3),
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper function for fallback data
  const getRandomScore = () => Math.floor(Math.random() * (98 - 65 + 1)) + 65
  const getRandomItems = (items: string[], count: number) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const getMoodEmoji = (score: number) => {
    if (score < 75) return <Frown className="h-8 w-8 text-red-500" />
    if (score < 85) return <Meh className="h-8 w-8 text-yellow-500" />
    return <Smile className="h-8 w-8 text-green-500" />
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Resume Analysis</h2>
        <p className="text-gray-600">Upload your resume for instant feedback and improvement suggestions</p>
      </div>

      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <FileText className="h-12 w-12 text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">
              {file
                ? file.name
                : isDragActive
                ? "Drop the file here"
                : "Drag and drop your resume here, or click to select"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Supports PDF and DOCX formats</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          placeholder="Paste the job description here..."
          className="min-h-32"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <p className="text-sm text-gray-500">
          For best results, include the full job description including requirements and responsibilities
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        <Button 
          onClick={analyzeResume} 
          disabled={isAnalyzing || !file || !jobDescription}
          className="px-8 py-2"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>

      {isAnalyzing && (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg font-medium text-gray-700 mt-4">Analyzing your resume...</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ATS Compatibility Score</CardTitle>
              {getMoodEmoji(analysis.score)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysis.score}%</div>
              <div className="relative w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${analysis.score < 75 ? "bg-red-500" : analysis.score < 85 ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${analysis.score}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
