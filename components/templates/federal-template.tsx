import type { ResumeData } from "@/types/resume"

interface FederalTemplateProps {
  data: ResumeData
}

export default function FederalTemplate({ data }: FederalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Times New Roman', serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#000000",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <h1
          className="text-3xl font-bold mb-2 text-center"
          style={{
            fontSize: `${fontSize * 2}px`,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div
          className="flex justify-center flex-wrap gap-4 text-sm text-center"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Federal resumes typically have a citizenship and clearance section */}
      <section
        className="mb-6"
        style={{
          marginBottom: `${spacing}px`,
        }}
      >
        <h2
          className="text-lg font-bold mb-3 uppercase"
          style={{
            fontSize: `${fontSize * 1.33}px`,
            borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
            paddingBottom: "8px",
          }}
        >
          Personal Information
        </h2>
        <div
          className="grid grid-cols-2 gap-4"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div>
            <p>
              <strong>Citizenship:</strong> United States
            </p>
            <p>
              <strong>Veterans' Preference:</strong> N/A
            </p>
          </div>
          <div>
            <p>
              <strong>Security Clearance:</strong> Secret
            </p>
            <p>
              <strong>Federal Status:</strong> N/A
            </p>
          </div>
        </div>
      </section>

      {!hiddenSections.includes("summary") && personalInfo.summary && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <h2
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
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

      {!hiddenSections.includes("experience") && experience && experience.length > 0 && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <h2
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Work Experience
          </h2>
          <div className="space-y-6">
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
                {/* Federal resumes typically include hours per week */}
                <p
                  className="text-sm mb-2"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  <strong>Hours per week:</strong> 40 | <strong>Salary:</strong> $XX,XXX
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
          <h2
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
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
                      fontSize: `${fontSize * 1.08}px`,
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
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                {/* Federal resumes typically include GPA */}
                <p
                  className="text-sm"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  <strong>GPA:</strong> 3.8/4.0
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
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Skills
          </h2>
          <div
            className="grid grid-cols-1 gap-2"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References section - common in federal resumes */}
      <section
        className="mb-6"
        style={{
          marginBottom: `${spacing}px`,
        }}
      >
        <h2
          className="text-lg font-bold mb-3 uppercase"
          style={{
            fontSize: `${fontSize * 1.33}px`,
            borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
            paddingBottom: "8px",
          }}
        >
          References
        </h2>
        <p
          className="text-sm"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          References available upon request.
        </p>
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
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
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

