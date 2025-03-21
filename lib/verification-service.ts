import type { VerificationRequest, VerificationStatus, VerificationMethod } from "@/types/verification"

export interface VerificationOptions {
  method: VerificationMethod
  itemId: string
  itemType: "experience" | "education" | "certification" | "skill" | "project"
  verifierEmail?: string
  verifierName?: string
  verifierTitle?: string
  verifierOrganization?: string
  proofUrl?: string
  notes?: string
}

export async function requestVerification(options: VerificationOptions): Promise<VerificationRequest> {
  try {
    const response = await fetch("/api/verification/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      throw new Error("Failed to submit verification request")
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error requesting verification:", error)
    throw error
  }
}

export async function checkVerificationStatus(requestId: string): Promise<{
  status: VerificationStatus
  lastUpdated: string
  notes?: string
}> {
  try {
    const response = await fetch(`/api/verification/status/${requestId}`)

    if (!response.ok) {
      throw new Error("Failed to check verification status")
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error checking verification status:", error)
    throw error
  }
}

export async function uploadVerificationDocument(
  file: File,
  itemId: string,
  type: "experience" | "education" | "certification" | "skill" | "project",
): Promise<{
  id: string
  url: string
  status: VerificationStatus
}> {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("itemId", itemId)
    formData.append("type", type)

    const response = await fetch("/api/verification/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload verification document")
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error uploading verification document:", error)
    throw error
  }
}

export async function getVerificationScore(
  itemId: string,
  type: "experience" | "education" | "certification" | "skill" | "project",
): Promise<number> {
  try {
    // In a real implementation, you would fetch this from your API
    // For now, we'll return a mock score
    return Math.floor(Math.random() * 100)
  } catch (error) {
    console.error("Error getting verification score:", error)
    throw error
  }
}

export function getVerificationBadgeLevel(score: number): "none" | "low" | "medium" | "high" {
  if (score >= 90) return "high"
  if (score >= 70) return "medium"
  if (score >= 40) return "low"
  return "none"
}

