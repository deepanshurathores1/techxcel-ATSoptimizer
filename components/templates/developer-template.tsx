import type { ResumeData } from "@/types/resume"

interface DeveloperTemplateProps {
  data: ResumeData
}

export default function DeveloperTemplate({ data }: DeveloperTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'JetBrains Mono', monospace",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#10b981",
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
            backgroundColor: "#1e293b",
            color: "white",
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
              {personalInfo.email && <p>// {personalInfo.email}</p>}
              {personalInfo.phone && <p>// {personalInfo.phone}</p>}
              {personalInfo.location && <p>// {personalInfo.location}</p>}
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
            <div className="flex items-center mb-3">
              <span
                className="text-lg font-bold mr-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                /**
              </span>
              <h2
                className="text-lg font-bold"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                }}
              >
                ABOUT
              </h2>
              <span
                className="text-lg font-bold ml-2"
                style={{
                  fontSize: `${fontSize * 1.33}px`,
                  color: primaryColor,
                }}
              >
                */
              </span>
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
          </div>
        )}
      </header>

      {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <div className="flex items-center mb-3">
            <span
              className="text-lg font-bold mr-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              /**
            </span>
            <h2
              className="text-lg font-bold"
              style={{
                fontSize: `${fontSize * 1.33}px`,
              }}
            >
              TECH_STACK
            </h2>
            <span
              className="text-lg font-bold ml-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              */
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded"
                style={{
                  backgroundColor: "#1e293b",
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

      {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <div className="flex items-center mb-3">
            <span
              className="text-lg font-bold mr-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              /**
            </span>
            <h2
              className="text-lg font-bold"
              style={{
                fontSize: `${fontSize * 1.33}px`,
              }}
            >
              WORK_EXPERIENCE
            </h2>
            <span
              className="text-lg font-bold ml-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              */
            </span>
          </div>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div
                key={index}
                className="mb-4 p-4 rounded"
                style={{
                  backgroundColor: "#f8fafc",
                }}
              >
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
                      fontFamily: "monospace",
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

      {!hiddenSections.includes("education") && education && education.length > 0 && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <div className="flex items-center mb-3">
            <span
              className="text-lg font-bold mr-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              /**
            </span>
            <h2
              className="text-lg font-bold"
              style={{
                fontSize: `${fontSize * 1.33}px`,
              }}
            >
              EDUCATION
            </h2>
            <span
              className="text-lg font-bold ml-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              */
            </span>
          </div>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-4 rounded"
                style={{
                  backgroundColor: "#f8fafc",
                }}
              >
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
                    fontFamily: "monospace",
                  }}
                >
                  {edu.graduationDate}
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
          <div className="flex items-center mb-3">
            <span
              className="text-lg font-bold mr-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              /**
            </span>
            <h2
              className="text-lg font-bold"
              style={{
                fontSize: `${fontSize * 1.33}px`,
              }}
            >
              {section.title.toUpperCase().replace(/\s+/g, "_")}
            </h2>
            <span
              className="text-lg font-bold ml-2"
              style={{
                fontSize: `${fontSize * 1.33}px`,
                color: primaryColor,
              }}
            >
              */
            </span>
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
  )
}

