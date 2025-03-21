"use client"

import { useState, useEffect } from "react"
import { useResumeContext } from "@/context/resume-context"
import MinimalTemplate from "./templates/minimal-template"
import ProfessionalTemplate from "./templates/professional-template"
import ExecutiveTemplate from "./templates/executive-template"
import ModernTemplate from "./templates/modern-template"
import TechnicalTemplate from "./templates/technical-template"
import CleanTemplate from "./templates/clean-template"
import SimpleTemplate from "./templates/simple-template"
import ElegantTemplate from "./templates/elegant-template"
import CompactTemplate from "./templates/compact-template"
import MinimalistTemplate from "./templates/minimalist-template"
import CorporateTemplate from "./templates/corporate-template"
import CreativeTemplate from "./templates/creative-template"
import TechModernTemplate from "./templates/tech-modern-template"
import AcademicTemplate from "./templates/academic-template"
import StartupTemplate from "./templates/startup-template"
import ExecutivePlusTemplate from "./templates/executive-plus-template"
import DeveloperTemplate from "./templates/developer-template"
import ConsultantTemplate from "./templates/consultant-template"
import GraduateTemplate from "./templates/graduate-template"
import ChronologicalTemplate from "./templates/chronological-template"
import FunctionalTemplate from "./templates/functional-template"
import HybridTemplate from "./templates/hybrid-template"
import InfographicTemplate from "./templates/infographic-template"
import InternationalTemplate from "./templates/international-template"
import FederalTemplate from "./templates/federal-template"
import HealthcareTemplate from "./templates/healthcare-template"
import LegalTemplate from "./templates/legal-template"
import MarketingTemplate from "./templates/marketing-template"
import EngineeringTemplate from "./templates/engineering-template"
import FinanceTemplate from "./templates/finance-template"
import DataScienceTemplate from "./templates/data-science-template"
import ProjectManagerTemplate from "./templates/project-manager-template"
import MinimalistProTemplate from "./templates/minimalist-pro-template"
import CreativeDirectorTemplate from "./templates/creative-director-template"
import UXDesignerTemplate from "./templates/ux-designer-template"
import GovernmentAffairsTemplate from "./templates/government-affairs-template"
import NonprofitTemplate from "./templates/nonprofit-template"
import SalesExecutiveTemplate from "./templates/sales-executive-template"
import RemoteProfessionalTemplate from "./templates/remote-professional-template"
import CareerChangeTemplate from "./templates/career-change-template"
import ExecutiveAssistantTemplate from "./templates/executive-assistant-template"
import HumanResourcesTemplate from "./templates/human-resources-template"
import SupplyChainTemplate from "./templates/supply-chain-template"
import EducationTemplate from "./templates/education-template"
import CybersecurityTemplate from "./templates/cybersecurity-template"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const templateComponents = {
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  technical: TechnicalTemplate,
  clean: CleanTemplate,
  simple: SimpleTemplate,
  elegant: ElegantTemplate,
  compact: CompactTemplate,
  minimalist: MinimalistTemplate,
  corporate: CorporateTemplate,
  creative: CreativeTemplate,
  "tech-modern": TechModernTemplate,
  academic: AcademicTemplate,
  startup: StartupTemplate,
  "executive-plus": ExecutivePlusTemplate,
  developer: DeveloperTemplate,
  consultant: ConsultantTemplate,
  graduate: GraduateTemplate,
  chronological: ChronologicalTemplate,
  functional: FunctionalTemplate,
  hybrid: HybridTemplate,
  infographic: InfographicTemplate,
  international: InternationalTemplate,
  federal: FederalTemplate,
  healthcare: HealthcareTemplate,
  legal: LegalTemplate,
  marketing: MarketingTemplate,
  engineering: EngineeringTemplate,
  finance: FinanceTemplate,
  "data-science": DataScienceTemplate,
  "project-manager": ProjectManagerTemplate,
  "minimalist-pro": MinimalistProTemplate,
  "creative-director": CreativeDirectorTemplate,
  "ux-designer": UXDesignerTemplate,
  "government-affairs": GovernmentAffairsTemplate,
  nonprofit: NonprofitTemplate,
  "sales-executive": SalesExecutiveTemplate,
  "remote-professional": RemoteProfessionalTemplate,
  "career-change": CareerChangeTemplate,
  "executive-assistant": ExecutiveAssistantTemplate,
  "human-resources": HumanResourcesTemplate,
  "supply-chain": SupplyChainTemplate,
  education: EducationTemplate,
  cybersecurity: CybersecurityTemplate,
}

