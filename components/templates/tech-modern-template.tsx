import type { ResumeData } from "@/types/resume"

interface TechModernTemplateProps {
  data: ResumeData
}

export default function TechModernTemplate({ data }: TechModernTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Roboto', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#0ea5e9",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header
        className="p-6 mb-6"
        style={{
          backgroundColor: primaryColor,
          color: "white",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                fontSize: `${fontSize * 2}px`,
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
      </header>

      <div className="px-6">
        {!hiddenSections.includes("summary") && personalInfo.summary && (
          <section
            className="mb-6"
            style={{
              marginBottom: `${spacing}px`,
            }}
          >
            <div
              className="flex items-center mb-3"
              style={{
                color: primaryColor,
              }}
            >
              <div
                className="w-8 h-1 mr-3"
                style={{
                  backgroundColor: primaryColor,
                }}
              ></div>
              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: `${fontSize * 1.5}px`,
                }}
              >
                PROFILE
              </h2>
            </div>
            <p
              className="text-sm"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight,
              }}
            >
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
              <section
                className="mb-6"
                style={{
                  marginBottom: `${spacing}px`,
                }}
              >
                <div
                  className="flex items-center mb-3"
                  style={{
                    color: primaryColor,
                  }}
                >
                  <div
                    className="w-8 h-1 mr-3"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                  <h2
                    className="text-xl font-bold"
                    style={{
                      fontSize: `${fontSize * 1.5}px`,
                    }}
                  >
                    EXPERIENCE
                  </h2>
                </div>
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

            {/* Custom Sections */}
            {customSections.map((section) => (
              <section
                key={section.id}
                className="mb-6"
                style={{
                  marginBottom: `${spacing}px`,
                }}
              >
                <div
                  className="flex items-center mb-3"
                  style={{
                    color: primaryColor,
                  }}
                >
                  <div
                    className="w-8 h-1 mr-3"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                  <h2
                    className="text-xl font-bold"
                    style={{
                      fontSize: `${fontSize * 1.5}px`,
                    }}
                  >
                    {section.title.toUpperCase()}
                  </h2>
                </div>
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

          <div className="md:w-1/3">
            {!hiddenSections.includes("education") && education && education.length > 0 && (
              <section
                className="mb-6"
                style={{
                  marginBottom: `${spacing}px`,
                }}
              >
                <div
                  className="flex items-center mb-3"
                  style={{
                    color: primaryColor,
                  }}
                >
                  <div
                    className="w-8 h-1 mr-3"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                  <h2
                    className="text-xl font-bold"
                    style={{
                      fontSize: `${fontSize * 1.5}px`,
                    }}
                  >
                    EDUCATION
                  </h2>
                </div>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h3
                        className="font-bold"
                        style={{
                          fontSize: `${fontSize * 1.08}px`,
                          color: primaryColor,
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

            {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
              <section>
                <div
                  className="flex items-center mb-3"
                  style={{
                    color: primaryColor,
                  }}
                >
                  <div
                    className="w-8 h-1 mr-3"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                  <h2
                    className="text-xl font-bold"
                    style={{
                      fontSize: `${fontSize * 1.5}px`,
                    }}
                  >
                    SKILLS
                  </h2>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

