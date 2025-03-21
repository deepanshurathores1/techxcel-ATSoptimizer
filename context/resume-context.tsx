"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ResumeData } from "@/types/resume"

// Default resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  },
  experience: [
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      graduationDate: "",
    },
  ],
  skills: [{ name: "" }],
  styles: {
    fontFamily: "Inter, sans-serif",
    fontSize: 12,
    lineHeight: 1.5,
    primaryColor: "#0ea5e9",
    showBorders: true,
    spacing: 24,
    sectionOrder: ["summary", "experience", "education", "skills"],
    hiddenSections: [],
  },
  customSections: [],
  selectedTemplate: "professional",
}

// Create context
interface ResumeContextType {
  resumeData: ResumeData
  updateResumeData: (data: Partial<ResumeData>) => void
  selectedTemplate: string
  setSelectedTemplate: (templateId: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

// Provider component
export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("professional")

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setResumeData(parsedData)
        if (parsedData.selectedTemplate) {
          setSelectedTemplate(parsedData.selectedTemplate)
        }
      } catch (error) {
        console.error("Error parsing saved resume data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "resumeData",
      JSON.stringify({
        ...resumeData,
        selectedTemplate,
      }),
    )
  }, [resumeData, selectedTemplate])

  // Update resume data
  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

// Custom hook to use the resume context
export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}