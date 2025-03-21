"use client"; // Ensure this component is rendered on the client side

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, FileText, Filter, Tag } from "lucide-react";
import { useResume } from "@/context/resume-context";
import DownloadOptions from "@/components/DownloadOptions";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { allTemplates, getTemplateById, TemplateCategory } from "@/data/templates";
import { useRef, useState, useEffect, useMemo, useCallback, use } from "react"; // Import `use` from React

// Dynamically import all templates to reduce initial load time
const templates = {
  minimal: dynamic(() => import("@/components/templates/minimal-template")),
  professional: dynamic(() => import("@/components/templates/professional-template")),
  executive: dynamic(() => import("@/components/templates/executive-template")),
  modern: dynamic(() => import("@/components/templates/modern-template")),
  technical: dynamic(() => import("@/components/templates/technical-template")),
  clean: dynamic(() => import("@/components/templates/clean-template")),
  simple: dynamic(() => import("@/components/templates/simple-template")),
  elegant: dynamic(() => import("@/components/templates/elegant-template")),
  compact: dynamic(() => import("@/components/templates/compact-template")),
  minimalist: dynamic(() => import("@/components/templates/minimalist-template")),
  corporate: dynamic(() => import("@/components/templates/corporate-template")),
  creative: dynamic(() => import("@/components/templates/creative-template")),
  techModern: dynamic(() => import("@/components/templates/tech-modern-template")),
  academic: dynamic(() => import("@/components/templates/academic-template")),
  startup: dynamic(() => import("@/components/templates/startup-template")),
  executivePlus: dynamic(() => import("@/components/templates/executive-plus-template")),
  developer: dynamic(() => import("@/components/templates/developer-template")),
  consultant: dynamic(() => import("@/components/templates/consultant-template")),
  graduate: dynamic(() => import("@/components/templates/graduate-template")),
  chronological: dynamic(() => import("@/components/templates/chronological-template")),
  functional: dynamic(() => import("@/components/templates/functional-template")),
  hybrid: dynamic(() => import("@/components/templates/hybrid-template")),
  infographic: dynamic(() => import("@/components/templates/infographic-template")),
  international: dynamic(() => import("@/components/templates/international-template")),
  federal: dynamic(() => import("@/components/templates/federal-template")),
  healthcare: dynamic(() => import("@/components/templates/healthcare-template")),
  legal: dynamic(() => import("@/components/templates/legal-template")),
  marketing: dynamic(() => import("@/components/templates/marketing-template")),
  engineering: dynamic(() => import("@/components/templates/engineering-template")),
  finance: dynamic(() => import("@/components/templates/finance-template")),
  dataScience: dynamic(() => import("@/components/templates/data-science-template")),
  projectManager: dynamic(() => import("@/components/templates/project-manager-template")),
  minimalistPro: dynamic(() => import("@/components/templates/minimalist-pro-template")),
  creativeDirector: dynamic(() => import("@/components/templates/creative-director-template")),
  uxDesigner: dynamic(() => import("@/components/templates/ux-designer-template")),
};

// Default placeholder data for preview
const placeholderData = {
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
};

export default function PreviewPage({ params }: { params: { templateId: string } }) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap `params` using `React.use()`
  const { templateId } = resolvedParams; // Destructure `templateId` from resolved `params`
  const resumeRef = useRef<HTMLDivElement>(null);
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [previewData, setPreviewData] = useState(placeholderData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Update preview data and selected template
  useEffect(() => {
    if (templateId !== selectedTemplate) {
      setSelectedTemplate(templateId);
    }

    if (resumeData.personalInfo?.fullName) {
      setPreviewData(resumeData);
    } else {
      setPreviewData({
        ...placeholderData,
        styles: resumeData.styles || placeholderData.styles,
      });
    }
  }, [templateId, selectedTemplate, setSelectedTemplate, resumeData]);

  // Load the selected template dynamically
  const [Template, setTemplate] = useState<React.ComponentType<{ data: any }> | null>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const templateModule = await templates[selectedTemplate]();
        if (!templateModule || !templateModule.default) {
          throw new Error(`Template "${selectedTemplate}" not found or does not have a default export.`);
        }
        setTemplate(() => templateModule.default);
        setTemplateError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error loading template:", error);
        setTemplateError(`Failed to load template: ${selectedTemplate}. Error: ${error.message}`);
        setTemplate(null); // Reset the template
      }
    };
    loadTemplate();
  }, [selectedTemplate]);

  const TemplateComponent = useMemo(() => {
    if (templateError) {
      return (
        <div className="text-red-500">
          <p>{templateError}</p>
          <p>Loading default template...</p>
          {/* Render the minimal template with a warning */}
          <div className="border border-red-500 p-4">
            <templates.minimal data={previewData} />
          </div>
        </div>
      );
    }
    if (!Template) {
      return <div>Loading template...</div>; // Fallback while loading
    }
    return <Template data={previewData} />;
  }, [Template, previewData, templateError]);

  // Filter templates based on search, category, and tags
  const matchesSearch = useCallback(
    (template: typeof allTemplates[number]) => {
      return (
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    [searchQuery]
  );

  const matchesCategory = useCallback(
    (template: typeof allTemplates[number]) => {
      return activeCategory === "all" || template.category === activeCategory;
    },
    [activeCategory]
  );

  const matchesTags = useCallback(
    (template: typeof allTemplates[number]) => {
      return activeTags.length === 0 || activeTags.some((tag) => template.tags.includes(tag));
    },
    [activeTags]
  );

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((template) => matchesSearch(template) && matchesCategory(template) && matchesTags(template));
  }, [matchesSearch, matchesCategory, matchesTags]);

  // Get all unique tags from templates
  const allTags = useMemo(() => {
    return Array.from(new Set(allTemplates.flatMap((template) => template.tags))).sort();
  }, []);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  // Get current template details
  const currentTemplate = getTemplateById(selectedTemplate);

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Resume Preview</h1>
        {currentTemplate && (
          <div className="ml-4 flex gap-2">
            <Badge variant="outline">{currentTemplate.category}</Badge>
            {currentTemplate.isNew && <Badge>New</Badge>}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 space-y-4">
          <Card className="p-4 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h2 className="font-semibold">Template Selection</h2>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <h3 className="text-sm font-medium">Categories</h3>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    variant={activeCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory("all")}
                    className="justify-start text-xs h-8"
                  >
                    All
                  </Button>
                  {Object.values(TemplateCategory).map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className="justify-start text-xs h-8"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <h3 className="text-sm font-medium">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {allTags.slice(0, 12).map((tag) => (
                    <Badge
                      key={tag}
                      variant={activeTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <ScrollArea className="h-[calc(100vh-400px)] pr-3">
              <div className="space-y-1">
                {filteredTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      router.replace(`/preview/${template.id}`);
                    }}
                  >
                    <span className="truncate">{template.name}</span>
                    {template.isNew && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        New
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="mt-6">
              <DownloadOptions resumeRef={resumeRef} />
            </div>
          </Card>
        </div>

        <div className="lg:w-3/4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              ref={resumeRef}
              className="p-6 mx-auto bg-white shadow-sm border border-gray-200 print:shadow-none print:border-none"
              style={{
                minHeight: "1056px", // US Letter height at 96 DPI
                width: "816px", // US Letter width at 96 DPI
                maxWidth: "100%",
                boxSizing: "border-box",
                pageBreakAfter: "always",
                pageBreakInside: "avoid",
              }}
            >
              {TemplateComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}