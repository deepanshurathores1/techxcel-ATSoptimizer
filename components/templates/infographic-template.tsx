import type { ResumeData } from "@/types/resume"

interface InfographicTemplateProps {
  data: ResumeData
}

export default function InfographicTemplate({ data }: InfographicTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Poppins', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#ec4899",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  // Generate a lighter shade of the primary color
  const lighterColor = `${primaryColor}20`

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div
          className="p-6 rounded-lg mb-6 relative overflow-hidden"
          style={{
            backgroundColor: primaryColor,
            color: "white",
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{
              backgroundColor: "white",
              transform: "translate(30%, -30%)",
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-20"
            style={{
              backgroundColor: "white",
              transform: "translate(-30%, 30%)",
            }}
          ></div>

          <div className="relative z-10">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                fontSize: `${fontSize * 2}px`,
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
                  <span>✉</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <span>☎</span>
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
        </div>

        {!hiddenSections.includes("summary") && personalInfo.summary && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{
              backgroundColor: lighterColor,
              marginBottom: `${spacing}px`,
            }}
          >
            <h2
              className="text-lg font-bold mb-3 flex items-center"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              <span
                className="inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                style={{
                  backgroundColor: primaryColor,
                  color: "white",
                }}
              >
                i
              </span>
              About Me
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
            <section
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-lg font-bold mb-3 flex items-center"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                  }}
                >
                  ⚒
                </span>
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 rounded-lg relative"
                    style={{
                      backgroundColor: lighterColor,
                    }}
                  >
                    <div
                      className="absolute top-4 right-4 px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: "white",
                        color: primaryColor,
                        fontSize: `${fontSize * 0.8}px`,
                      }}
                    >
                      {job.startDate} - {job.endDate}
                    </div>
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
              <h2
                className="text-lg font-bold mb-3 flex items-center"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                  }}
                >
                  ★
                </span>
                {section.title}
              </h2>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: lighterColor,
                }}
              >
                <p
                  className="text-sm whitespace-pre-line"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight,
                  }}
                >
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="md:col-span-4">
          {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
            <section
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-lg font-bold mb-3 flex items-center"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                  }}
                >
                  ⚡
                </span>
                Skills
              </h2>
              <div
                className="p-4 rounded-lg space-y-2"
                style={{
                  backgroundColor: lighterColor,
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                    style={{
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    ></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {!hiddenSections.includes("education") && education && education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold mb-3 flex items-center"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                <span
                  className="inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center"
                  style={{
                    backgroundColor: primaryColor,
                    color: "white",
                  }}
                >
                  🎓
                </span>
                Education
              </h2>
              <div
                className="p-4 rounded-lg space-y-3"
                style={{
                  backgroundColor: lighterColor,
                }}
              >
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${fontSize * 1.08}px`,
                        color: primaryColor,
                      }}
                    >
                      {edu.degree}
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

