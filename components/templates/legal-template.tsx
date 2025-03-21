import type { ResumeData } from "@/types/resume"

interface LegalTemplateProps {
  data: ResumeData
}

export default function LegalTemplate({ data }: LegalTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Garamond', serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#2d3748",
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

        {/* Bar Admission - specific to legal */}
        <div
          className="mt-4 text-center"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <p>
            <strong>Bar Admissions:</strong> New York State Bar, 2018 | California State Bar, 2020
          </p>
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
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              color: primaryColor,
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
              color: primaryColor,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Legal Experience
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

      {/* Notable Cases section - specific to legal */}
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
            color: primaryColor,
            borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
            paddingBottom: "8px",
          }}
        >
          Notable Cases
        </h2>
        <div
          className="space-y-3"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div>
            <p>
              <strong>Smith v. Johnson (2022)</strong> - Successfully represented client in complex litigation resulting
              in favorable settlement.
            </p>
          </div>
          <div>
            <p>
              <strong>In re: Corporate Restructuring (2021)</strong> - Advised on legal aspects of major corporate
              reorganization.
            </p>
          </div>
        </div>
      </section>

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
              color: primaryColor,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: `${fontSize * 1.08}px`,
                    }}
                  >
                    {edu.degree} in {edu.fieldOfStudy}
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
                  {edu.institution}
                </p>
                {/* Legal resumes often include honors */}
                <p
                  className="text-sm italic"
                  style={{
                    fontSize: `${fontSize * 0.9}px`,
                  }}
                >
                  Honors: Dean's List, Moot Court
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!hiddenSections.includes("skills") && skills && skills.length > 0 && (
        <section>
          <h2
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              color: primaryColor,
              borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
              paddingBottom: "8px",
            }}
          >
            Legal Skills & Competencies
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

      {/* Publications section - common in legal resumes */}
      <section
        className="mt-6"
        style={{
          marginTop: `${spacing}px`,
        }}
      >
        <h2
          className="text-lg font-bold mb-3 uppercase"
          style={{
            fontSize: `${fontSize * 1.33}px`,
            color: primaryColor,
            borderBottom: showBorders ? `1px solid ${primaryColor}` : "none",
            paddingBottom: "8px",
          }}
        >
          Publications & Presentations
        </h2>
        <div
          className="space-y-2"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <p>"Legal Implications of Corporate Restructuring," Harvard Law Review, 2022</p>
          <p>"Navigating Regulatory Compliance," Legal Conference, New York, 2021</p>
        </div>
      </section>

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
            className="text-lg font-bold mb-3 uppercase"
            style={{
              fontSize: `${fontSize * 1.33}px`,
              color: primaryColor,
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

