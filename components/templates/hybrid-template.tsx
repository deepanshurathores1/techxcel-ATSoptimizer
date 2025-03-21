import type { ResumeData } from "@/types/resume"

interface HybridTemplateProps {
  data: ResumeData
}

export default function HybridTemplate({ data }: HybridTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Segoe UI', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#7c3aed",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div
          className="p-6 rounded-lg mb-6"
          style={{
            backgroundColor: `${primaryColor}10`,
          }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontSize: `${fontSize * 2}px`,
              color: primaryColor,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p
            className="text-xl mb-4"
            style={{
              fontSize: `${fontSize * 1.5}px`,
            }}
          >
            {personalInfo.title || "Professional Title"}
          </p>
          <div
            className="flex flex-wrap gap-4 text-sm"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <span>📧</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <span>📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {!hiddenSections.includes("summary") && personalInfo.summary && (
          <div
            className="mb-6"
            style={{
              marginBottom: `${spacing}px`,
            }}
          >
            <h2
              className="text-lg font-bold mb-3"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
              }}
            >
              Professional Summary
            </h2>
            <p
              className="text-sm"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight,
              }}
            >
              {personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
            <section
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                  paddingBottom: "8px",
                }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3
                        className="font-bold"
                        style={{
                          fontSize: `${fontSize * 1.17}px`,
                          color: primaryColor,
                        }}
                      >
                        {job.position}
                      </h3>
                      <span
                        className="text-sm"
                        style={{
                          fontSize: `${fontSize * 0.9}px`,
                        }}
                      >
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p
                      className="font-medium mb-2"
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {job.company}
                    </p>
                    <p
                      className="text-sm whitespace-pre-line"
                      style={{
                        fontSize: `${fontSize}px`,
                        lineHeight,
                      }}
                    >
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Functional Skills Section */}
          <section
            className="mb-6"
            style={{
              marginBottom: `${spacing}px`,
            }}
          >
            <h2
              className="text-lg font-bold mb-3"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
              }}
            >
              Key Achievements
            </h2>

            <div className="space-y-3">
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                    color: primaryColor,
                  }}
                >
                  Project Management
                </h3>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight,
                  }}
                >
                  Successfully led multiple projects from conception to completion, consistently delivering on time and
                  under budget. Implemented agile methodologies resulting in 30% faster delivery times.
                </p>
              </div>

              <div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                    color: primaryColor,
                  }}
                >
                  Team Leadership
                </h3>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight,
                  }}
                >
                  Managed cross-functional teams of up to 15 members, fostering collaboration and innovation.
                  Implemented mentoring programs that improved team retention by 25%.
                </p>
              </div>
            </div>
          </section>

          {/* Custom Sections */}
          {customSections.map((section) => (
            <section
              key={section.id}
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                  paddingBottom: "8px",
                }}
              >
                {section.title}
              </h2>
              <p
                className="text-sm whitespace-pre-line"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight,
                }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div>
          {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
            <section
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                  paddingBottom: "8px",
                }}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-2 rounded"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {!hiddenSections.includes("education") && education && education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                  paddingBottom: "8px",
                }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${fontSize * 1.08}px`,
                      }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {edu.institution}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        fontSize: `${fontSize * 0.9}px`,
                      }}
                    >
                      {edu.graduationDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

