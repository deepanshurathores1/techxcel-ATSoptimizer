import type { ResumeData } from "@/types/resume"

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Segoe UI', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#9c27b0",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar */}
        <div
          className="md:w-1/3 p-6"
          style={{
            backgroundColor: `${primaryColor}10`,
            color: primaryColor,
          }}
        >
          <div className="mb-8 text-center">
            <div
              className="w-32 h-32 mx-auto rounded-full mb-4 flex items-center justify-center text-3xl font-bold"
              style={{
                backgroundColor: primaryColor,
                color: "white",
              }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0) : "J"}
            </div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{
                fontSize: `${fontSize * 1.8}px`,
                color: primaryColor,
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p
              className="text-lg"
              style={{
                fontSize: `${fontSize * 1.3}px`,
              }}
            >
              {personalInfo.title || "Professional Title"}
            </p>
          </div>

          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 pb-2 border-b"
              style={{
                fontSize: `${fontSize * 1.2}px`,
                borderBottomColor: primaryColor,
              }}
            >
              Contact
            </h2>
            <div
              className="space-y-2"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              {personalInfo.email && (
                <div className="flex items-center">
                  <span className="mr-2">✉</span>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center">
                  <span className="mr-2">☏</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center">
                  <span className="mr-2">⌖</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-lg font-bold mb-3 pb-2 border-b"
                style={{
                  fontSize: `${fontSize * 1.2}px`,
                  borderBottomColor: primaryColor,
                }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div
                      className="flex justify-between text-sm"
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.random() * 40 + 60}%`,
                          backgroundColor: primaryColor,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hiddenSections.includes("education") && education && education.length > 0 && (
            <div>
              <h2
                className="text-lg font-bold mb-3 pb-2 border-b"
                style={{
                  fontSize: `${fontSize * 1.2}px`,
                  borderBottomColor: primaryColor,
                }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    <p className="font-bold">{edu.institution}</p>
                    <p>
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-sm">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="md:w-2/3 p-6">
          {!hiddenSections.includes("summary") && personalInfo.summary && (
            <div
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-xl font-bold mb-3 pb-2 border-b"
                style={{
                  fontSize: `${fontSize * 1.5}px`,
                  borderBottomColor: primaryColor,
                  color: primaryColor,
                }}
              >
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

          {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
            <div
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-xl font-bold mb-3 pb-2 border-b"
                style={{
                  fontSize: `${fontSize * 1.5}px`,
                  borderBottomColor: primaryColor,
                  color: primaryColor,
                }}
              >
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className="relative pl-6 pb-4"
                    style={{
                      borderLeft: `2px solid ${primaryColor}`,
                    }}
                  >
                    <div
                      className="absolute left-[-8px] top-0 w-3.5 h-3.5 rounded-full"
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    ></div>
                    <h3
                      className="font-bold"
                      style={{
                        fontSize: `${fontSize * 1.17}px`,
                        color: primaryColor,
                      }}
                    >
                      {job.position}
                    </h3>
                    <div
                      className="flex justify-between text-sm mb-2"
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      <span className="font-semibold">{job.company}</span>
                      <span>
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
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
            </div>
          )}

          {/* Custom Sections */}
          {customSections.map((section) => (
            <div
              key={section.id}
              className="mb-6"
              style={{
                marginBottom: `${spacing}px`,
              }}
            >
              <h2
                className="text-xl font-bold mb-3 pb-2 border-b"
                style={{
                  fontSize: `${fontSize * 1.5}px`,
                  borderBottomColor: primaryColor,
                  color: primaryColor,
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

