"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"
import type { ResumeData } from "@/types/resume"

// Import all templates
import MinimalTemplate from "@/components/templates/minimal-template"
import ProfessionalTemplate from "@/components/templates/professional-template"
import ExecutiveTemplate from "@/components/templates/executive-template"
import ModernTemplate from "@/components/templates/modern-template"
import TechnicalTemplate from "@/components/templates/technical-template"
import CleanTemplate from "@/components/templates/clean-template"
import SimpleTemplate from "@/components/templates/simple-template"
import ElegantTemplate from "@/components/templates/elegant-template"
import CompactTemplate from "@/components/templates/compact-template"
import MinimalistTemplate from "@/components/templates/minimalist-template"

// Import additional templates
import CorporateTemplate from "@/components/templates/corporate-template"
import CreativeTemplate from "@/components/templates/creative-template"
import TechModernTemplate from "@/components/templates/tech-modern-template"
import AcademicTemplate from "@/components/templates/academic-template"
import StartupTemplate from "@/components/templates/startup-template"
import ExecutivePlusTemplate from "@/components/templates/executive-plus-template"
import DeveloperTemplate from "@/components/templates/developer-template"
import ConsultantTemplate from "@/components/templates/consultant-template"
import GraduateTemplate from "@/components/templates/graduate-template"
import ChronologicalTemplate from "@/components/templates/chronological-template"
import FunctionalTemplate from "@/components/templates/functional-template"
import HybridTemplate from "@/components/templates/hybrid-template"
import InfographicTemplate from "@/components/templates/infographic-template"
import InternationalTemplate from "@/components/templates/international-template"
import FederalTemplate from "@/components/templates/federal-template"
import HealthcareTemplate from "@/components/templates/healthcare-template"
import LegalTemplate from "@/components/templates/legal-template"
import MarketingTemplate from "@/components/templates/marketing-template"
import EngineeringTemplate from "@/components/templates/engineering-template"
import FinanceTemplate from "@/components/templates/finance-template"
import DataScienceTemplate from "@/components/templates/data-science-template"
import ProjectManagerTemplate from "@/components/templates/project-manager-template"
import MinimalistProTemplate from "@/components/templates/minimalist-pro-template"
import CreativeDirectorTemplate from "@/components/templates/creative-director-template"
import UXDesignerTemplate from "@/components/templates/ux-designer-template"

// Add this import at the top of the file
import { allTemplates } from "@/data/templates"
import { Badge } from "@/components/ui/badge"

// Default placeholder data for initial preview
const placeholderData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    title: "Senior Software Engineer",
    summary:
      "Experienced software engineer with 8+ years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating scalable and user-friendly applications.",
  },
  experience: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      description:
        "• Led a team of 5 developers to build a scalable e-commerce platform\n• Implemented CI/CD pipelines reducing deployment time by 40%\n• Optimized database queries resulting in 30% faster page load times",
    },
    {
      company: "Digital Solutions LLC",
      position: "Software Developer",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      description:
        "• Developed responsive web applications using React and Node.js\n• Collaborated with UX designers to implement user-friendly interfaces\n• Maintained and improved legacy code bases",
    },
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      graduationDate: "May 2017",
    },
    {
      institution: "Online Academy",
      degree: "Certificate",
      fieldOfStudy: "Cloud Architecture",
      graduationDate: "Dec 2019",
    },
  ],
  skills: [
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "TypeScript" },
    { name: "AWS" },
    { name: "Docker" },
    { name: "GraphQL" },
    { name: "MongoDB" },
  ],
  styles: {
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    lineHeight: 1.5,
    primaryColor: "#1a1a1a",
    showBorders: true,
    spacing: 24,
    sectionOrder: ["summary", "experience", "education", "skills"],
    hiddenSections: [],
  },
  customSections: [],
}

interface ResumePreviewPaneProps {
  data: ResumeData
  template: string
  onTemplateChange?: (template: string) => void
}

