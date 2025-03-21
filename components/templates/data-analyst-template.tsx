import type { ResumeData } from "@/types/resume"
import {
  BarChart,
  PieChart,
  LineChart,
  Database,
  Code,
  BookOpen,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react"

interface DataAnalystTemplateProps {
  data: ResumeData
}

export default function DataAnalystTemplate({ data }: DataAnalystTemplateProps) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  // Data-focused color scheme
  const colors = {
    primary: "#2563EB", // Blue
    secondary: "#7C3AED", // Violet
    accent: "#10B981", // Emerald
    light: "#EFF6FF", // Light blue
    text: "#1E293B", // Slate
    background: "#ffffff",
  }

  return (
    <div
      className="font-sans"
      style={{
        color: colors.text,
        fontFamily: styles?.fontFamily || "Inter, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
      }}
    >
      {/* Header with data visualization theme */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <h2 className="text-xl mb-3" style={{ color: colors.primary }}>
            {personalInfo.title || "Data Analyst"}
          </h2>
          <p className="mb-4">{personalInfo.summary || "Your professional summary goes here..."}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Github size={14} style={{ color: colors.primary }} />
              <span>github.com/yourusername</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={14} style={{ color: colors.primary }} />
              <span>linkedin.com/in/yourname</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <div
            className="p-4 rounded-lg h-full"
            style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
          >
            <h3 className="font-bold mb-2 text-center" style={{ color: colors.primary }}>
              Technical Proficiency
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Analysis</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "95%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>SQL</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "90%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Python</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "85%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Visualization</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "92%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two column layout for main content */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-7/12">
          {/* Professional Experience */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-4 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <BarChart size={18} /> Professional Experience
            </h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{job.position}</h3>
                    <h4 className="text-base" style={{ color: colors.secondary }}>
                      {job.company}
                    </h4>
                  </div>
                  <div
                    className="text-sm px-2 py-1 rounded"
                    style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                  >
                    {job.startDate} - {job.endDate}
                  </div>
                </div>
                <div className="mt-2 whitespace-pre-line">{job.description}</div>

                {/* Data project highlights for first position */}
                {index === 0 && (
                  <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.light }}>
                    <h4 className="font-medium mb-2">Key Project: Sales Data Analysis</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
                      >
                        Python
                      </div>
                      <div
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
                      >
                        Pandas
                      </div>
                      <div
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
                      >
                        Tableau
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Analyzed 3 years of sales data to identify trends, resulting in 15% revenue increase through
                      targeted strategy adjustments.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <BookOpen size={18} /> Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <span className="text-sm">{edu.graduationDate}</span>
                </div>
                <div>
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
                {index === 0 && (
                  <div className="text-sm mt-1">
                    Relevant coursework: Statistical Analysis, Machine Learning, Database Management
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Award size={18} /> Certifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border">
                <h3 className="font-bold">Google Data Analytics</h3>
                <div className="text-sm">Google • 2023</div>
              </div>
              <div className="p-3 rounded-lg border">
                <h3 className="font-bold">Microsoft Power BI Data Analyst</h3>
                <div className="text-sm">Microsoft • 2022</div>
              </div>
              <div className="p-3 rounded-lg border">
                <h3 className="font-bold">SQL Advanced Certification</h3>
                <div className="text-sm">DataCamp • 2022</div>
              </div>
              <div className="p-3 rounded-lg border">
                <h3 className="font-bold">Python for Data Science</h3>
                <div className="text-sm">Coursera • 2021</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-5/12">
          {/* Technical Skills */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Database size={18} /> Technical Skills
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Data Analysis Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "R", "Excel", "SPSS", "SAS", "MATLAB"].map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-sm"
                      style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Database Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["SQL", "MySQL", "PostgreSQL", "MongoDB", "BigQuery", "Redshift"].map((db, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-sm"
                      style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
                    >
                      {db}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Visualization Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {["Tableau", "Power BI", "Looker", "D3.js", "Matplotlib", "Seaborn"].map((viz, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-sm"
                      style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                    >
                      {viz}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Data Science Skills */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <LineChart size={18} /> Data Science Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded"
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? `${colors.primary}10`
                        : index % 3 === 1
                          ? `${colors.secondary}10`
                          : `${colors.accent}10`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : colors.accent,
                    }}
                  ></div>
                  <span>{skill.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${colors.primary}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span>Statistical Analysis</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${colors.secondary}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                <span>Machine Learning</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${colors.accent}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                <span>Data Cleaning</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${colors.primary}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span>ETL Processes</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Code size={18} /> Data Projects
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between">
                  <h3 className="font-bold">Customer Segmentation Analysis</h3>
                  <div
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}
                  >
                    Python
                  </div>
                </div>
                <p className="text-sm mt-1">
                  Used K-means clustering to segment customers based on purchasing behavior, increasing marketing ROI by
                  25%.
                </p>
                <div className="mt-2 text-xs">
                  <a href="#" style={{ color: colors.primary }}>
                    github.com/yourname/customer-segmentation
                  </a>
                </div>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between">
                  <h3 className="font-bold">Sales Forecasting Model</h3>
                  <div
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
                  >
                    R
                  </div>
                </div>
                <p className="text-sm mt-1">
                  Developed time series forecasting model with 92% accuracy for predicting quarterly sales.
                </p>
                <div className="mt-2 text-xs">
                  <a href="#" style={{ color: colors.primary }}>
                    github.com/yourname/sales-forecast
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Data Visualization Sample */}
          <div>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <PieChart size={18} /> Data Visualization
            </h2>
            <div
              className="p-3 rounded-lg text-center"
              style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
            >
              <div className="text-sm mb-2">Sample visualization of customer demographics analysis</div>
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full border-8 relative" style={{ borderColor: colors.primary }}>
                  <div
                    className="absolute top-0 left-0 w-1/2 h-full rounded-l-full"
                    style={{ backgroundColor: colors.secondary, transform: "rotate(0deg)" }}
                  ></div>
                  <div
                    className="absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full"
                    style={{ backgroundColor: colors.accent, transform: "rotate(0deg)" }}
                  ></div>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                  <span>Age 18-34 (40%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                  <span>Age 35-50 (35%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                  <span>Age 51+ (25%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

