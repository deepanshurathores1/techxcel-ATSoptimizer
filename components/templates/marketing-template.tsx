import type { ResumeData } from "@/types/resume"

interface MarketingTemplateProps {
  data: ResumeData
}

export default function MarketingTemplate({ data }: MarketingTemplateProps) {
  const { personalInfo, experience, education, skills, styles = {}, customSections = [] } = data

  // Default styles if not provided
  const {
    fontFamily = "'Montserrat', sans-serif",
    fontSize = 12,
    lineHeight = 1.5,
    primaryColor = "#f43f5e",
    showBorders = true,
    spacing = 24,
    hiddenSections = [],
  } = styles

  return (
    <div className="max-w-[800px] mx-auto" style={{ fontFamily }}>
      <header className="mb-8">
        <div
          className="p-6 rounded-lg mb-6 relative overflow-hidden"
          style={{
            backgroundColor: primaryColor,
            color: "white",
          }}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{
              backgroundColor: "white",
              transform: "translate(30%, -30%)",
            }}
          ></div>

          <div className="relative z-10">
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                fontSize: `${fontSize * 2}px`,
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
              {personalInfo.title || "Marketing Professional"}
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
              PROFILE
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
                }}
              >
                MARKETING EXPERIENCE
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

          {/* Campaign Highlights - specific to marketing */}
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
              }}
            >
              CAMPAIGN HIGHLIGHTS
            </h2>
            <div
              className="space-y-3"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                <h3 className="font-bold mb-1">Product Launch Campaign</h3>
                <p>
                  Led digital marketing strategy for new product launch, resulting in 150% ROI and 50,000+ new
                  customers.
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                <h3 className="font-bold mb-1">Social Media Rebrand</h3>
                <p>Executed complete social media rebrand, increasing engagement by 75% and follower growth by 40%.</p>
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
                }}
              >
                MARKETING SKILLS
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

          {/* Tools & Software - specific to marketing */}
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
              }}
            >
              TOOLS & SOFTWARE
            </h2>
            <div
              className="grid grid-cols-2 gap-2"
              style={{
                fontSize: `${fontSize}px`,
              }}
            >
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Google Analytics
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                HubSpot
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Adobe Creative Suite
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Mailchimp
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                SEMrush
              </div>
              <div className="p-2 text-center rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                Canva
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
                }}
              >
                EDUCATION
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

