import type { ResumeData } from "@/types/resume"

interface InternationalTemplateProps {
  data: ResumeData
}

export default function InternationalTemplate({ data }: InternationalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Noto Sans', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#0284c7",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
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

        {!hiddenSections.includes("summary") && personalInfo.summary && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{
              backgroundColor: `${primaryColor}10`,
              marginBottom: `${spacing}px`,
            }}
          >
            <h2
              className="text-lg font-bold mb-3"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              Professional Profile
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

          {/* Languages Section - Special for International Template */}
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
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                  }}
                >
                  English
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: "95%",
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                </div>
                <p
                  className="text-sm mt-1"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Fluent (C2)
                </p>
              </div>
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                  }}
                >
                  Spanish
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: "75%",
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                </div>
                <p
                  className="text-sm mt-1"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Professional (B2)
                </p>
              </div>
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                  }}
                >
                  French
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: "60%",
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                </div>
                <p
                  className="text-sm mt-1"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Intermediate (B1)
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

          {/* International Experience Section */}
          <section className="mt-6">
            <h2
              className="text-lg font-bold mb-3"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
              }}
            >
              International Experience
            </h2>
            <div className="space-y-3">
              <div>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                  }}
                >
                  Study Abroad
                </h3>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  University of Barcelona, Spain
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Fall 2018
                </p>
              </div>
              <div>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                  }}
                >
                  Volunteer Work
                </h3>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  Habitat for Humanity, Costa Rica
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Summer 2019
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

