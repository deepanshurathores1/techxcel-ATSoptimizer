"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, FileText, FileIcon as FilePdf, FileDown, Settings, Check, Image } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { useToast } from "@/hooks/use-toast"
import type { ResumeData } from "@/types/resume"

interface DownloadOptionsProps {
  resumeRef: React.RefObject<HTMLDivElement>
  resumeData: ResumeData
  templateName: string
}

export default function DownloadOptions({ resumeRef, resumeData, templateName }: DownloadOptionsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "docx" | "png" | "jpeg" | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    highQuality: true,
    includeLinks: true,
    letterFormat: true,
    optimizeForATS: false,
  })
  const { toast } = useToast()
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) {
      toast({
        title: "Error",
        description: "Could not find resume content to download",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    setDownloadFormat("pdf")

    try {
      // Create a clone of the resume element to avoid modifying the displayed version
      const resumeElement = resumeRef.current.cloneNode(true) as HTMLElement

      // Apply print-specific styles to ensure proper rendering
      resumeElement.style.width = "800px"
      resumeElement.style.height = "auto"
      resumeElement.style.backgroundColor = "white"
      resumeElement.style.padding = "0"
      resumeElement.style.margin = "0"

      // Create a temporary container for the clone
      const container = document.createElement("div")
      container.style.position = "absolute"
      container.style.left = "-9999px"
      container.style.top = "-9999px"
      container.appendChild(resumeElement)
      document.body.appendChild(container)

      // Capture the resume with improved settings
      const canvas = await html2canvas(resumeElement, {
        scale: settings.highQuality ? 3 : 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: 800,
        windowHeight: settings.letterFormat ? 1056 : 1131, // Letter or A4 height
      })

      // Remove the temporary container
      document.body.removeChild(container)

      // Create PDF with proper dimensions
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: settings.letterFormat ? "letter" : "a4",
      })

      // Calculate the width and height to maintain aspect ratio
      const pageWidth = settings.letterFormat ? 215.9 : 210 // Letter or A4 width in mm
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      // Add metadata for better ATS compatibility if selected
      if (settings.optimizeForATS) {
        pdf.setProperties({
          title: `${resumeData.personalInfo.fullName} - Resume`,
          subject: resumeData.personalInfo.title,
          author: resumeData.personalInfo.fullName,
          keywords: resumeData.skills.map((skill) => skill.name).join(", "),
          creator: "Resume Builder",
        })
      }

      const fileName = `${resumeData.personalInfo.fullName || "Resume"}_${templateName}.pdf`
      pdf.save(fileName)

      toast({
        title: "PDF Downloaded Successfully",
        description: "Your resume has been downloaded as a PDF file.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
      setDownloadFormat(null)
    }
  }

  const handleDownloadImage = async (format: "png" | "jpeg") => {
    if (!resumeRef.current) {
      toast({
        title: "Error",
        description: "Could not find resume content to download",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    setDownloadFormat(format)

    try {
      // Create a clone of the resume element to avoid modifying the displayed version
      const resumeElement = resumeRef.current.cloneNode(true) as HTMLElement

      // Apply print-specific styles to ensure proper rendering
      resumeElement.style.width = "800px"
      resumeElement.style.height = "auto"
      resumeElement.style.backgroundColor = "white"
      resumeElement.style.padding = "0"
      resumeElement.style.margin = "0"

      // Create a temporary container for the clone
      const container = document.createElement("div")
      container.style.position = "absolute"
      container.style.left = "-9999px"
      container.style.top = "-9999px"
      container.appendChild(resumeElement)
      document.body.appendChild(container)

      // Capture the resume with improved settings
      const canvas = await html2canvas(resumeElement, {
        scale: settings.highQuality ? 3 : 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Remove the temporary container
      document.body.removeChild(container)

      // Create a download link for the image
      const link = document.createElement("a")
      const imageType = format === "jpeg" ? "image/jpeg" : "image/png"
      const quality = format === "jpeg" ? 0.9 : undefined
      link.href = canvas.toDataURL(imageType, quality)
      link.download = `${resumeData.personalInfo.fullName || "Resume"}_${templateName}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: `${format.toUpperCase()} Downloaded Successfully`,
        description: `Your resume has been downloaded as a ${format.toUpperCase()} file.`,
        variant: "default",
      })
    } catch (error) {
      console.error(`Error generating ${format}:`, error)
      toast({
        title: "Download Failed",
        description: `There was an error generating your ${format.toUpperCase()} file. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
      setDownloadFormat(null)
    }
  }

  const handleDownloadDOCX = async () => {
    setIsDownloading(true)
    setDownloadFormat("docx")

    try {
      // In a real implementation, we would call our backend API to generate the DOCX
      // For this example, we'll simulate a successful download

      // Create a simple DOCX file with the resume content
      // This is a simplified version - in a real app, you'd use a proper DOCX generation library
      const blob = await generateSimpleDocx(resumeRef.current, resumeData)

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a link element and trigger download
      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeData.personalInfo.fullName || "Resume"}_${templateName}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      window.URL.revokeObjectURL(url)

      toast({
        title: "DOCX Downloaded Successfully",
        description: "Your resume has been downloaded as a Word document.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error generating DOCX:", error)
      toast({
        title: "Download Failed",
        description: "There was an error generating your Word document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
      setDownloadFormat(null)
    }
  }

  // Simple function to generate a DOCX file
  // In a real app, you'd use a proper DOCX generation library
  const generateSimpleDocx = async (resumeElement: HTMLDivElement | null, data: ResumeData) => {
    if (!resumeElement) {
      throw new Error("Resume element not found")
    }

    // For demo purposes, we'll create a simple XML that Word can open
    // This is not a proper DOCX file, but it will demonstrate the functionality
    const textContent = `
      ${data.personalInfo.fullName}
      ${data.personalInfo.title}
      ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}
      
      SUMMARY
      ${data.personalInfo.summary}
      
      EXPERIENCE
      ${data.experience
        .map(
          (exp) => `
        ${exp.position} at ${exp.company}
        ${exp.startDate} - ${exp.endDate}
        ${exp.description}
      `,
        )
        .join("\n")}
      
      EDUCATION
      ${data.education
        .map(
          (edu) => `
        ${edu.degree} in ${edu.fieldOfStudy}
        ${edu.institution}
        ${edu.graduationDate}
      `,
        )
        .join("\n")}
      
      SKILLS
      ${data.skills.map((skill) => skill.name).join(", ")}
    `

    // Create a simple XML that Word can open
    const xmlContent = `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <?mso-application progid="Word.Document"?>
      <w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
        <w:body>
          <w:p>
            <w:r>
              <w:t>${textContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</w:t>
            </w:r>
          </w:p>
        </w:body>
      </w:wordDocument>
    `

    // Create a blob from the XML
    return new Blob([xmlContent], { type: "application/vnd.ms-word" })
  }

  return (
    <>
      <div className="space-y-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? `Generating ${downloadFormat?.toUpperCase()}...` : "Download Resume"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleDownloadPDF} disabled={isDownloading}>
              <FilePdf className="mr-2 h-4 w-4" />
              <span>Download as PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadDOCX} disabled={isDownloading}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Download as Word (DOCX)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadImage("png")} disabled={isDownloading}>
              <Image className="mr-2 h-4 w-4" />
              <span>Download as PNG</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadImage("jpeg")} disabled={isDownloading}>
              <Image className="mr-2 h-4 w-4" />
              <span>Download as JPEG</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowSettings(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Download Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => (window.location.href = `/form?template=${templateName}`)}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Edit Resume
        </Button>
      </div>

      {/* Download Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Settings</DialogTitle>
            <DialogDescription>Configure your resume download options</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="high-quality"
                checked={settings.highQuality}
                onCheckedChange={(checked) => setSettings({ ...settings, highQuality: checked === true })}
              />
              <Label htmlFor="high-quality">High quality (larger file size)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-links"
                checked={settings.includeLinks}
                onCheckedChange={(checked) => setSettings({ ...settings, includeLinks: checked === true })}
              />
              <Label htmlFor="include-links">Include clickable links</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="letter-format"
                checked={settings.letterFormat}
                onCheckedChange={(checked) => setSettings({ ...settings, letterFormat: checked === true })}
              />
              <Label htmlFor="letter-format">US Letter format (instead of A4)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ats-optimize"
                checked={settings.optimizeForATS}
                onCheckedChange={(checked) => setSettings({ ...settings, optimizeForATS: checked === true })}
              />
              <Label htmlFor="ats-optimize">Optimize for ATS (Applicant Tracking Systems)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setShowSettings(false)}>
              <Check className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

