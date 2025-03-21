import type { ResumeData } from "@/types/resume"

interface UXDesignerTemplateProps {
  data: ResumeData
}

export default function UXDesignerTemplate({ data }: UXDesignerTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Inter', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#8b5cf6",
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
            backgroundColor: `${primaryColor}10`,
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
            className="text-xl mb-4"
            style={{
              fontSize: `${fontSize * 1.5}px`,
            }}
          >
            {personalInfo.title || "UX Designer"}
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
                borderBottom: showBorders ? `2px solid ${primaryColor}` : "none",
                paddingBottom: "8px",
              }}
            >
              About Me
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
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
                Design Experience
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

          {/* UX Projects - specific to UX designer */}
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
              Featured UX Projects
            </h2>
            <div
              className="space-y-3"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                <h3 className="font-bold mb-1">Mobile App Redesign</h3>
                <p className="text-sm mb-1">
                  <strong>Challenge:</strong> Improve user engagement and reduce drop-off rates
                </p>
                <p className="text-sm mb-1">
                  <strong>Process:</strong> User research, wireframing, prototyping, usability testing
                </p>
                <p className="text-sm">
                  <strong>Result:</strong> 40% increase in user engagement and 25% reduction in drop-off rates
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                <h3 className="font-bold mb-1">E-commerce Website Optimization</h3>
                <p className="text-sm mb-1">
                  <strong>Challenge:</strong> Streamline checkout process to increase conversion
                </p>
                <p className="text-sm mb-1">
                  <strong>Process:</strong> Heuristic evaluation, A/B testing, user journey mapping
                </p>
                <p className="text-sm">
                  <strong>Result:</strong> 35% increase in conversion rate and 20% reduction in cart abandonment
                </p>
              </div>
            </div>
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

        <div>
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
                Design Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Design Tools - specific to UX designer */}
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
              Design Tools
            </h2>
            <div
              className="grid grid-cols-2 gap-2"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Figma
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Sketch
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Adobe XD
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                InVision
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Photoshop
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Illustrator
              </div>
            </div>
          </section>

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
        </div>
      </div>
    </div>
  )
}

