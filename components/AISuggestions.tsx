"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface AISuggestionsProps {
  jobDescription: string
  currentSummary: string
  onApplySuggestion: (suggestion: string) => void
}

export default function AISuggestions({ jobDescription, currentSummary, onApplySuggestion }: AISuggestionsProps) {
  const [suggestion, setSuggestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateSuggestion = async () => {
    setIsLoading(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Given the following job description and current resume summary, provide an improved, ATS-friendly summary that highlights relevant skills and experience:

Job Description:
${jobDescription}

Current Summary:
${currentSummary}

Improved Summary:`,
      })
      setSuggestion(text)
    } catch (error) {
      console.error("Error generating suggestion:", error)
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Suggestions</CardTitle>
        <CardDescription>Get AI-generated improvements for your resume summary</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={generateSuggestion} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Suggestion"}
        </Button>
        {suggestion && (
          <>
            <Textarea className="mt-4" value={suggestion} readOnly rows={5} />
            <Button onClick={() => onApplySuggestion(suggestion)} className="mt-2">
              Apply Suggestion
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

