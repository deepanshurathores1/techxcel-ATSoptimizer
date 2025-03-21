import type { ResumeData } from "@/types/resume"
import { BarChart, Briefcase, Award, BookOpen, Zap, Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

interface DigitalMarketingTemplateProps {
  data: ResumeData
}

export default function DigitalMarketingTemplate({ data }: DigitalMarketingTemplateProps) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  // Marketing-specific color scheme
  const colors = {
    primary: "#FF5A5F",
    secondary: "#00A699",
    accent: "#FC642D",
    text: "#484848",
    light: "#767676",
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
      {/* Header with marketing-style banner */}
      <div
        className="p-6 mb-6 rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
          color: "white",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
            <h2 className="text-xl mb-3">{personalInfo.title || "Digital Marketing Specialist"}</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={14} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Globe size={14} />
              <span>yourportfolio.com</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Linkedin size={14} />
              <span>linkedin.com/in/yourname</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Metrics Dashboard */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
          <BarChart size={18} /> Marketing Impact Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-lg border text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
              250%
            </div>
            <div className="text-sm text-gray-600">ROI Increase</div>
          </div>
          <div className="p-3 bg-white rounded-lg border text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
              45K+
            </div>
            <div className="text-sm text-gray-600">Social Followers</div>
          </div>
          <div className="p-3 bg-white rounded-lg border text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
              3.2M
            </div>
            <div className="text-sm text-gray-600">Campaign Reach</div>
          </div>
          <div className="p-3 bg-white rounded-lg border text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
              18%
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>

      {/* Two column layout for main content */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: colors.primary }}>
              Professional Summary
            </h2>
            <p>{personalInfo.summary || "Your professional summary goes here..."}</p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <Briefcase size={18} /> Experience
            </h2>
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{job.position}</h3>
                    <h4 className="text-base" style={{ color: colors.secondary }}>
                      {job.company}
                    </h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </div>
                </div>
                <div className="mt-2 whitespace-pre-line">{job.description}</div>
              </div>
            ))}
          </div>

          {/* Campaign Highlights */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <Award size={18} /> Campaign Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <h3 className="font-bold" style={{ color: colors.secondary }}>
                  Social Media Rebranding
                </h3>
                <p className="text-sm">
                  Increased engagement by 78% through strategic content calendar and audience targeting
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <h3 className="font-bold" style={{ color: colors.secondary }}>
                  Email Marketing Automation
                </h3>
                <p className="text-sm">Designed drip campaign resulting in 32% higher open rates and 24% CTR</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          {/* Skills with visual indicators */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <Zap size={18} /> Marketing Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-500">
                      {index % 3 === 0 ? "Expert" : index % 3 === 1 ? "Advanced" : "Intermediate"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: index % 3 === 0 ? "95%" : index % 3 === 1 ? "80%" : "65%",
                        backgroundColor: colors.secondary,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <BookOpen size={18} /> Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold">{edu.degree}</h3>
                <div style={{ color: colors.secondary }}>{edu.institution}</div>
                <div className="text-sm text-gray-600">
                  {edu.fieldOfStudy} • {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: colors.primary }}>
              Certifications
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Google Analytics Certification</li>
              <li>HubSpot Inbound Marketing</li>
              <li>Facebook Blueprint</li>
              <li>SEMrush SEO Fundamentals</li>
            </ul>
          </div>

          {/* Tools */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b" style={{ color: colors.primary }}>
              Marketing Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Google Analytics",
                "HubSpot",
                "Mailchimp",
                "SEMrush",
                "Ahrefs",
                "Canva",
                "Adobe Creative Suite",
                "Hootsuite",
              ].map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${colors.secondary}20`, color: colors.secondary }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

