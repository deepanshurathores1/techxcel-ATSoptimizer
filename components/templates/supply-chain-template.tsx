import type { ResumeData } from "@/types/resume"

export default function SupplyChainTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-sans"
      style={{
        fontFamily: styles?.fontFamily || "Arial, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#333",
      }}
    >
      {/* Header with supply chain flow design */}
      <header className="bg-amber-50 p-6 border-b-4 border-amber-600">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-amber-800">{personalInfo.fullName}</h1>
            <p className="text-lg font-medium text-amber-700 mb-2">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-x-4 text-sm">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 text-xs">
                SRC
              </div>
              <div className="w-12 h-1 bg-amber-400"></div>
              <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-amber-800 text-xs">
                MFG
              </div>
              <div className="w-12 h-1 bg-amber-400"></div>
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-amber-800 text-xs">
                DIST
              </div>
              <div className="w-12 h-1 bg-amber-400"></div>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
                CUST
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content in two columns */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - 1/3 width */}
        <div className="w-full md:w-1/3 p-6">
          {/* Supply chain professional summary */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">
                Supply Chain Professional Summary
              </h2>
              <p className="text-justify">{personalInfo.summary}</p>
            </section>
          )}

          {/* Supply chain & logistics skills */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">
                Supply Chain & Logistics Skills
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-amber-50 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Supply chain certifications */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">
              Supply Chain Certifications
            </h2>
            <div className="space-y-2">
              <div className="bg-amber-50 p-2 rounded-lg border-l-2 border-amber-500">
                CSCP (Certified Supply Chain Professional)
              </div>
              <div className="bg-amber-50 p-2 rounded-lg border-l-2 border-amber-500">
                CPIM (Certified in Production and Inventory Management)
              </div>
              <div className="bg-amber-50 p-2 rounded-lg border-l-2 border-amber-500">Six Sigma Green Belt</div>
            </div>
          </section>

          {/* Education */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">
                Education & Certifications
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-sm text-amber-700">{edu.graduationDate}</p>
                  <p>
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column - 2/3 width */}
        <div className="w-full md:w-2/3 p-6 bg-amber-50">
          {/* Professional experience with supply chain metrics */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-amber-800 border-b border-amber-200 pb-1">
                Supply Chain Experience
              </h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="font-bold text-amber-800">{job.position}</h3>
                    <span className="text-sm bg-amber-100 px-2 py-1 rounded text-amber-800 font-medium">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-amber-700 mb-2 pb-1 border-b border-amber-100">{job.company}</h4>

                  {/* Format job description with supply chain achievements */}
                  <div className="space-y-2">
                    {job.description.split("\n").map((line, i) =>
                      line.trim() ? (
                        <div key={i} className="flex">
                          <div className="text-amber-500 mr-2">→</div>
                          <p>{line}</p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  {/* Supply chain KPIs */}
                  <div className="mt-3 pt-3 border-t border-amber-100">
                    <div className="text-sm font-medium text-amber-800 mb-1">Supply Chain KPIs:</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-amber-50 p-2 rounded">
                        <div className="text-amber-800 font-bold">{Math.floor(Math.random() * 10) + 90}%</div>
                        <div className="text-xs text-gray-600">On-Time Delivery</div>
                      </div>
                      <div className="bg-amber-50 p-2 rounded">
                        <div className="text-amber-800 font-bold">{Math.floor(Math.random() * 5) + 95}%</div>
                        <div className="text-xs text-gray-600">Inventory Accuracy</div>
                      </div>
                      <div className="bg-amber-50 p-2 rounded">
                        <div className="text-amber-800 font-bold">{Math.floor(Math.random() * 10) + 10}%</div>
                        <div className="text-xs text-gray-600">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Supply chain systems */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">
              Supply Chain Systems
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-amber-800 font-bold">SAP</div>
                <div className="text-xs text-gray-600">ERP</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-amber-800 font-bold">Oracle</div>
                <div className="text-xs text-gray-600">SCM</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-amber-800 font-bold">JDA</div>
                <div className="text-xs text-gray-600">WMS</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                <div className="text-amber-800 font-bold">Manhattan</div>
                <div className="text-xs text-gray-600">TMS</div>
              </div>
            </div>
          </section>

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-amber-800 border-b border-amber-200 pb-1">{section.title}</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="whitespace-pre-line">{section.content}</div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer with supply chain flow */}
      <footer className="bg-amber-800 text-white p-3 text-center">
        <div className="font-medium">SOURCING • MANUFACTURING • LOGISTICS • DISTRIBUTION • CUSTOMER SERVICE</div>
      </footer>
    </div>
  )
}

