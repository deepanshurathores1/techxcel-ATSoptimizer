import type { ResumeData } from "@/types/resume"
import { Palette, Camera, Award, Briefcase, BookOpen, Mail, Phone, MapPin, Globe, Instagram } from "lucide-react"

interface CreativePortfolioTemplateProps {
  data: ResumeData
}

export default function CreativePortfolioTemplate({ data }: CreativePortfolioTemplateProps) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  // Creative-focused color scheme
  const colors = {
    primary: "#EC4899", // Pink
    secondary: "#8B5CF6", // Purple
    accent: "#F59E0B", // Amber
    dark: "#18181B", // Zinc
    light: "#F4F4F5", // Zinc light
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
      {/* Creative header with portfolio focus */}
      <div
        className="p-6 mb-6 rounded-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}80 0%, ${colors.secondary}80 100%)`,
          color: "white",
        }}
      >
        {/* Abstract shapes in background */}
        <div
          className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full opacity-20"
          style={{ backgroundColor: "white" }}
        ></div>
        <div
          className="absolute bottom-[-30px] left-[20%] w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: "white" }}
        ></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <h2 className="text-xl mb-3 opacity-90">{personalInfo.title || "Creative Professional"}</h2>
          <p className="mb-4 max-w-2xl">{personalInfo.summary || "Your professional summary goes here..."}</p>

          <div className="flex flex-wrap gap-4 text-sm">
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
              <span>yourportfolio.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Instagram size={14} />
              <span>@yourcreativework</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase */}
      <div className="mb-6">
        <h2
          className="text-lg font-bold mb-4 pb-1 border-b-2 flex items-center gap-2"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <Palette size={18} /> Portfolio Highlights
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              style={{ backgroundColor: `${colors.primary}90` }}
            >
              <div className="text-white text-center p-2">
                <div className="font-bold">Brand Identity</div>
                <div className="text-xs">Artisan Coffee Co.</div>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              style={{ backgroundColor: `${colors.secondary}90` }}
            >
              <div className="text-white text-center p-2">
                <div className="font-bold">Web Design</div>
                <div className="text-xs">Fashion Boutique</div>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              style={{ backgroundColor: `${colors.accent}90` }}
            >
              <div className="text-white text-center p-2">
                <div className="font-bold">Photography</div>
                <div className="text-xs">Urban Landscapes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two column layout for main content */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {/* Creative Experience */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-4 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Briefcase size={18} /> Creative Experience
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
                    className="text-sm px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
                  >
                    {job.startDate} - {job.endDate}
                  </div>
                </div>
                <div className="mt-2 whitespace-pre-line">{job.description}</div>

                {/* Project highlights for first position */}
                {index === 0 && (
                  <div className="mt-3 flex gap-2">
                    <div
                      className="p-2 rounded-lg flex-1 text-center"
                      style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                    >
                      <div className="font-medium">12</div>
                      <div className="text-xs">Major Projects</div>
                    </div>
                    <div
                      className="p-2 rounded-lg flex-1 text-center"
                      style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}
                    >
                      <div className="font-medium">5</div>
                      <div className="text-xs">Design Awards</div>
                    </div>
                    <div
                      className="p-2 rounded-lg flex-1 text-center"
                      style={{ backgroundColor: `${colors.accent}10`, color: colors.accent }}
                    >
                      <div className="font-medium">8</div>
                      <div className="text-xs">Happy Clients</div>
                    </div>
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
                  <div className="text-sm mt-1">Specialized in Visual Communication and Interactive Design</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          {/* Creative Skills */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Palette size={18} /> Creative Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg flex items-center gap-2"
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? `${colors.primary}15`
                        : index % 3 === 1
                          ? `${colors.secondary}15`
                          : `${colors.accent}15`,
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
            </div>
          </div>

          {/* Software & Tools */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Software & Tools
            </h2>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Adobe Photoshop</span>
                  <span className="text-xs">Expert</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "95%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Adobe Illustrator</span>
                  <span className="text-xs">Expert</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "90%", backgroundColor: colors.primary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Figma</span>
                  <span className="text-xs">Advanced</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "85%", backgroundColor: colors.secondary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Cinema 4D</span>
                  <span className="text-xs">Intermediate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "65%", backgroundColor: colors.secondary }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">After Effects</span>
                  <span className="text-xs">Advanced</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "80%", backgroundColor: colors.secondary }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Award size={18} /> Awards & Recognition
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between">
                  <h3 className="font-bold">Design Excellence Award</h3>
                  <span className="text-sm">2023</span>
                </div>
                <p className="text-sm mt-1">Recognized for outstanding brand identity design for Artisan Coffee Co.</p>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between">
                  <h3 className="font-bold">Creative Portfolio Showcase</h3>
                  <span className="text-sm">2022</span>
                </div>
                <p className="text-sm mt-1">Selected for exhibition at the Annual Design Conference.</p>
              </div>
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between">
                  <h3 className="font-bold">Photography Competition Finalist</h3>
                  <span className="text-sm">2021</span>
                </div>
                <p className="text-sm mt-1">Top 5 finalist in the Urban Landscapes category.</p>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Camera size={18} /> Specializations
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Brand Identity",
                "UI/UX Design",
                "Typography",
                "Illustration",
                "Photography",
                "Motion Graphics",
                "Web Design",
                "Packaging",
                "Editorial Design",
                "Social Media",
              ].map((specialization, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? `${colors.primary}20`
                        : index % 3 === 1
                          ? `${colors.secondary}20`
                          : `${colors.accent}20`,
                    color: index % 3 === 0 ? colors.primary : index % 3 === 1 ? colors.secondary : colors.accent,
                  }}
                >
                  {specialization}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

