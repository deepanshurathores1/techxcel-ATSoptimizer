import type { ResumeData } from "@/types/resume"

export default function SalesExecutiveTemplate({ data }: { data: ResumeData }) {
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
      {/* Modern header with sales-focused design */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-xl font-medium mb-3">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">{personalInfo.email}</span>
          <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">{personalInfo.phone}</span>
          <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">{personalInfo.location}</span>
        </div>
      </header>

      <div className="p-6">
        {/* Sales metrics dashboard */}
        {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
          <section className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                S
              </div>
              <h2 className="text-xl font-bold text-blue-800">SALES PROFILE</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-justify">{personalInfo.summary}</p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Sales metrics and skills */}
          <div className="col-span-1">
            {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    E
                  </div>
                  <h2 className="text-xl font-bold text-blue-800">EXPERTISE</h2>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {skills.map((skill, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-blue-600 font-bold">{Math.floor(Math.random() * 30) + 70}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    E
                  </div>
                  <h2 className="text-xl font-bold text-blue-800">EDUCATION</h2>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                      <p>
                        {edu.degree}
                        {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {customSections.map((section, sectionIndex) =>
              section.title.toLowerCase().includes("certification") || section.title.toLowerCase().includes("award") ? (
                <section key={sectionIndex} className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                      {section.title.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">{section.title.toUpperCase()}</h2>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="whitespace-pre-line">{section.content}</div>
                  </div>
                </section>
              ) : null,
            )}
          </div>

          {/* Right column - Sales achievements */}
          <div className="col-span-2">
            {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    A
                  </div>
                  <h2 className="text-xl font-bold text-blue-800">ACHIEVEMENTS</h2>
                </div>
                <div className="space-y-4">
                  {experience.map((job, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <h3 className="font-bold text-blue-700 text-lg">{job.position}</h3>
                        <span className="text-sm bg-blue-100 px-2 py-1 rounded text-blue-800 font-medium">
                          {job.startDate} - {job.endDate}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-700 mb-3 pb-2 border-b border-gray-200">{job.company}</h4>

                      {/* Format job description as bullet points for sales achievements */}
                      <div className="space-y-2">
                        {job.description.split("\n").map((line, i) =>
                          line.trim() ? (
                            <div key={i} className="flex">
                              <div className="text-blue-600 mr-2">▶</div>
                              <p>{line}</p>
                            </div>
                          ) : null,
                        )}
                      </div>

                      {/* Sales metrics visualization */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="text-blue-800 font-bold text-lg">
                              {Math.floor(Math.random() * 50) + 100}%
                            </div>
                            <div className="text-xs text-gray-600">Quota</div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="text-blue-800 font-bold text-lg">
                              ${Math.floor(Math.random() * 900) + 100}K
                            </div>
                            <div className="text-xs text-gray-600">Revenue</div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <div className="text-blue-800 font-bold text-lg">{Math.floor(Math.random() * 50) + 10}</div>
                            <div className="text-xs text-gray-600">New Clients</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {customSections.map((section, sectionIndex) =>
              !section.title.toLowerCase().includes("certification") &&
              !section.title.toLowerCase().includes("award") ? (
                <section key={sectionIndex} className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                      {section.title.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">{section.title.toUpperCase()}</h2>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="whitespace-pre-line">{section.content}</div>
                  </div>
                </section>
              ) : null,
            )}
          </div>
        </div>
      </div>

      {/* Footer with sales motto */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 text-center rounded-b-lg">
        <div className="font-bold">EXCEEDING TARGETS • DRIVING GROWTH • BUILDING RELATIONSHIPS</div>
      </footer>
    </div>
  )
}

