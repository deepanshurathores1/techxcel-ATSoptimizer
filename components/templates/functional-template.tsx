import type { ResumeData } from "@/types/resume"

interface FunctionalTemplateProps {
  data: ResumeData
}

export default function FunctionalTemplate({ data }: FunctionalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Calibri', sans-serif",
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
          className="text-3xl font-bold mb-2 text-center"
          style={{
            fontSize: `${fontSize * 2}px`,
            color: primaryColor,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p
          className="text-xl text-center mb-3"
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
            Core Competencies
          </h2>
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-2 border rounded"
                style={{
                  borderColor: `${primaryColor}50`,
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Functional sections based on skills */}
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
          Professional Skills
        </h2>

        <div className="space-y-4">
          <div>
            <h3
              className="font-bold mb-2"
              style={{
                fontSize: `${fontSize * 1.17}px`,
                color: primaryColor,
              }}
            >
              Leadership & Management
            </h3>
            <ul
              className="list-disc pl-5 space-y-1"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <li>Led cross-functional teams to deliver projects on time and within budget</li>
              <li>Developed and implemented strategic plans resulting in 20% growth</li>
              <li>Mentored junior team members, improving team productivity by 15%</li>
            </ul>
          </div>

          <div>
            <h3
              className="font-bold mb-2"
              style={{
                fontSize: `${fontSize * 1.17}px`,
                color: primaryColor,
              }}
            >
              Technical Expertise
            </h3>
            <ul
              className="list-disc pl-5 space-y-1"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <li>Designed and implemented scalable solutions for enterprise clients</li>
              <li>Optimized database performance, reducing query times by 40%</li>
              <li>Developed automated testing frameworks improving code quality</li>
            </ul>
          </div>

          <div>
            <h3
              className="font-bold mb-2"
              style={{
                fontSize: `${fontSize * 1.17}px`,
                color: primaryColor,
              }}
            >
              Communication & Collaboration
            </h3>
            <ul
              className="list-disc pl-5 space-y-1"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <li>Presented technical concepts to non-technical stakeholders</li>
              <li>Collaborated with clients to gather and refine requirements</li>
              <li>Created comprehensive documentation for complex systems</li>
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
            Employment History
          </h2>
          <div className="space-y-2">
            {experience.map((job, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline"
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                <div>
                  <span className="font-bold">{job.position}</span>
                  <span>, {job.company}</span>
                </div>
                <span className="text-sm">
                  {job.startDate} - {job.endDate}
                </span>
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
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline"
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                <div>
                  <span className="font-bold">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span>, {edu.institution}</span>
                </div>
                <span className="text-sm">{edu.graduationDate}</span>
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

