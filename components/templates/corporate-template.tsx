import type { ResumeData } from "@/types/resume"

interface CorporateTemplateProps {
  data: ResumeData
}

export default function CorporateTemplate({ data }: CorporateTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "Arial, sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#2c3e50",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="font-sans max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="text-center mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            color: primaryColor,
            fontSize: `${fontSize * 2}px`,
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
          {personalInfo.title || "Professional Title"}
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
      </header>

      {!hiddenSections.includes("summary") && personalInfo.summary && (
        <section
          className="mb-6"
          style={{
            marginBottom: `${spacing}px`,
          }}
        >
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomColor: primaryColor,
              color: primaryColor,
            }}
          >
            PROFESSIONAL SUMMARY
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
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomColor: primaryColor,
              color: primaryColor,
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((job, index) => (
            <div
              key={index}
              className="mb-4"
              style={{
                marginBottom: `${spacing / 2}px`,
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
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {job.startDate} - {job.endDate}
                </span>
              </div>
              <p
                className="font-semibold mb-1"
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
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomColor: primaryColor,
              color: primaryColor,
            }}
          >
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className="mb-3"
              style={{
                marginBottom: `${spacing / 3}px`,
              }}
            >
              <div className="flex justify-between items-baseline">
                <h3
                  className="font-bold"
                  style={{
                    fontSize: `${fontSize * 1.08}px`,
                    color: primaryColor,
                  }}
                >
                  {edu.degree} in {edu.fieldOfStudy}
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
                {edu.institution}
              </p>
            </div>
          ))}
        </section>
      )}

      {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
        <section>
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomColor: primaryColor,
              color: primaryColor,
            }}
          >
            SKILLS & COMPETENCIES
          </h2>
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-1"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
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
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              borderBottomColor: primaryColor,
              color: primaryColor,
            }}
          >
            {section.title.toUpperCase()}
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

