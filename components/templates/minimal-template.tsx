import type { ResumeData } from "@/types/resume"

interface MinimalTemplateProps {
  data: ResumeData
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "Arial, sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#1a1a1a",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  // Convert spacing to margin-bottom
  const sectionSpacing = `${spacing}px`

  return (
    <div
      className="max-w-[800px] mx-auto print:max-w-full"
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight,
        color: primaryColor,
      }}
    >
      <header className="text-center mb-8" style={{ marginBottom: sectionSpacing }}>
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontSize: `${fontSize * 2}px`,
            marginBottom: "8px",
            color: primaryColor,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className="text-xl mb-2"
          style={{
            fontSize: `${fontSize * 1.5}px`,
            marginBottom: "8px",
            color: primaryColor,
          }}
        >
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-x-4 text-sm" style={{ fontSize: `${fontSize}px` }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
      </header>

      {!hiddenSections.includes("summary") && personalInfo.summary && (
        <section className="mb-6" style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-lg font-bold border-b pb-1 mb-3"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomWidth: showBorders ? "1px" : "0",
              borderBottomColor: primaryColor,
              paddingBottom: "4px",
              marginBottom: "12px",
              color: primaryColor,
            }}
          >
            Professional Summary
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight,
            }}
          >
            {personalInfo.summary}
          </p>
        </section>
      )}

      {!hiddenSections.includes("experience") && experience && experience.length > 0 && experience[0].company && (
        <section className="mb-6" style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-lg font-bold border-b pb-1 mb-3"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomWidth: showBorders ? "1px" : "0",
              borderBottomColor: primaryColor,
              paddingBottom: "4px",
              marginBottom: "12px",
              color: primaryColor,
            }}
          >
            Experience
          </h2>
          {experience.map(
            (job, index) =>
              job.company && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3
                      className="font-bold"
                      style={{
                        fontWeight: "bold",
                        color: primaryColor,
                      }}
                    >
                      {job.position}
                    </h3>
                    <span
                      className="text-sm"
                      style={{
                        fontSize: `${fontSize}px`,
                      }}
                    >
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontWeight: "500",
                    }}
                  >
                    {job.company}
                  </p>
                  <p
                    className="text-sm mt-1 whitespace-pre-line"
                    style={{
                      fontSize: `${fontSize}px`,
                      marginTop: "4px",
                    }}
                  >
                    {job.description}
                  </p>
                </div>
              ),
          )}
        </section>
      )}

      {!hiddenSections.includes("education") && education && education.length > 0 && education[0].institution && (
        <section className="mb-6" style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-lg font-bold border-b pb-1 mb-3"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomWidth: showBorders ? "1px" : "0",
              borderBottomColor: primaryColor,
              paddingBottom: "4px",
              marginBottom: "12px",
              color: primaryColor,
            }}
          >
            Education
          </h2>
          {education.map(
            (edu, index) =>
              edu.institution && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3
                      className="font-bold"
                      style={{
                        fontWeight: "bold",
                        color: primaryColor,
                      }}
                    >
                      {edu.institution}
                    </h3>
                    <span
                      className="text-sm"
                      style={{
                        fontSize: `${fontSize}px`,
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
                </div>
              ),
          )}
        </section>
      )}

      {!hiddenSections.includes("skills") && skills && skills.length > 0 && skills[0].name && (
        <section style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-lg font-bold border-b pb-1 mb-3"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomWidth: showBorders ? "1px" : "0",
              borderBottomColor: primaryColor,
              paddingBottom: "4px",
              marginBottom: "12px",
              color: primaryColor,
            }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(
              (skill, index) =>
                skill.name && (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                    style={{
                      fontSize: `${fontSize}px`,
                      backgroundColor: `${primaryColor}10`,
                      padding: "4px 12px",
                      borderRadius: "9999px",
                    }}
                  >
                    {skill.name}
                  </span>
                ),
            )}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.map((section, index) => (
        <section key={section.id} style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-lg font-bold border-b pb-1 mb-3"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomWidth: showBorders ? "1px" : "0",
              borderBottomColor: primaryColor,
              paddingBottom: "4px",
              marginBottom: "12px",
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
        </section>
      ))}
    </div>
  )
}

