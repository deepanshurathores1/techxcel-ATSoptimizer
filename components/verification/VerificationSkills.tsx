"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Loader2, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"
import type { VerificationRequest } from "@/types/verification"
import { VerificationBadge } from "./VerificationBadge"

interface VerificationSkillsProps {
  skills: ResumeData["skills"]
  verificationRequests: VerificationRequest[]
  updateProfile: (profile: Partial<ResumeData>) => void
}

export function VerificationSkills({ skills, verificationRequests, updateProfile }: VerificationSkillsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<(typeof skills)[0] | null>(null)
  const [verificationMethod, setVerificationMethod] = useState<string>("skills_assessment")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleVerificationRequest = async () => {
    if (!selectedSkill) return

    setIsLoading(true)

    try {
      // Prepare request data based on verification method
      const requestData = {
        type: "skill",
        itemId: selectedSkill.id || `skill-${Date.now()}`,
        method: verificationMethod,
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
        setVerificationMethod("skills_assessment")
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

  const getVerificationStatus = (skillId: string | undefined) => {
    if (!skillId) return null

    const request = verificationRequests.find((req) => req.itemId === skillId)

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
          <CardTitle>Skills Verification</CardTitle>
          <CardDescription>Verify your skills to increase credibility with employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skills.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No skills to verify. Add skills in your profile first.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <Card key={skill.id || index} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          {skill.level && <p className="text-xs text-muted-foreground capitalize">{skill.level}</p>}
                        </div>
                        <div>
                          {skill.verified ? (
                            <VerificationBadge score={skill.verificationScore || 100} size="sm" />
                          ) : (
                            getVerificationStatus(skill.id) || (
                              <Dialog
                                open={isDialogOpen && selectedSkill?.id === skill.id}
                                onOpenChange={(open) => {
                                  setIsDialogOpen(open)
                                  if (!open) setSelectedSkill(null)
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={() => setSelectedSkill(skill)}>
                                    Verify
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Verify Skill</DialogTitle>
                                    <DialogDescription>
                                      Choose a verification method for your {skill.name} skill
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Select value={verificationMethod} onValueChange={setVerificationMethod}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a verification method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="skills_assessment">Skills Assessment</SelectItem>
                                          <SelectItem value="github_verification">GitHub Projects</SelectItem>
                                          <SelectItem value="ai_screening">AI Screening</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {verificationMethod === "skills_assessment" && (
                                      <div className="space-y-2">
                                        <p className="text-sm">
                                          Take a skills assessment to verify your proficiency in {skill.name}.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          The assessment will take approximately 15-30 minutes to complete.
                                        </p>
                                      </div>
                                    )}

                                    {verificationMethod === "github_verification" && (
                                      <div className="space-y-2">
                                        <p className="text-sm">
                                          Connect your GitHub account to verify your {skill.name} skills through your
                                          projects.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          We'll analyze your repositories to verify your skill level.
                                        </p>
                                      </div>
                                    )}

                                    {verificationMethod === "ai_screening" && (
                                      <div className="space-y-2">
                                        <p className="text-sm">
                                          Use AI screening to verify your {skill.name} skills based on your resume
                                          content.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          Our AI will analyze your experience and projects to verify your skill level.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" onClick={handleVerificationRequest} disabled={isLoading}>
                                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                      Start Verification
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )
                          )}
                        </div>
                      </div>
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

