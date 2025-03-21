"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Save,
  Plus,
  Trash2,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Trophy,
  BookOpen,
  Linkedin,
  Github,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/context/resume-context";
import { VerificationDashboard } from "@/components/verification/VerificationDashboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { resumeData, updateResumeData } = useResume();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(resumeData);
  const [importSource, setImportSource] = useState<"linkedin" | "github" | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const [theme, setTheme] = useState("light"); // Track theme (e.g., dark mode)

  // Set active tab from URL if provided
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Set isClient to true after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync theme with localStorage
  useEffect(() => {
    if (isClient) {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    }
  }, [isClient]);

  // Apply theme to <html> and <body>
  useEffect(() => {
    if (isClient) {
      document.documentElement.className = theme;
      document.documentElement.style.colorScheme = theme;
    }
  }, [theme, isClient]);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setProfileData(data.data);
            updateResumeData(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [updateResumeData]);

  // Handle saving profile data
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast({ title: "Profile Saved", description: "Your profile has been successfully saved." });
        } else {
          toast({ title: "Error", description: "Failed to save profile.", variant: "destructive" });
        }
      } else {
        toast({ title: "Error", description: "Failed to save profile.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({ title: "Error", description: "Failed to save profile.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle changes to personal info fields
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  // Handle adding a new experience entry
  const handleAddExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: `exp-${(prev.experience?.length || 0) + 1}`, // Generate a unique ID
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  // Handle changes to experience fields
  const handleExperienceChange = (index: number, field: string, value: string) => {
    setProfileData((prev) => {
      const updatedExperience = [...(prev.experience || [])];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  // Handle removing an experience entry
  const handleRemoveExperience = (index: number) => {
    setProfileData((prev) => {
      const updatedExperience = [...(prev.experience || [])];
      updatedExperience.splice(index, 1);
      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  // Handle adding a new project entry
  const handleAddProject = () => {
    setProfileData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: `proj-${(prev.projects?.length || 0) + 1}`, // Generate a unique ID
          name: "",
          description: "",
          url: "",
          technologies: [],
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  // Handle changes to project fields
  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    setProfileData((prev) => {
      const updatedProjects = [...(prev.projects || [])];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  // Handle removing a project entry
  const handleRemoveProject = (index: number) => {
    setProfileData((prev) => {
      const updatedProjects = [...(prev.projects || [])];
      updatedProjects.splice(index, 1);
      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  // Handle LinkedIn data import
  const handleLinkedInImport = async () => {
    if (!isClient) return; // Ensure this runs only on the client

    try {
      setImportSource("linkedin");
      setImportProgress(0);

      const progressInterval = setInterval(() => {
        setImportProgress((prev) => (prev >= 95 ? 95 : prev + 5));
      }, 150);

      const response = await fetch("/api/import/linkedin/auth", { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        if (data.authUrl) {
          const authWindow = window.open(data.authUrl, "linkedin-auth", "width=600,height=700");

          window.addEventListener("message", async (event) => {
            if (event.data.type === "linkedin-auth-success") {
              const dataResponse = await fetch("/api/import/linkedin/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: event.data.code }),
              });

              if (dataResponse.ok) {
                const linkedInData = await dataResponse.json();
                const updatedProfileData = {
                  ...profileData,
                  personalInfo: {
                    ...profileData.personalInfo,
                    fullName: linkedInData.fullName || profileData.personalInfo?.fullName,
                    title: linkedInData.headline || profileData.personalInfo?.title,
                    summary: linkedInData.summary || profileData.personalInfo?.summary,
                    location: linkedInData.location || profileData.personalInfo?.location,
                  },
                  experience: linkedInData.positions?.map((position: any) => ({
                    id: `exp-${profileData.experience.length + 1}`, // Predictable ID
                    company: position.companyName,
                    position: position.title,
                    location: position.location,
                    startDate: position.startDate,
                    endDate: position.endDate || "Present",
                    description: position.description,
                  })),
                  education: linkedInData.education?.map((edu: any) => ({
                    id: `edu-${profileData.education.length + 1}`, // Predictable ID
                    institution: edu.schoolName,
                    degree: edu.degree,
                    fieldOfStudy: edu.fieldOfStudy,
                    startDate: edu.startDate,
                    graduationDate: edu.endDate,
                  })),
                  skills: linkedInData.skills?.map((skill: any) => ({
                    id: `skill-${profileData.skills.length + 1}`, // Predictable ID
                    name: skill.name,
                    level: "intermediate",
                  })),
                  certifications: linkedInData.certifications?.map((cert: any) => ({
                    id: `cert-${profileData.certifications.length + 1}`, // Predictable ID
                    name: cert.name,
                    issuer: cert.authority,
                    issueDate: cert.issueDate,
                    credentialId: cert.licenseNumber,
                    credentialUrl: cert.url,
                  })),
                };

                setProfileData(updatedProfileData);
                setImportProgress(100);
                toast({ title: "LinkedIn Import Successful", description: "Your LinkedIn data has been imported." });
              }
            }
          });
        }
      }

      clearInterval(progressInterval);
    } catch (error) {
      console.error("Error importing LinkedIn data:", error);
      toast({ title: "Import Failed", description: "Failed to import LinkedIn data.", variant: "destructive" });
    } finally {
      setTimeout(() => {
        setImportSource(null);
        setImportProgress(0);
      }, 1000);
    }
  };

  // Handle GitHub data import
  const handleGitHubImport = async () => {
    if (!isClient) return; // Ensure this runs only on the client

    try {
      setImportSource("github");
      setImportProgress(0);

      const progressInterval = setInterval(() => {
        setImportProgress((prev) => (prev >= 95 ? 95 : prev + 5));
      }, 150);

      const response = await fetch("/api/import/github/auth", { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        if (data.authUrl) {
          const authWindow = window.open(data.authUrl, "github-auth", "width=600,height=700");

          window.addEventListener("message", async (event) => {
            if (event.data.type === "github-auth-success") {
              const dataResponse = await fetch("/api/import/github/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: event.data.code }),
              });

              if (dataResponse.ok) {
                const githubData = await dataResponse.json();
                const projects = githubData.repos?.map((repo: any) => ({
                  id: `proj-${profileData.projects.length + 1}`, // Predictable ID
                  name: repo.name,
                  description: repo.description,
                  url: repo.html_url,
                  technologies: repo.topics || [],
                  startDate: new Date(repo.created_at).toISOString().split("T")[0],
                  endDate: repo.updated_at ? new Date(repo.updated_at).toISOString().split("T")[0] : "Present",
                }));

                setProfileData((prev) => ({
                  ...prev,
                  projects: [...(prev.projects || []), ...projects],
                  personalInfo: {
                    ...prev.personalInfo,
                    github: githubData.profile?.html_url || prev.personalInfo?.github,
                  },
                }));

                setImportProgress(100);
                toast({ title: "GitHub Import Successful", description: "Your GitHub projects have been imported." });
              }
            }
          });
        }
      }

      clearInterval(progressInterval);
    } catch (error) {
      console.error("Error importing GitHub data:", error);
      toast({ title: "Import Failed", description: "Failed to import GitHub data.", variant: "destructive" });
    } finally {
      setTimeout(() => {
        setImportSource(null);
        setImportProgress(0);
      }, 1000);
    }
  };

  // Render the component
  return (
    <div className={`min-h-screen bg-background text-foreground antialiased overflow-x-hidden ${theme === "dark" ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">ResumeBuilder</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/form")}>
              Create Resume
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{profileData.personalInfo?.fullName || "My Profile"}</h1>
              <p className="text-muted-foreground">
                {profileData.personalInfo?.title || "Complete your profile to create better resumes"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Import from LinkedIn
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from LinkedIn</DialogTitle>
                  <DialogDescription>
                    This will import your profile data, work experience, education, and skills from LinkedIn.
                  </DialogDescription>
                </DialogHeader>
                {importSource === "linkedin" && (
                  <div className="py-4">
                    <Progress value={importProgress} className="mb-2" />
                    <p className="text-center text-sm text-muted-foreground">
                      {importProgress < 100 ? "Importing data from LinkedIn..." : "Import complete!"}
                    </p>
                  </div>
                )}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    You will be redirected to LinkedIn to authorize access to your profile data.
                  </AlertDescription>
                </Alert>
                <DialogFooter>
                  <Button onClick={handleLinkedInImport} disabled={importSource === "linkedin"}>
                    {importSource === "linkedin" ? "Importing..." : "Continue with LinkedIn"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Import from GitHub
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from GitHub</DialogTitle>
                  <DialogDescription>
                    This will import your repositories as projects and add them to your profile.
                  </DialogDescription>
                </DialogHeader>
                {importSource === "github" && (
                  <div className="py-4">
                    <Progress value={importProgress} className="mb-2" />
                    <p className="text-center text-sm text-muted-foreground">
                      {importProgress < 100 ? "Importing projects from GitHub..." : "Import complete!"}
                    </p>
                  </div>
                )}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    You will be redirected to GitHub to authorize access to your repositories.
                  </AlertDescription>
                </Alert>
                <DialogFooter>
                  <Button onClick={handleGitHubImport} disabled={importSource === "github"}>
                    {importSource === "github" ? "Importing..." : "Continue with GitHub"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button onClick={handleSaveProfile} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">
                <Briefcase className="mr-2 h-4 w-4 hidden md:inline" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education">
                <GraduationCap className="mr-2 h-4 w-4 hidden md:inline" />
                Education
              </TabsTrigger>
              <TabsTrigger value="skills">
                <Code className="mr-2 h-4 w-4 hidden md:inline" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="certifications">
                <Award className="mr-2 h-4 w-4 hidden md:inline" />
                Certifications
              </TabsTrigger>
              <TabsTrigger value="projects">
                <BookOpen className="mr-2 h-4 w-4 hidden md:inline" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="languages">
                <Languages className="mr-2 h-4 w-4 hidden md:inline" />
                Languages
              </TabsTrigger>
              <TabsTrigger value="verification">
                <Trophy className="mr-2 h-4 w-4 hidden md:inline" />
                Verification
              </TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details that will be used in your resumes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profileData.personalInfo?.fullName || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={profileData.personalInfo?.title || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.personalInfo?.email || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.personalInfo?.phone || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.personalInfo?.location || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profileData.personalInfo?.website || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={profileData.personalInfo?.github || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={profileData.personalInfo?.linkedin || ""}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      name="summary"
                      rows={5}
                      value={profileData.personalInfo?.summary || ""}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>
                      Add your work experience, including internships and volunteer work.
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileData.experience?.map((exp, index) => (
                    <div key={exp.id || index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Experience {index + 1}</h3>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveExperience(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input
                            id={`company-${index}`}
                            value={exp.company || ""}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`}>Position</Label>
                          <Input
                            id={`position-${index}`}
                            value={exp.position || ""}
                            onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`location-${index}`}>Location</Label>
                          <Input
                            id={`location-${index}`}
                            value={exp.location || ""}
                            onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`startDate-${index}`}
                            type="date"
                            value={exp.startDate || ""}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date</Label>
                          <Input
                            id={`endDate-${index}`}
                            type="date"
                            value={exp.endDate || ""}
                            onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          rows={3}
                          value={exp.description || ""}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                      Add your projects, including personal, academic, and professional work.
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleGitHubImport}>
                      <Github className="mr-2 h-4 w-4" />
                      Import from GitHub
                    </Button>
                    <Button onClick={handleAddProject}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profileData.projects?.map((project, index) => (
                    <div key={project.id || index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{project.name || `Project ${index + 1}`}</h3>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveProject(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                          <Input
                            id={`project-name-${index}`}
                            value={project.name || ""}
                            onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-url-${index}`}>Project URL</Label>
                          <Input
                            id={`project-url-${index}`}
                            value={project.url || ""}
                            onChange={(e) => handleProjectChange(index, "url", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`project-startDate-${index}`}
                            type="date"
                            value={project.startDate || ""}
                            onChange={(e) => handleProjectChange(index, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-endDate-${index}`}>End Date</Label>
                          <Input
                            id={`project-endDate-${index}`}
                            type="date"
                            value={project.endDate || ""}
                            onChange={(e) => handleProjectChange(index, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-description-${index}`}>Description</Label>
                        <Textarea
                          id={`project-description-${index}`}
                          rows={3}
                          value={project.description || ""}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-technologies-${index}`}>Technologies (comma separated)</Label>
                        <Input
                          id={`project-technologies-${index}`}
                          value={Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                          onChange={(e) =>
                            handleProjectChange(
                              index,
                              "technologies",
                              e.target.value.split(",").map((tech) => tech.trim()),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification">
              <VerificationDashboard />
            </TabsContent>

            {/* Other tabs remain the same */}
          </Tabs>
        </div>
      </main>
    </div>
  );
}