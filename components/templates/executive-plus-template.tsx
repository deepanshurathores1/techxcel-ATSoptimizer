import type { ResumeData } from "@/types/resume"

interface ExecutivePlusTemplateProps {
  data: ResumeData
}

export default function ExecutivePlusTemplate({ data }: ExecutivePlusTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Georgia', serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#1e293b",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div
          className="border-b-4 pb-6 mb-6"
          style={{
            borderColor: primaryColor,
          }}
        >
          <h1
            className="text-4xl font-bold mb-2 text-center"
            style={{
              fontSize: `${fontSize * 2.5}px`,
              color: primaryColor,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p
            className="text-xl text-center mb-4"
            style={{
              fontSize: `${fontSize * 1.5}px`,
            }}
          >
            {personalInfo.title || "Professional Title"}
          </p>
          <div
            className="flex justify-center flex-wrap gap-6 text-sm"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <span>Email:</span>
                <span className="font-semibold">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <span>Phone:</span>
                <span className="font-semibold">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <span>Location:</span>
                <span className="font-semibold">{personalInfo.location}</span>
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
              className="text-xl font-bold mb-3 uppercase"
              style={{
                fontSize: `${fontSize * 1.5}px`,
                color: primaryColor,
              }}
            >
              Executive Summary
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontSize: `${fontSize * 1.1}px`,
                lineHeight,
              }}
            >
              {personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <h2
            className="text-xl font-bold mb-4 uppercase"
            style={{
              fontSize: `${fontSize * 1.5}px`,
              color: primaryColor,
              borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h3
                    className="font-bold text-lg"
                    style={{
                      fontSize: `${fontSize * 1.25}px`,
                      color: primaryColor,
                    }}
                  >
                    {job.company}
                  </h3>
                  <span
                    className="text-sm italic"
                    style={{
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p
                  className="font-semibold mb-2"
                  style={{
                    fontSize: `${fontSize * 1.1}px`,
                  }}
                >
                  {job.position}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!hiddenSections.includes("education") && education && education.length > 0 && (
          <section
            className="mb-6"
            style={{
              marginBottom: `${spacing}px`,
            }}
          >
            <h2
              className="text-xl font-bold mb-4 uppercase"
              style={{
                fontSize: `${fontSize * 1.5}px`,
                color: primaryColor,
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
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
                      fontSize: `${fontSize * 1.1}px`,
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <p
                    className="text-sm italic"
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
            <h2
              className="text-xl font-bold mb-4 uppercase"
              style={{
                fontSize: `${fontSize * 1.5}px`,
                color: primaryColor,
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
              }}
            >
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2">
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
            className="text-xl font-bold mb-4 uppercase"
            style={{
              fontSize: `${fontSize * 1.5}px`,
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

