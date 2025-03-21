import type { ResumeData } from "@/types/resume"

interface EngineeringTemplateProps {
  data: ResumeData
}

export default function EngineeringTemplate({ data }: EngineeringTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Arial', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#0f766e",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontSize: `${fontSize * 2}px`,
            color: primaryColor,
          }}
        >
          {personalInfo.fullName || "Your Name"}, P.E.
        </h1>
        <p
          className="text-xl mb-3"
          style={{
            fontSize: `${fontSize * 1.5}px`,
          }}
        >
          {personalInfo.title || "Professional Engineer"}
        </p>
        <div
          className="flex flex-wrap gap-4 text-sm"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {!hiddenSections.includes("summary") && personalInfo.summary && (
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
        </section>
      )}

      {/* Technical Expertise - specific to engineering */}
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
          Technical Expertise
        </h2>
        <div
          className="grid grid-cols-2 gap-4"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div>
            <h3
              className="font-bold mb-2"
              style={{
                fontSize: `${fontSize * 1.08}px`,
              }}
            >
              Design & Analysis
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Structural Analysis</li>
              <li>Finite Element Analysis</li>
              <li>CAD/CAM Systems</li>
            </ul>
          </div>
          <div>
            <h3
              className="font-bold mb-2"
              style={{
                fontSize: `${fontSize * 1.08}px`,
              }}
            >
              Project Management
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Budget Management</li>
              <li>Resource Allocation</li>
              <li>Risk Assessment</li>
            </ul>
          </div>
        </div>
      </section>

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

      {/* Key Projects - specific to engineering */}
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
          Key Projects
        </h2>
        <div
          className="space-y-3"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div>
            <h3 className="font-bold">City Center Redevelopment</h3>
            <p className="text-sm">
              Led structural design for $50M urban redevelopment project, implementing innovative solutions that reduced
              material costs by 15%.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Bridge Rehabilitation</h3>
            <p className="text-sm">
              Managed comprehensive assessment and rehabilitation of aging infrastructure, extending service life by 25
              years.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
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

        <div>
          {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
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
                Skills & Software
              </h2>
              <div
                className="grid grid-cols-2 gap-2"
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
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

          {/* Certifications - specific to engineering */}
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
              Certifications
            </h2>
            <div
              className="space-y-2"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <p>Professional Engineer (P.E.) License - State of California</p>
              <p>LEED Accredited Professional</p>
              <p>Project Management Professional (PMP)</p>
            </div>
          </section>
        </div>
      </div>

      {/* Custom Sections */}
      {customSections.map((section) => (
        <section
          key={section.id}
          className="mt-6"
          style={{
            marginTop: `${spacing}px`,
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
  )
}

