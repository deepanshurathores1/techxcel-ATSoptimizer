"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Brain, AlertCircle, CheckCircle2, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface AISkillsVerificationProps {
  resumeData: any
  onSkillsVerified: (
    verifiedSkills: Array<{
      name: string
      verified: boolean
      verificationMethod: string
      verificationScore: number
    }>,
  ) => void
}

export default function AISkillsVerification({ resumeData, onSkillsVerified }: AISkillsVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationResults, setVerificationResults] = useState<any | null>(null)
  const { toast } = useToast()

  const verifySkills = async () => {
    if (!resumeData.skills || resumeData.skills.length === 0) {
      setError("No skills found to verify")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // Extract relevant data for verification
      const skills = resumeData.skills.map((skill: any) => skill.name)
      const experience = resumeData.experience || []
      const education = resumeData.education || []
      const projects = resumeData.projects || []
      const certifications = resumeData.certifications || []

      // Prepare the resume text for analysis
      const resumeText = `
        Skills: ${skills.join(", ")}
        
        Experience:
        ${experience
          .map(
            (exp: any) =>
              `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})
           ${exp.description}`,
          )
          .join("\n\n")}
        
        Education:
        ${education
          .map((edu: any) => `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution} (${edu.graduationDate})`)
          .join("\n\n")}
        
        ${
          projects.length > 0
            ? `Projects:
        ${projects
          .map(
            (proj: any) =>
              `${proj.name}: ${proj.description}
           Technologies: ${proj.technologies?.join(", ") || "Not specified"}`,
          )
          .join("\n\n")}`
            : ""
        }
        
        ${
          certifications.length > 0
            ? `Certifications:
        ${certifications.map((cert: any) => `${cert.name} from ${cert.issuer} (${cert.issueDate})`).join("\n\n")}`
            : ""
        }
      `

      // In a real implementation, you would call your backend API
      // For this example, we'll use the AI SDK directly
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          You are an AI resume skills verifier. Analyze the following resume text and determine if the mentioned skills are truly backed by experience, education, projects, or certifications.
          
          For each skill, provide:
          1. A verification score (0-100%)
          2. A brief reason for the score
          
          Resume Text:
          ${resumeText}
          
          Format your response as JSON:
          {
            "skillVerifications": [
              {
                "skill": "skill name",
                "score": 85,
                "reason": "Brief explanation"
              }
            ],
            "overallScore": 75,
            "summary": "Brief overall assessment"
          }
        `,
      })

      // Parse the AI response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Failed to parse AI response")
      }

      const results = JSON.parse(jsonMatch[0])
      setVerificationResults(results)

      // Process verified skills
      const verifiedSkills = results.skillVerifications.map((verification: any) => ({
        name: verification.skill,
        verified: verification.score >= 50,
        verificationMethod: "AI Analysis",
        verificationScore: verification.score,
      }))

      onSkillsVerified(verifiedSkills)

      toast({
        title: "Skills Verification Complete",
        description: `Overall verification score: ${results.overallScore}%`,
      })
    } catch (err) {
      console.error("Verification error:", err)
      setError(err instanceof Error ? err.message : "Failed to verify skills")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Skills Verification
        </CardTitle>
        <CardDescription>Verify your skills by analyzing your resume content for supporting evidence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>How it works</AlertTitle>
          <AlertDescription>
            Our AI analyzes your resume to verify if your skills are backed by your experience, education, projects, and
            certifications.
          </AlertDescription>
        </Alert>

        {verificationResults && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Overall Verification Score</h3>
                <Badge variant={verificationResults.overallScore >= 70 ? "default" : "outline"}>
                  {verificationResults.overallScore}%
                </Badge>
              </div>
              <Progress value={verificationResults.overallScore} className="h-2" />
              <p className="text-sm text-muted-foreground">{verificationResults.summary}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Skill Verification Results</h3>
              <div className="space-y-2">
                {verificationResults.skillVerifications.map((verification: any, index: number) => (
                  <div key={index} className="p-2 border rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={verification.score >= 70 ? "default" : "outline"}>{verification.score}%</Badge>
                        <span className="font-medium">{verification.skill}</span>
                      </div>
                      {verification.score >= 70 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : verification.score >= 40 ? (
                        <Info className="h-4 w-4 text-amber-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{verification.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={verifySkills} disabled={isVerifying} className="w-full">
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Skills...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Verify Skills with AI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