export default function ResumePreviewPane({ data, template, onTemplateChange }: ResumePreviewPaneProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState(template)
  const [previewData, setPreviewData] = useState<ResumeData>(placeholderData)

  useEffect(() => {
    setActiveTemplate(template)
  }, [template])

  // Use actual data if it has content, otherwise use placeholder data
  useEffect(() => {
    if (data.personalInfo.fullName) {
      setPreviewData(data)
    } else {
      // Merge styles from actual data with placeholder content
      setPreviewData({
        ...placeholderData,
        styles: data.styles || placeholderData.styles,
      })
    }
  }, [data])

  const handleTemplateChange = (newTemplate: string) => {
    setActiveTemplate(newTemplate)
    if (onTemplateChange) {
      onTemplateChange(newTemplate)
    }
  }

  const renderTemplate = () => {
    switch (activeTemplate) {
      case "minimal":
        return <MinimalTemplate data={previewData} />
      case "professional":
        return <ProfessionalTemplate data={previewData} />
      case "executive":
        return <ExecutiveTemplate data={previewData} />
      case "modern":
        return <ModernTemplate data={previewData} />
      case "technical":
        return <TechnicalTemplate data={previewData} />
      case "clean":
        return <CleanTemplate data={previewData} />
      case "simple":
        return <SimpleTemplate data={previewData} />
      case "elegant":
        return <ElegantTemplate data={previewData} />
      case "compact":
        return <CompactTemplate data={previewData} />
      case "minimalist":
        return <MinimalistTemplate data={previewData} />
      case "corporate":
        return <CorporateTemplate data={previewData} />
      case "creative":
        return <CreativeTemplate data={previewData} />
      case "tech-modern":
        return <TechModernTemplate data={previewData} />
      case "academic":
        return <AcademicTemplate data={previewData} />
      case "startup":
        return <StartupTemplate data={previewData} />
      case "executive-plus":
        return <ExecutivePlusTemplate data={previewData} />
      case "developer":
        return <DeveloperTemplate data={previewData} />
      case "consultant":
        return <ConsultantTemplate data={previewData} />
      case "graduate":
        return <GraduateTemplate data={previewData} />
      case "chronological":
        return <ChronologicalTemplate data={previewData} />
      case "functional":
        return <FunctionalTemplate data={previewData} />
      case "hybrid":
        return <HybridTemplate data={previewData} />
      case "infographic":
        return <InfographicTemplate data={previewData} />
      case "international":
        return <InternationalTemplate data={previewData} />
      case "federal":
        return <FederalTemplate data={previewData} />
      case "healthcare":
        return <HealthcareTemplate data={previewData} />
      case "legal":
        return <LegalTemplate data={previewData} />
      case "marketing":
        return <MarketingTemplate data={previewData} />
      case "engineering":
        return <EngineeringTemplate data={previewData} />
      case "finance":
        return <FinanceTemplate data={previewData} />
      case "data-science":
        return <DataScienceTemplate data={previewData} />
      case "project-manager":
        return <ProjectManagerTemplate data={previewData} />
      case "minimalist-pro":
        return <MinimalistProTemplate data={previewData} />
      case "creative-director":
        return <CreativeDirectorTemplate data={previewData} />
      case "ux-designer":
        return <UXDesignerTemplate data={previewData} />
      default:
        return <MinimalTemplate data={previewData} />
    }
  }

  return (
    <div className={`sticky top-6 ${expanded ? "h-[calc(100vh-3rem)]" : "h-[700px]"}`}>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Live Preview</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Template</h3>
            {activeTemplate && (
              <Badge variant="outline" className="ml-2">
                {allTemplates.find((t) => t.id === activeTemplate)?.category || ""}
              </Badge>
            )}
          </div>
          <select
            value={activeTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="w-full p-2 border rounded-md text-sm bg-background"
          >
            {allTemplates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} {template.isNew ? "- New" : ""}
              </option>
            ))}
          </select>
        </div>
        <CardContent className="flex-1 p-0 overflow-auto">
          <div
            className="bg-white p-4 min-h-full"
            style={{
              transform: expanded ? "scale(1)" : "scale(0.9)",
              transformOrigin: "top center",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            {renderTemplate()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

