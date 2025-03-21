"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Palette, Type, Layout } from "lucide-react"

interface StyleEditorProps {
  onStyleChange: (styles: ResumeStyles) => void
  styles: ResumeStyles
}

export interface ResumeStyles {
  fontFamily: string
  fontSize: number
  lineHeight: number
  primaryColor: string
  showBorders: boolean
  spacing: number
  sectionOrder: string[]
  hiddenSections: string[]
}

export default function StyleEditor({ onStyleChange, styles }: StyleEditorProps) {
  const [activeTab, setActiveTab] = useState("typography")

  const handleChange = (key: keyof ResumeStyles, value: any) => {
    onStyleChange({
      ...styles,
      [key]: value,
    })
  }

  const toggleSectionVisibility = (section: string) => {
    const hiddenSections = [...styles.hiddenSections]
    const index = hiddenSections.indexOf(section)

    if (index > -1) {
      hiddenSections.splice(index, 1)
    } else {
      hiddenSections.push(section)
    }

    handleChange("hiddenSections", hiddenSections)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Style Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="typography" className="flex items-center gap-1">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-1">
              <Layout className="h-4 w-4" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select value={styles.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                  <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Font Size: {styles.fontSize}px</Label>
              </div>
              <Slider
                value={[styles.fontSize]}
                min={10}
                max={16}
                step={1}
                onValueChange={(value) => handleChange("fontSize", value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Line Height: {styles.lineHeight}</Label>
              </div>
              <Slider
                value={[styles.lineHeight]}
                min={1}
                max={2}
                step={0.1}
                onValueChange={(value) => handleChange("lineHeight", value[0])}
              />
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={styles.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={styles.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Section Spacing: {styles.spacing}px</Label>
              </div>
              <Slider
                value={[styles.spacing]}
                min={10}
                max={40}
                step={2}
                onValueChange={(value) => handleChange("spacing", value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Show Section Borders</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={styles.showBorders}
                  onCheckedChange={(checked) => handleChange("showBorders", checked)}
                />
                <Label>Enabled</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Section Visibility</Label>
              <div className="space-y-2">
                {["summary", "experience", "education", "skills"].map((section) => (
                  <div key={section} className="flex items-center space-x-2">
                    <Switch
                      checked={!styles.hiddenSections.includes(section)}
                      onCheckedChange={() => toggleSectionVisibility(section)}
                    />
                    <Label className="capitalize">{section}</Label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

