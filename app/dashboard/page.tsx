"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, FileText, Download, Edit, Eye, Search } from "lucide-react"
import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { allTemplates, TemplateCategory } from "@/data/templates"
import Nav2 from "@/components/marketing/Nav2"
import Footer from "@/components/marketing/Footer" // Assuming you have a Footer component

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("templates")
  const { setSelectedTemplate } = useResume()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    router.push(`/form?template=${templateId}`)
  }

  const filteredTemplates = allTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Nav2 />
      <main className="flex-1 container py-12">
        <Tabs defaultValue="templates" className="space-y-4" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
            </TabsList>
            {activeTab === "templates" && <Button onClick={() => router.push("/form")}>Create New Resume</Button>}
          </div>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value={TemplateCategory.PROFESSIONAL}>Professional</SelectItem>
                    <SelectItem value={TemplateCategory.CREATIVE}>Creative</SelectItem>
                    <SelectItem value={TemplateCategory.SIMPLE}>Simple</SelectItem>
                    <SelectItem value={TemplateCategory.MODERN}>Modern</SelectItem>
                    <SelectItem value={TemplateCategory.EXECUTIVE}>Executive</SelectItem>
                    <SelectItem value={TemplateCategory.TECHNICAL}>Technical</SelectItem>
                    <SelectItem value={TemplateCategory.SPECIALIZED}>Specialized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 template-grid">
                {filteredTemplates.map((template, index) => (
                  <Card
                    key={template.id}
                    className="overflow-hidden flex flex-col template-card hover:shadow-xl transition-all duration-300 ease-in-out group hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Image Container with Margins */}
                    <div className="relative bg-muted p-4" style={{ aspectRatio: "1/1.414" }}>
                      <img
                        src={template.image || "/placeholder.svg?height=300&width=212"}
                        alt={template.name}
                        className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant={template.isNew ? "default" : "outline"}>
                          {template.isNew ? "New" : template.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {template.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    {/* Card Footer with Buttons */}
                    <CardFooter className="flex justify-between mt-auto">
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/preview/${template.id}`)}
                        className="transition-all hover:shadow-md hover:bg-muted/50"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleSelectTemplate(template.id)}
                        className="transition-all hover:shadow-md hover:bg-primary/90"
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-resumes">
            <div className="space-y-4">
              <Card className="transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>Software Developer Resume</CardTitle>
                  <CardDescription>Last edited: 2 days ago</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="transition-all hover:shadow-sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="transition-all hover:shadow-sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Template: Minimal</div>
                </CardFooter>
              </Card>

              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Create your first resume to see it here</p>
                <Button onClick={() => router.push("/form")} className="transition-all hover:scale-105 hover:shadow-md">
                  Create New Resume
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer /> {/* Footer added at the bottom */}
    </div>
  )
}