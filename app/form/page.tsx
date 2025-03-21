"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, Trash2, Save, Eye } from "lucide-react"
import { useResume } from "@/context/resume-context"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DraggableSection from "@/components/DraggableSection"
import ResumePreviewPane from "@/components/ResumePreviewPane"
import StyleEditor, { type ResumeStyles } from "@/components/StyleEditor"
import CustomSectionEditor from "@/components/CustomSectionEditor"
import AISuggestions from "@/components/AISuggestions"
import LinkedInIntegration from "@/components/api-integration/LinkedInIntegration"
import GitHubIntegration from "@/components/api-integration/GitHubIntegration"
import GeminiAIIntegration from "@/components/api-integration/GeminiAIIntegration"

const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    location: z.string().min(2, { message: "Please enter your location." }),
    title: z.string().min(2, { message: "Please enter your professional title." }),
    summary: z.string().min(10, { message: "Summary must be at least 10 characters." }),
  }),
  experience: z.array(
    z.object({
      company: z.string().min(1, { message: "Company name is required." }),
      position: z.string().min(1, { message: "Position is required." }),
      startDate: z.string().min(1, { message: "Start date is required." }),
      endDate: z.string().min(1, { message: "End date is required." }),
      description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    }),
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1, { message: "Institution name is required." }),
      degree: z.string().min(1, { message: "Degree is required." }),
      fieldOfStudy: z.string().min(1, { message: "Field of study is required." }),
      graduationDate: z.string().min(1, { message: "Graduation date is required." }),
    }),
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, { message: "Skill name is required." }),
    }),
  ),
})

