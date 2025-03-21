"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CustomSection {
  id: string
  title: string
  content: string
}

interface CustomSectionEditorProps {
  customSections: CustomSection[]
  onUpdate: (sections: CustomSection[]) => void
}

export default function CustomSectionEditor({ customSections, onUpdate }: CustomSectionEditorProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState<CustomSection>({ id: "", title: "", content: "" })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddSection = () => {
    setCurrentSection({ id: Date.now().toString(), title: "", content: "" })
    setIsEditing(false)
    setDialogOpen(true)
  }

  const handleEditSection = (section: CustomSection) => {
    setCurrentSection({ ...section })
    setIsEditing(true)
    setDialogOpen(true)
  }

  const handleDeleteSection = (id: string) => {
    onUpdate(customSections.filter((section) => section.id !== id))
  }

  const handleSaveSection = () => {
    if (!currentSection.title.trim()) return

    if (isEditing) {
      onUpdate(customSections.map((section) => (section.id === currentSection.id ? currentSection : section)))
    } else {
      onUpdate([...customSections, currentSection])
    }

    setDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Custom Sections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {customSections.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No custom sections added yet</div>
        ) : (
          <div className="space-y-2">
            {customSections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="font-medium">{section.title}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditSection(section)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(section.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleAddSection}>
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Section
        </Button>
      </CardFooter>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Section" : "Add New Section"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={currentSection.title}
                onChange={(e) => setCurrentSection({ ...currentSection, title: e.target.value })}
                placeholder="e.g., Certifications, Projects, Languages"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-content">Content</Label>
              <Textarea
                id="section-content"
                value={currentSection.content}
                onChange={(e) => setCurrentSection({ ...currentSection, content: e.target.value })}
                placeholder="Enter section content here..."
                rows={5}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSection}>Save Section</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

