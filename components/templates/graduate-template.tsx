import type { ResumeData } from "@/types/resume"

interface GraduateTemplateProps {
  data: ResumeData
}

export default function GraduateTemplate({ data }: GraduateTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Open Sans', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#4f46e5",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div
          className="text-center mb-6 pb-6"
          style={{
            borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
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
            className="text-xl mb-3"
            style={{
              fontSize: `${fontSize * 1.5}px`,
            }}
          >
            {personalInfo.title || "Recent Graduate"}
          </p>
          <div
            className="flex justify-center flex-wrap gap-4 text-sm"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
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
              }}
            >
              Career Objective
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

      {!hiddenSections.includes("education") && education && education.length > 0 && (
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
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: `${fontSize * 1.17}px`,
                      color: primaryColor,
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <span
                    className="text-sm"
                    style={{
                      fontSize: `${fontSize * 0.9}px`,
                    }}
                  >
                    {edu.graduationDate}
                  </span>
                </div>
                <p
                  className="font-medium"
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
                  Relevant Coursework: Data Structures, Algorithms, Web Development
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

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
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: `${fontSize * 1.17}px`,
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

      {/* Custom Sections - Projects, Volunteer Work, etc. */}
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
  )
}

