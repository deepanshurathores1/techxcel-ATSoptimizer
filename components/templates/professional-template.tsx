import type { ResumeData } from "@/types/resume"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default  experience, education, skills, styles = {}, customSections = [] } = data

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
    <div className="font-serif max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header
        className="border-b-2 border-gray-800 pb-4 mb-6"
        style={{
          borderBottomWidth: showBorders ? "2px" : "0",
          borderColor: primaryColor,
          marginBottom: sectionSpacing,
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-2"
          style={{
            fontSize: `${fontSize * 2}px`,
            color: primaryColor,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className="text-xl text-center mb-4"
          style={{
            fontSize: `${fontSize * 1.5}px`,
            color: primaryColor,
          }}
        >
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex justify-center flex-wrap gap-x-6 text-sm" style={{ fontSize: `${fontSize}px` }}>
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {!hiddenSections.includes("summary") && personalInfo.summary && (
        <section className="mb-6" style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-xl font-bold mb-3 text-gray-800"
            style={{
              fontSize: `${fontSize * 1.33}px`,
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
            className="text-xl font-bold mb-4 text-gray-800"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              marginBottom: "16px",
              color: primaryColor,
            }}
          >
            Professional Experience
          </h2>
          {experience.map(
            (job, index) =>
              job.company && (
                <div key={index} className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      className="text-lg font-bold"
                      style={{
                        fontSize: `${fontSize * 1.17}px`,
                        fontWeight: "bold",
                        color: primaryColor,
                      }}
                    >
                      {job.position}
                    </h3>
                    <span
                      className="text-sm italic"
                      style={{
                        fontSize: `${fontSize}px`,
                        fontStyle: "italic",
                      }}
                    >
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p
                    className="text-base font-medium mb-2"
                    style={{
                      fontSize: `${fontSize * 1.08}px`,
                      fontWeight: "500",
                      marginBottom: "8px",
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
              ),
          )}
        </section>
      )}

      {!hiddenSections.includes("education") && education && education.length > 0 && education[0].institution && (
        <section className="mb-6" style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-xl font-bold mb-4 text-gray-800"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              marginBottom: "16px",
              color: primaryColor,
            }}
          >
            Education
          </h2>
          {education.map(
            (edu, index) =>
              edu.institution && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3
                      className="text-base font-bold"
                      style={{
                        fontSize: `${fontSize * 1.08}px`,
                        fontWeight: "bold",
                        color: primaryColor,
                      }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <span
                      className="text-sm italic"
                      style={{
                        fontSize: `${fontSize}px`,
                        fontStyle: "italic",
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
                    {edu.institution}
                  </p>
                </div>
              ),
          )}
        </section>
      )}

      {!hiddenSections.includes("skills") && skills && skills.length > 0 && skills[0].name && (
        <section>
          <h2
            className="text-xl font-bold mb-3 text-gray-800"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              marginBottom: "12px",
              color: primaryColor,
            }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map(
              (skill, index) =>
                skill.name && (
                  <span
                    key={index}
                    className="text-sm"
                    style={{
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    • {skill.name}
                  </span>
                ),
            )}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <section key={section.id} style={{ marginBottom: sectionSpacing }}>
          <h2
            className="text-xl font-bold mb-3 text-gray-800"
            style={{
              fontSize: `${fontSize * 1.33}px`,
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