// Template categories for organization
const templateCategories = {
  minimal: "Basic",
  professional: "Basic",
  executive: "Basic",
  modern: "Basic",
  technical: "Basic",
  clean: "Basic",
  simple: "Basic",
  elegant: "Basic",
  compact: "Basic",
  minimalist: "Basic",
  corporate: "Professional",
  creative: "Professional",
  "tech-modern": "Professional",
  academic: "Professional",
  startup: "Professional",
  "executive-plus": "Professional",
  developer: "Industry",
  consultant: "Industry",
  graduate: "Industry",
  chronological: "Format",
  functional: "Format",
  hybrid: "Format",
  infographic: "Format",
  international: "Format",
  federal: "Industry",
  healthcare: "Industry",
  legal: "Industry",
  marketing: "Industry",
  engineering: "Industry",
  finance: "Industry",
  "data-science": "Industry",
  "project-manager": "Industry",
  "minimalist-pro": "Professional",
  "creative-director": "Industry",
  "ux-designer": "Industry",
  "government-affairs": "Specialized",
  nonprofit: "Specialized",
  "sales-executive": "Specialized",
  "remote-professional": "Specialized",
  "career-change": "Specialized",
  "executive-assistant": "Specialized",
  "human-resources": "Specialized",
  "supply-chain": "Specialized",
  education: "Specialized",
  cybersecurity: "Specialized",
}

const LivePreview = () => {
  const { resumeData, setResumeData } = useResumeContext()
  const [selectedTemplate, setSelectedTemplate] = useState("professional")
  const router = useRouter()

  useEffect(() => {
    if (resumeData.selectedTemplate) {
      setSelectedTemplate(resumeData.selectedTemplate)
    }
  }, [resumeData.selectedTemplate])

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    setResumeData({
      ...resumeData,
      selectedTemplate: templateId,
    })

    // Navigate to the preview page for this template
    router.push(`/preview/${templateId}`)
  }

  const TemplateComponent = templateComponents[selectedTemplate] || ProfessionalTemplate

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <div className="w-full md:w-auto">
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              <div className="p-2 mb-1 bg-slate-50 text-xs font-semibold text-slate-500">BASIC TEMPLATES</div>
              {Object.keys(templateComponents)
                .filter((id) => templateCategories[id] === "Basic")
                .map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{templateId.replace(/-/g, " ")}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Basic
                      </Badge>
                    </div>
                  </SelectItem>
                ))}

              <div className="p-2 mb-1 bg-slate-50 text-xs font-semibold text-slate-500">PROFESSIONAL TEMPLATES</div>
              {Object.keys(templateComponents)
                .filter((id) => templateCategories[id] === "Professional")
                .map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{templateId.replace(/-/g, " ")}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Professional
                      </Badge>
                    </div>
                  </SelectItem>
                ))}

              <div className="p-2 mb-1 bg-slate-50 text-xs font-semibold text-slate-500">INDUSTRY TEMPLATES</div>
              {Object.keys(templateComponents)
                .filter((id) => templateCategories[id] === "Industry")
                .map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{templateId.replace(/-/g, " ")}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Industry
                      </Badge>
                    </div>
                  </SelectItem>
                ))}

              <div className="p-2 mb-1 bg-slate-50 text-xs font-semibold text-slate-500">FORMAT TEMPLATES</div>
              {Object.keys(templateComponents)
                .filter((id) => templateCategories[id] === "Format")
                .map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{templateId.replace(/-/g, " ")}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Format
                      </Badge>
                    </div>
                  </SelectItem>
                ))}

              <div className="p-2 mb-1 bg-slate-50 text-xs font-semibold text-slate-500">SPECIALIZED TEMPLATES</div>
              {Object.keys(templateComponents)
                .filter((id) => templateCategories[id] === "Specialized")
                .map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{templateId.replace(/-/g, " ")}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Specialized
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg p-4 overflow-auto max-h-[600px] bg-white">
        <div className="w-full" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default LivePreview

