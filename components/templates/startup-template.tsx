import type { ResumeData } from "@/types/resume"

interface StartupTemplateProps {
  data: ResumeData
}

export default function StartupTemplate({ data }: StartupTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Inter', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#6366f1",
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
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
                className="text-xl"
                style={{
                  fontSize: `${fontSize * 1.5}px`,
                }}
              >
                {personalInfo.title || "Professional Title"}
              </p>
            </div>
            <div
              className="mt-4 md:mt-0 text-right"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
        </div>

        {!hiddenSections.includes("summary") && personalInfo.summary && (
          <div
            className="mb-6"
            style={{
              marginBottom: `${spacing}px`,
            }}
          >
            <p
              className="text-lg font-medium text-center"
              style={{
                fontSize: `${fontSize * 1.25}px`,
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
                className="text-lg font-bold mb-4 pb-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="font-bold"
                          style={{
                            fontSize: `${fontSize * 1.17}px`,
                            color: primaryColor,
                          }}
                        >
                          {job.position}
                        </h3>
                        <p
                          className="font-medium"
                          style={{
                            fontSize: `${fontSize}px`,
                          }}
                        >
                          {job.company}
                        </p>
                      </div>
                      <span
                        className="text-sm bg-gray-100 px-2 py-1 rounded"
                        style={{
                          fontSize: `${fontSize * 0.9}px`,
                        }}
                      >
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p
                      className="text-sm whitespace-pre-line mt-2"
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
                className="text-lg font-bold mb-4 pb-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
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
                className="text-lg font-bold mb-4 pb-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {!hiddenSections.includes("education") && education && education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold mb-4 pb-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                  borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${fontSize * 1.08}px`,
                      }}
                    >
                      {edu.institution}
                    </h3>
                    <p
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
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

