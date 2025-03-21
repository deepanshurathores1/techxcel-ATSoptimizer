import type { ResumeData } from "@/types/resume"
import { Rocket, Target, Users, TrendingUp, Lightbulb, Award, Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

interface StartupFounderTemplateProps {
  data: ResumeData
}

export default function StartupFounderTemplate({ data }: StartupFounderTemplateProps) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  // Startup-focused color scheme
  const colors = {
    primary: "#6366F1", // Indigo
    secondary: "#10B981", // Emerald
    accent: "#F59E0B", // Amber
    dark: "#1F2937",
    light: "#F3F4F6",
    background: "#ffffff",
  }

  return (
    <div
      className="font-sans"
      style={{
        color: colors.dark,
        fontFamily: styles?.fontFamily || "Inter, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
      }}
    >
      {/* Modern header with founder focus */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <h2 className="text-xl mb-3" style={{ color: colors.primary }}>
            {personalInfo.title || "Startup Founder & Entrepreneur"}
          </h2>
          <p className="mb-4">{personalInfo.summary || "Your professional summary goes here..."}</p>
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
            <div className="flex items-center gap-1">
              <Globe size={14} />
              <span>yourstartup.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin size={14} />
              <span>linkedin.com/in/yourname</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col justify-center">
          <div
            className="p-4 rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}
          >
            <div className="text-center mb-2">
              <Rocket size={24} className="inline-block" />
              <h3 className="font-bold">Startup Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <div className="text-xl font-bold">$2.5M</div>
                <div className="text-xs opacity-80">Funding Raised</div>
              </div>
              <div>
                <div className="text-xl font-bold">3</div>
                <div className="text-xs opacity-80">Ventures Founded</div>
              </div>
              <div>
                <div className="text-xl font-bold">28</div>
                <div className="text-xs opacity-80">Team Members</div>
              </div>
              <div>
                <div className="text-xl font-bold">215%</div>
                <div className="text-xs opacity-80">YoY Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venture History */}
      <div className="mb-6">
        <h2
          className="text-lg font-bold mb-4 pb-1 border-b-2 flex items-center gap-2"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <Rocket size={18} /> Venture History
        </h2>
        {experience.map((job, index) => (
          <div
            key={index}
            className="mb-5 relative pl-6 border-l-2"
            style={{ borderColor: index === 0 ? colors.secondary : colors.light }}
          >
            <div
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
              style={{ backgroundColor: index === 0 ? colors.secondary : colors.light }}
            ></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{job.company}</h3>
                <h4 className="text-base italic">{job.position}</h4>
              </div>
              <div
                className="text-sm px-2 py-1 rounded"
                style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
              >
                {job.startDate} - {job.endDate}
              </div>
            </div>
            <div className="mt-2 whitespace-pre-line">{job.description}</div>

            {/* Venture-specific metrics */}
            {index === 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="p-2 bg-gray-50 rounded text-center">
                  <div className="text-sm font-medium">Market</div>
                  <div className="text-xs">B2B SaaS</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-center">
                  <div className="text-sm font-medium">Exit</div>
                  <div className="text-xs">Acquisition</div>
                </div>
                <div className="p-2 bg-gray-50 rounded text-center">
                  <div className="text-sm font-medium">Team</div>
                  <div className="text-xs">12 members</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Two column layout for remaining content */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {/* Core Competencies */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Target size={18} /> Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-2 rounded flex items-center gap-2"
                  style={{ backgroundColor: index % 2 === 0 ? `${colors.secondary}10` : `${colors.primary}10` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: index % 2 === 0 ? colors.secondary : colors.primary }}
                  ></div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Users size={18} /> Education & Network
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
              </div>
            ))}

            {/* Network & Affiliations */}
            <div className="mt-4 pt-3 border-t">
              <h3 className="font-medium mb-2">Network & Affiliations</h3>
              <div className="flex flex-wrap gap-2">
                {["YCombinator Alumni", "Techstars", "Founders Network", "Startup Grind"].map((network, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}
                  >
                    {network}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          {/* Entrepreneurial Achievements */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <TrendingUp size={18} /> Entrepreneurial Achievements
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Award size={16} className="mt-1" style={{ color: colors.secondary }} />
                <span>Successfully raised $1.5M seed round for latest venture</span>
              </li>
              <li className="flex items-start gap-2">
                <Award size={16} className="mt-1" style={{ color: colors.secondary }} />
                <span>Grew team from 3 to 28 employees in 18 months</span>
              </li>
              <li className="flex items-start gap-2">
                <Award size={16} className="mt-1" style={{ color: colors.secondary }} />
                <span>Featured in TechCrunch and Forbes 30 Under 30</span>
              </li>
              <li className="flex items-start gap-2">
                <Award size={16} className="mt-1" style={{ color: colors.secondary }} />
                <span>Successful exit: acquisition by [Company] in 2022</span>
              </li>
            </ul>
          </div>

          {/* Innovation & Patents */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Lightbulb size={18} /> Innovation & Patents
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <h3 className="font-bold">Distributed Ledger Authentication System</h3>
                <div className="text-sm">Patent #US12345678 • 2021</div>
                <p className="text-sm mt-1">Novel approach to secure authentication using blockchain technology</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <h3 className="font-bold">AI-Powered Customer Segmentation Algorithm</h3>
                <div className="text-sm">Proprietary Technology • 2020</div>
                <p className="text-sm mt-1">Machine learning system that increased conversion rates by 45%</p>
              </div>
            </div>
          </div>

          {/* Speaking & Thought Leadership */}
          <div>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Speaking & Thought Leadership
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="min-w-[80px] text-sm">SXSW 2023</div>
                <span>"The Future of Fintech: Decentralized Solutions"</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-[80px] text-sm">TechCrunch</div>
                <span>"How We Scaled Our Startup to 100K Users in 6 Months"</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-[80px] text-sm">Web Summit</div>
                <span>"Fundraising Strategies for Early-Stage Founders"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

