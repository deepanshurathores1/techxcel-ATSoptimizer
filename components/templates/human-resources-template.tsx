import type { ResumeData } from "@/types/resume"

export default function HumanResourcesTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-sans"
      style={{
        fontFamily: styles?.fontFamily || "Calibri, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#333",
      }}
    >
      {/* Modern header with HR focus */}
      <header className="bg-teal-700 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName}</h1>
            <p className="text-lg font-medium mb-2">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-x-4 text-sm">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white text-teal-700 px-4 py-2 rounded-lg font-bold text-center">HR Professional</div>
          </div>
        </div>
      </header>

      {/* Main content in two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - 1/3 width */}
        <div className="w-full md:w-1/3 bg-teal-50 p-6">
          {/* HR competencies */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-teal-700 border-b-2 border-teal-200 pb-1">HR Competencies</h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* HR certifications */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-teal-700 border-b-2 border-teal-200 pb-1">HR Certifications</h2>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded-lg border-l-2 border-teal-500">
                SHRM-CP (Society for Human Resource Management)
              </div>
              <div className="bg-white p-2 rounded-lg border-l-2 border-teal-500">
                PHR (Professional in Human Resources)
              </div>
              <div className="bg-white p-2 rounded-lg border-l-2 border-teal-500">
                HRCI (HR Certification Institute)
              </div>
            </div>
          </section>

          {/* Education */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-teal-700 border-b-2 border-teal-200 pb-1">
                Education & Certifications
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-sm text-teal-600">{edu.graduationDate}</p>
                  <p>
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* HR systems */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-teal-700 border-b-2 border-teal-200 pb-1">HR Systems</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 text-center rounded-lg">
                <div className="text-teal-700 font-bold">Workday</div>
              </div>
              <div className="bg-white p-2 text-center rounded-lg">
                <div className="text-teal-700 font-bold">ADP</div>
              </div>
              <div className="bg-white p-2 text-center rounded-lg">
                <div className="text-teal-700 font-bold">BambooHR</div>
              </div>
              <div className="bg-white p-2 text-center rounded-lg">
                <div className="text-teal-700 font-bold">SAP SuccessFactors</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column - 2/3 width */}
        <div className="w-full md:w-2/3 p-6">
          {/* HR professional summary */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-teal-700 border-b-2 border-teal-200 pb-1">
                HR Professional Summary
              </h2>
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <p className="text-justify">{personalInfo.summary}</p>
              </div>
            </section>
          )}

          {/* HR experience */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-teal-700 border-b-2 border-teal-200 pb-1">HR Experience</h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="font-bold text-teal-800">{job.position}</h3>
                    <span className="text-sm bg-teal-100 px-2 py-1 rounded text-teal-700 font-medium">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-teal-600 mb-2 pb-1 border-b border-teal-100">{job.company}</h4>

                  {/* Format job description with HR metrics */}
                  <div className="space-y-2">
                    {job.description.split("\n").map((line, i) =>
                      line.trim() ? (
                        <div key={i} className="flex">
                          <div className="text-teal-500 mr-2">•</div>
                          <p>{line}</p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  {/* HR metrics */}
                  <div className="mt-3 pt-3 border-t border-teal-100">
                    <div className="text-sm font-medium text-teal-700 mb-1">HR Impact Metrics:</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-teal-50 p-2 rounded">
                        <div className="text-teal-800 font-bold">{Math.floor(Math.random() * 20) + 80}%</div>
                        <div className="text-xs text-gray-600">Retention Rate</div>
                      </div>
                      <div className="bg-teal-50 p-2 rounded">
                        <div className="text-teal-800 font-bold">{Math.floor(Math.random() * 10) + 20} Days</div>
                        <div className="text-xs text-gray-600">Time-to-Hire</div>
                      </div>
                      <div className="bg-teal-50 p-2 rounded">
                        <div className="text-teal-800 font-bold">${Math.floor(Math.random() * 500) + 1000}</div>
                        <div className="text-xs text-gray-600">Cost-per-Hire</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-teal-700 border-b-2 border-teal-200 pb-1">{section.title}</h2>
              <div className="whitespace-pre-line">{section.content}</div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer with HR values */}
      <footer className="bg-teal-700 text-white p-3 text-center">
        <div className="font-medium">People • Culture • Compliance • Development • Engagement</div>
      </footer>
    </div>
  )
}