export default function ResumeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateParam = searchParams.get("template") || "minimal"

  const [activeTab, setActiveTab] = useState("personal-info")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [customSections, setCustomSections] = useState([])
  const [showIntegrations, setShowIntegrations] = useState(false)

  const [resumeStyles, setResumeStyles] = useState<ResumeStyles>({
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    lineHeight: 1.5,
    primaryColor: "#1a1a1a",
    showBorders: true,
    spacing: 24,
    sectionOrder: ["summary", "experience", "education", "skills"],
    hiddenSections: [],
  })

  const { resumeData, updateResumeData, selectedTemplate, setSelectedTemplate } = useResume()

  const [sections, setSections] = useState([
    { id: "personal-info", title: "Personal Information" },
    { id: "experience", title: "Work Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" },
    { id: "style", title: "Style & Formatting" },
    { id: "custom", title: "Custom Sections" },
    { id: "integrations", title: "Import & AI" },
  ])

  const moveSection = (dragIndex, hoverIndex) => {
    const newSections = [...sections]
    const draggedSection = newSections[dragIndex]
    newSections.splice(dragIndex, 1)
    newSections.splice(hoverIndex, 0, draggedSection)
    setSections(newSections)
  }

  // Set the selected template based on the URL parameter
  useEffect(() => {
    setSelectedTemplate(templateParam)
  }, [templateParam, setSelectedTemplate])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: resumeData.personalInfo.fullName || "",
        email: resumeData.personalInfo.email || "",
        phone: resumeData.personalInfo.phone || "",
        location: resumeData.personalInfo.location || "",
        title: resumeData.personalInfo.title || "",
        summary: resumeData.personalInfo.summary || "",
      },
      experience:
        resumeData.experience.length > 0
          ? resumeData.experience
          : [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
      education:
        resumeData.education.length > 0
          ? resumeData.education
          : [{ institution: "", degree: "", fieldOfStudy: "", graduationDate: "" }],
      skills: resumeData.skills.length > 0 ? resumeData.skills : [{ name: "" }],
    },
  })

  // Update the context data when form values change
  const formValues = form.watch()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateResumeData({
        ...formValues,
        styles: resumeStyles,
        customSections,
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [formValues, resumeStyles, customSections, updateResumeData])

  function onSubmit(values) {
    updateResumeData({
      ...values,
      styles: resumeStyles,
      customSections,
    })
    router.push(`/preview/${selectedTemplate}`)
  }

  function addExperience() {
    const currentExperience = form.getValues("experience")
    form.setValue("experience", [
      ...currentExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  function removeExperience(index) {
    const currentExperience = form.getValues("experience")
    form.setValue(
      "experience",
      currentExperience.filter((_, i) => i !== index),
    )
  }

  function addEducation() {
    const currentEducation = form.getValues("education")
    form.setValue("education", [
      ...currentEducation,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        graduationDate: "",
      },
    ])
  }

  function removeEducation(index) {
    const currentEducation = form.getValues("education")
    form.setValue(
      "education",
      currentEducation.filter((_, i) => i !== index),
    )
  }

  function addSkill() {
    const currentSkills = form.getValues("skills")
    form.setValue("skills", [...currentSkills, { name: "" }])
  }

  function removeSkill(index) {
    const currentSkills = form.getValues("skills")
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  const handleApplySuggestion = (suggestion) => {
    form.setValue("personalInfo.summary", suggestion)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Create Your Resume</h1>
          <div className="ml-auto flex gap-2">
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                <div
                  className="bg-white p-6"
                  style={{
                    width: "100%",
                    maxWidth: "800px",
                    margin: "0 auto",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Preview content */}
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={form.handleSubmit(onSubmit)}>
              <Save className="mr-2 h-4 w-4" />
              Save & Preview
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Resume Sections</CardTitle>
                <CardDescription>Drag and drop to reorder sections</CardDescription>
              </CardHeader>
              <CardContent>
                {sections.map((section, index) => (
                  <DraggableSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    index={index}
                    moveSection={moveSection}
                    setActiveTab={setActiveTab}
                    isActive={activeTab === section.id}
                  />
                ))}
              </CardContent>
            </Card>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                {activeTab === "personal-info" && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Add your contact details and professional summary</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="personalInfo.fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Professional Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="personalInfo.email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="personalInfo.location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="New York, NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="personalInfo.summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Summary</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Experienced software engineer with a passion for developing innovative solutions..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Keep your summary concise and highlight your key qualifications.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button type="button" onClick={() => setActiveTab("experience")}>
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Job Description</CardTitle>
                        <CardDescription>Paste the job description to get AI-powered suggestions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste job description here..."
                          rows={5}
                        />
                      </CardContent>
                    </Card>

                    {jobDescription && (
                      <AISuggestions
                        jobDescription={jobDescription}
                        currentSummary={form.watch("personalInfo.summary")}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    )}
                  </>
                )}

                {activeTab === "experience" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Work Experience</CardTitle>
                      <CardDescription>Add your relevant work history</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {form.getValues("experience").map((_, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                          <div className="absolute top-4 right-4">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExperience(index)}
                              disabled={form.getValues("experience").length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <h3 className="font-medium">Position {index + 1}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`experience.${index}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Acme Inc." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`experience.${index}.position`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Position</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Senior Developer" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`experience.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Jan 2020" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`experience.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Present" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`experience.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Led a team of developers to build a scalable web application..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Use bullet points and action verbs to describe your responsibilities and achievements.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addExperience} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Position
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("personal-info")}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("education")}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "education" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>Add your educational background</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {form.getValues("education").map((_, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                          <div className="absolute top-4 right-4">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEducation(index)}
                              disabled={form.getValues("education").length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <h3 className="font-medium">Education {index + 1}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.institution`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Institution</FormLabel>
                                  <FormControl>
                                    <Input placeholder="University of Technology" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.degree`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bachelor of Science" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`education.${index}.fieldOfStudy`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Field of Study</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Computer Science" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`education.${index}.graduationDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Graduation Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="May 2018" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addEducation} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Education
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("experience")}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("skills")}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "skills" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                      <CardDescription>Add your key skills and competencies</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.getValues("skills").map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`skills.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="JavaScript" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSkill(index)}
                              disabled={form.getValues("skills").length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" onClick={addSkill} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Skill
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("education")}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("style")}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {activeTab === "style" && <StyleEditor styles={resumeStyles} onStyleChange={setResumeStyles} />}

                {activeTab === "custom" && (
                  <CustomSectionEditor customSections={customSections} onUpdate={setCustomSections} />
                )}

                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    <LinkedInIntegration />
                    <GitHubIntegration />
                    <GeminiAIIntegration
                      jobDescription={jobDescription}
                      currentSummary={form.watch("personalInfo.summary")}
                      currentExperience={form.watch("experience")}
                    />
                  </div>
                )}
              </form>
            </Form>
          </div>

          <div className="lg:w-1/2">
            <ResumePreviewPane
              data={{
                ...formValues,
                styles: resumeStyles,
                customSections,
              }}
              template={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

