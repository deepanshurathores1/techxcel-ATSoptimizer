export enum TemplateCategory {
  PROFESSIONAL = "Professional",
  CREATIVE = "Creative",
  SIMPLE = "Simple",
  MODERN = "Modern",
  EXECUTIVE = "Executive",
  TECHNICAL = "Technical",
  SPECIALIZED = "Specialized",
}

export interface TemplateData {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tags: string[]
  image: string
  isNew?: boolean
}

export const allTemplates: TemplateData[] = [
  // Original templates
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and straightforward design that focuses on content",
    category: TemplateCategory.SIMPLE,
    tags: ["Clean", "ATS-Friendly", "Minimalist"],
    image: "/placeholder.svg?height=300&width=400&text=Minimal",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional format with a modern touch",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Business", "Corporate", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Professional",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    category: TemplateCategory.EXECUTIVE,
    tags: ["Leadership", "Management", "Corporate"],
    image: "/placeholder.svg?height=300&width=400&text=Executive",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary layout with subtle design elements",
    category: TemplateCategory.MODERN,
    tags: ["Creative", "Clean", "Stylish"],
    image: "/placeholder.svg?height=300&width=400&text=Modern",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles and skills",
    category: TemplateCategory.TECHNICAL,
    tags: ["IT", "Engineering", "Developer"],
    image: "/placeholder.svg?height=300&width=400&text=Technical",
  },
  {
    id: "clean",
    name: "Clean",
    description: "Simple and elegant design with clear sections",
    category: TemplateCategory.SIMPLE,
    tags: ["Minimalist", "ATS-Friendly", "Professional"],
    image: "/placeholder.svg?height=300&width=400&text=Clean",
  },
  {
    id: "simple",
    name: "Simple",
    description: "No-frills layout that puts content first",
    category: TemplateCategory.SIMPLE,
    tags: ["Basic", "ATS-Friendly", "Clean"],
    image: "/placeholder.svg?height=300&width=400&text=Simple",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Refined design with sophisticated typography",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Stylish", "Professional", "Serif"],
    image: "/placeholder.svg?height=300&width=400&text=Elegant",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Space-efficient layout for comprehensive resumes",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Dense", "Comprehensive", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Compact",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Ultra-clean design with perfect white space balance",
    category: TemplateCategory.SIMPLE,
    tags: ["Minimal", "Clean", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Minimalist",
  },

  // New templates
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional design for corporate environments",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Business", "Corporate", "Traditional"],
    image: "/placeholder.svg?height=300&width=400&text=Corporate",
    isNew: true,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique layout for creative professionals",
    category: TemplateCategory.CREATIVE,
    tags: ["Design", "Artistic", "Unique"],
    image: "/placeholder.svg?height=300&width=400&text=Creative",
    isNew: true,
  },
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Contemporary design for tech industry professionals",
    category: TemplateCategory.TECHNICAL,
    tags: ["IT", "Modern", "Tech"],
    image: "/placeholder.svg?height=300&width=400&text=Tech+Modern",
    isNew: true,
  },
  {
    id: "academic",
    name: "Academic",
    description: "Structured layout for academic and research positions",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Research", "Education", "Detailed"],
    image: "/placeholder.svg?height=300&width=400&text=Academic",
    isNew: true,
  },
  {
    id: "startup",
    name: "Startup",
    description: "Fresh and dynamic design for startup environments",
    category: TemplateCategory.MODERN,
    tags: ["Innovative", "Dynamic", "Contemporary"],
    image: "/placeholder.svg?height=300&width=400&text=Startup",
    isNew: true,
  },
  {
    id: "executive-plus",
    name: "Executive Plus",
    description: "Premium design for C-level executives",
    category: TemplateCategory.EXECUTIVE,
    tags: ["Leadership", "Executive", "Premium"],
    image: "/placeholder.svg?height=300&width=400&text=Executive+Plus",
    isNew: true,
  },
  {
    id: "developer",
    name: "Developer",
    description: "Specialized layout for software developers",
    category: TemplateCategory.TECHNICAL,
    tags: ["Coding", "Programming", "IT"],
    image: "/placeholder.svg?height=300&width=400&text=Developer",
    isNew: true,
  },
  {
    id: "consultant",
    name: "Consultant",
    description: "Professional design for consultants and advisors",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Consulting", "Business", "Advisory"],
    image: "/placeholder.svg?height=300&width=400&text=Consultant",
    isNew: true,
  },
  {
    id: "graduate",
    name: "Graduate",
    description: "Clean design for recent graduates",
    category: TemplateCategory.SIMPLE,
    tags: ["Entry-Level", "Student", "First Job"],
    image: "/placeholder.svg?height=300&width=400&text=Graduate",
    isNew: true,
  },
  {
    id: "chronological",
    name: "Chronological",
    description: "Traditional chronological format, highly ATS-friendly",
    category: TemplateCategory.SIMPLE,
    tags: ["Traditional", "ATS-Optimized", "Timeline"],
    image: "/placeholder.svg?height=300&width=400&text=Chronological",
    isNew: true,
  },
  {
    id: "functional",
    name: "Functional",
    description: "Skills-focused layout for career changers",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Skills-Based", "Career Change", "Versatile"],
    image: "/placeholder.svg?height=300&width=400&text=Functional",
    isNew: true,
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Combines chronological and functional formats",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Combination", "Versatile", "Comprehensive"],
    image: "/placeholder.svg?height=300&width=400&text=Hybrid",
    isNew: true,
  },
  {
    id: "infographic",
    name: "Infographic",
    description: "Visual elements while maintaining ATS compatibility",
    category: TemplateCategory.CREATIVE,
    tags: ["Visual", "Creative", "Graphic"],
    image: "/placeholder.svg?height=300&width=400&text=Infographic",
    isNew: true,
  },
  {
    id: "international",
    name: "International",
    description: "Format suitable for international applications",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Global", "Multilingual", "International"],
    image: "/placeholder.svg?height=300&width=400&text=International",
    isNew: true,
  },
  {
    id: "federal",
    name: "Federal",
    description: "Specialized format for government positions",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Government", "Public Sector", "Detailed"],
    image: "/placeholder.svg?height=300&width=400&text=Federal",
    isNew: true,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Tailored for medical and healthcare professionals",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Medical", "Healthcare", "Clinical"],
    image: "/placeholder.svg?height=300&width=400&text=Healthcare",
    isNew: true,
  },
  {
    id: "legal",
    name: "Legal",
    description: "Professional format for legal professionals",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Law", "Attorney", "Formal"],
    image: "/placeholder.svg?height=300&width=400&text=Legal",
    isNew: true,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Dynamic design for marketing professionals",
    category: TemplateCategory.CREATIVE,
    tags: ["Marketing", "Digital", "Creative"],
    image: "/placeholder.svg?height=300&width=400&text=Marketing",
    isNew: true,
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Technical layout for engineering disciplines",
    category: TemplateCategory.TECHNICAL,
    tags: ["Engineering", "Technical", "Detailed"],
    image: "/placeholder.svg?height=300&width=400&text=Engineering",
    isNew: true,
  },
  {
    id: "finance",
    name: "Finance",
    description: "Professional design for finance industry",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Finance", "Banking", "Corporate"],
    image: "/placeholder.svg?height=300&width=400&text=Finance",
    isNew: true,
  },
  // Additional templates
  {
    id: "data-science",
    name: "Data Science",
    description: "Specialized for data scientists and analysts",
    category: TemplateCategory.TECHNICAL,
    tags: ["Data", "Analytics", "Technical"],
    image: "/placeholder.svg?height=300&width=400&text=Data+Science",
    isNew: true,
  },
  {
    id: "project-manager",
    name: "Project Manager",
    description: "Highlights project management skills and achievements",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Management", "Leadership", "Projects"],
    image: "/placeholder.svg?height=300&width=400&text=Project+Manager",
    isNew: true,
  },
  {
    id: "minimalist-pro",
    name: "Minimalist Pro",
    description: "Professional minimalist design with subtle accents",
    category: TemplateCategory.SIMPLE,
    tags: ["Minimal", "Professional", "Clean"],
    image: "/placeholder.svg?height=300&width=400&text=Minimalist+Pro",
    isNew: true,
  },
  {
    id: "creative-director",
    name: "Creative Director",
    description: "Bold design for creative leadership roles",
    category: TemplateCategory.CREATIVE,
    tags: ["Leadership", "Design", "Creative"],
    image: "/placeholder.svg?height=300&width=400&text=Creative+Director",
    isNew: true,
  },
  {
    id: "ux-designer",
    name: "UX Designer",
    description: "Clean layout highlighting UX/UI skills and projects",
    category: TemplateCategory.CREATIVE,
    tags: ["UX", "Design", "Portfolio"],
    image: "/placeholder.svg?height=300&width=400&text=UX+Designer",
    isNew: true,
  },

  // New additional ATS-friendly templates
  {
    id: "government-affairs",
    name: "Government Affairs",
    description: "Specialized for government relations and policy professionals",
    category: TemplateCategory.SPECIALIZED,
    tags: ["Government", "Policy", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Government+Affairs",
    isNew: true,
  },
  {
    id: "nonprofit",
    name: "Nonprofit",
    description: "Focused on mission-driven work and impact",
    category: TemplateCategory.SPECIALIZED,
    tags: ["Nonprofit", "Social Impact", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Nonprofit",
    isNew: true,
  },
  {
    id: "sales-executive",
    name: "Sales Executive",
    description: "Highlights sales achievements and metrics",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Sales", "Revenue", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Sales+Executive",
    isNew: true,
  },
  {
    id: "remote-professional",
    name: "Remote Professional",
    description: "Optimized for remote work positions",
    category: TemplateCategory.MODERN,
    tags: ["Remote", "Digital", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Remote+Professional",
    isNew: true,
  },
  {
    id: "career-change",
    name: "Career Change",
    description: "Emphasizes transferable skills for career transitions",
    category: TemplateCategory.SPECIALIZED,
    tags: ["Transition", "Skills", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Career+Change",
    isNew: true,
  },
  {
    id: "executive-assistant",
    name: "Executive Assistant",
    description: "Professional layout for administrative professionals",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["Administrative", "Support", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Executive+Assistant",
    isNew: true,
  },
  {
    id: "human-resources",
    name: "Human Resources",
    description: "Specialized for HR professionals at all levels",
    category: TemplateCategory.PROFESSIONAL,
    tags: ["HR", "Recruitment", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Human+Resources",
    isNew: true,
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    description: "Focused on logistics and supply chain achievements",
    category: TemplateCategory.SPECIALIZED,
    tags: ["Logistics", "Operations", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Supply+Chain",
    isNew: true,
  },
  {
    id: "education",
    name: "Education",
    description: "Designed for teachers and education professionals",
    category: TemplateCategory.SPECIALIZED,
    tags: ["Teaching", "Education", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Education",
    isNew: true,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Specialized for security professionals",
    category: TemplateCategory.TECHNICAL,
    tags: ["Security", "Technical", "ATS-Friendly"],
    image: "/placeholder.svg?height=300&width=400&text=Cybersecurity",
    isNew: true,
  },
]

// Group templates by category for easier filtering
export const templatesByCategory = allTemplates.reduce(
  (acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  },
  {} as Record<TemplateCategory, TemplateData[]>,
)

// Function to get template by ID
export function getTemplateById(id: string): TemplateData | undefined {
  return allTemplates.find((template) => template.id === id)
}

