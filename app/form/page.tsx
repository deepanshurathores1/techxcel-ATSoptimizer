"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { generateResumePdf, generateResumeDocx } from '@/utils/downloadResume';
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, Trash2, Save, Eye } from "lucide-react";
import { useResume, ResumeProvider } from "@/context/resume-context";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableSection from "@/components/DraggableSection";
import ResumePreviewPane from "@/components/ResumePreviewPane";
import StyleEditor, { type ResumeStyles } from "@/components/StyleEditor";
import CustomSectionEditor from "@/components/CustomSectionEditor";
import AISuggestions from "@/components/AISuggestions";
import LinkedInIntegration from "@/components/api-integration/LinkedInIntegration";
import GitHubIntegration from "@/components/api-integration/GitHubIntegration";
import GeminiAIIntegration from "@/components/api-integration/GeminiAIIntegration";

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
});

function ResumeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "minimal";

  const [activeTab, setActiveTab] = useState("personal-info");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [customSections, setCustomSections] = useState([]);
  const [showIntegrations, setShowIntegrations] = useState(false);

  const [resumeStyles, setResumeStyles] = useState<ResumeStyles>({
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    lineHeight: 1.5,
    primaryColor: "#1a1a1a",
    showBorders: true,
    spacing: 24,
    sectionOrder: ["summary", "experience", "education", "skills"],
    hiddenSections: [],
  });

  const { resumeData, updateResumeData, selectedTemplate, setSelectedTemplate } = useResume();

  const sections = useMemo(
    () => [
      { id: "personal-info", title: "Personal Information" },
      { id: "experience", title: "Work Experience" },
      { id: "education", title: "Education" },
      { id: "skills", title: "Skills" },
      { id: "style", title: "Style & Formatting" },
      { id: "custom", title: "Custom Sections" },
      { id: "integrations", title: "Import & AI" },
    ],
    [],
  );

  const moveSection = useCallback((dragIndex, hoverIndex) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const draggedSection = newSections[dragIndex];
      newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, draggedSection);
      return newSections;
    });
  }, []);

  // Set the selected template based on the URL parameter
  useEffect(() => {
    setSelectedTemplate(templateParam);
  }, [templateParam, setSelectedTemplate]);

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
  });

  // Update the context data when form values change
  const formValues = form.watch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateResumeData({
        ...formValues,
        styles: resumeStyles,
        customSections,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formValues, resumeStyles, customSections, updateResumeData]);

  const onSubmit = useCallback(
    (values) => {
      updateResumeData({
        ...values,
        styles: resumeStyles,
        customSections,
      });
      router.push(`/preview/${selectedTemplate}`);
    },
    [resumeStyles, customSections, selectedTemplate, router, updateResumeData],
  );

  const addExperience = useCallback(() => {
    const currentExperience = form.getValues("experience");
    form.setValue("experience", [
      ...currentExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }, [form]);

  const removeExperience = useCallback(
    (index) => {
      const currentExperience = form.getValues("experience");
      form.setValue(
        "experience",
        currentExperience.filter((_, i) => i !== index),
      );
    },
    [form],
  );

  const addEducation = useCallback(() => {
    const currentEducation = form.getValues("education");
    form.setValue("education", [
      ...currentEducation,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        graduationDate: "",
      },
    ]);
  }, [form]);

  const removeEducation = useCallback(
    (index) => {
      const currentEducation = form.getValues("education");
      form.setValue(
        "education",
        currentEducation.filter((_, i) => i !== index),
      );
    },
    [form],
  );

  const addSkill = useCallback(() => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", [...currentSkills, { name: "" }]);
  }, [form]);

  const removeSkill = useCallback(
    (index) => {
      const currentSkills = form.getValues("skills");
      form.setValue(
        "skills",
        currentSkills.filter((_, i) => i !== index),
      );
    },
    [form],
  );

  const handleApplySuggestion = useCallback(
    (suggestion) => {
      form.setValue("personalInfo.summary", suggestion);
    },
    [form],
  );

  // Ensure DndProvider and HTML5Backend are only used on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container py-6">
        {/* Rest of your component */}
      </div>
    </DndProvider>
  );
}

// Wrap the ResumeForm component with ResumeProvider
export default function Page() {
  return (
    <ResumeProvider>
      <ResumeForm />
    </ResumeProvider>
  );
}