import type { ResumeData } from "@/types/resume"

interface ProjectManagerTemplateProps {
  data: ResumeData
}

export default function ProjectManagerTemplate({ data }: ProjectManagerTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Verdana', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#0e7490",
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
          {personalInfo.fullName || "Your Name"}, PMP
        </h1>
        <p
          className="text-xl mb-3"
          style={{
            fontSize: `${fontSize * 1.5}px`,
          }}
        >
          {personalInfo.title || "Project Manager"}
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

      {/* Project Management Highlights - specific to PM */}
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
          Project Management Highlights
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <p className="text-center font-bold mb-1" style={{ color: primaryColor }}>
              $5M+
            </p>
            <p className="text-center">Budget Managed</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <p className="text-center font-bold mb-1" style={{ color: primaryColor }}>
              15+
            </p>
            <p className="text-center">Projects Delivered</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <p className="text-center font-bold mb-1" style={{ color: primaryColor }}>
              98%
            </p>
            <p className="text-center">On-time Delivery</p>
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

      {/* Key Projects - specific to PM */}
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
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <h3 className="font-bold mb-1">Enterprise CRM Implementation</h3>
            <p className="text-sm mb-1">
              <strong>Budget:</strong> $1.2M | <strong>Timeline:</strong> 8 months
            </p>
            <p className="text-sm">
              Led cross-functional team of 12 to implement enterprise CRM system, completing project under budget and 2
              weeks ahead of schedule.
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <h3 className="font-bold mb-1">Digital Transformation Initiative</h3>
            <p className="text-sm mb-1">
              <strong>Budget:</strong> $800K | <strong>Timeline:</strong> 6 months
            </p>
            <p className="text-sm">
              Managed company-wide digital transformation project that increased operational efficiency by 25% and
              reduced costs by $350K annually.
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

          {/* Certifications - specific to PM */}
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
              <p>Project Management Professional (PMP)</p>
              <p>Certified Scrum Master (CSM)</p>
              <p>PRINCE2 Practitioner</p>
            </div>
          </section>
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
                Project Management Skills
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

          {/* Tools & Methodologies - specific to PM */}
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
              Tools & Methodologies
            </h2>
            <div
              className="grid grid-cols-2 gap-2"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                MS Project
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Jira
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Agile/Scrum
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Waterfall
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Asana
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Trello
              </div>
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

