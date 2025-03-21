export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
  }
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    fieldOfStudy: string
    graduationDate: string
  }>
  skills: Array<{
    name: string
  }>
  styles?: {
    fontFamily: string
    fontSize: number
    lineHeight: number
    primaryColor: string
    showBorders: boolean
    spacing: number
    sectionOrder: string[]
    hiddenSections: string[]
  }
  customSections?: Array<{
    id: string
    title: string
    content: string
  }>
}

