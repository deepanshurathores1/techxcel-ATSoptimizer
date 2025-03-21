import type { ResumeData } from "@/types/resume"

export default function CareerChangeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-sans"
      style={{
        fontFamily: styles?.fontFamily || "Roboto, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#333",
      }}
    >
      {/* Header with career transition focus */}
      <div className="flex flex-col md:flex-row">
        {/* Left column - Header and contact */}
        <div className="w-full md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-1 text-purple-800">{personalInfo.fullName}</h1>
          <p className="text-xl font-medium text-purple-600 mb-3 border-b-2 border-purple-200 pb-2">
            {personalInfo.title} <span className="text-sm font-normal">(Career Transition)</span>
          </p>
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <span className="flex items-center gap-1">
              <span className="text-purple-600">✉</span> {personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-purple-600">☎</span> {personalInfo.phone}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-purple-600">⌂</span> {personalInfo.location}
            </span>
          </div>

          {/* Career transition summary */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h2 className="text-lg font-bold mb-2 text-purple-800">Career Transition Summary</h2>
              <p className="text-justify">{personalInfo.summary}</p>
            </div>
          )}
        </div>

        {/* Right column - Career path visualization */}
        <div className="w-full md:w-1/3 bg-purple-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-sm text-purple-600 font-medium">CAREER JOURNEY</div>
            <div className="flex items-center justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold text-xs">
                PREVIOUS
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-300 to-purple-500"></div>
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs">
                CURRENT
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-700"></div>
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-xs">
                FUTURE
              </div>
            </div>
            <div className="text-sm text-purple-700 font-medium">
              Leveraging transferable skills for a successful transition
            </div>
          </div>
        </div>
      </div>

      {/* Main content in two columns */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Left column - Skills and education */}
        <div className="w-full md:w-1/3">
          {/* Transferable skills section */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>TS</span>
                </div>
                <h2 className="text-xl font-bold text-purple-800">Transferable Skills</h2>
              </div>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <div className="absolute top-0 left-0 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="bg-purple-50 w-full p-2 rounded-lg border-l-2 border-purple-400">{skill.name}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education and training */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>ET</span>
                </div>
                <h2 className="text-xl font-bold text-purple-800">Education & Training</h2>
              </div>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="bg-purple-50 p-3 rounded-lg border-l-2 border-purple-400">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-purple-700">{edu.institution}</h3>
                      <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                        {edu.graduationDate}
                      </span>
                    </div>
                    <p>
                      {edu.degree}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Relevant certifications or courses */}
          {customSections.map((section, sectionIndex) =>
            section.title.toLowerCase().includes("certification") ||
            section.title.toLowerCase().includes("course") ||
            section.title.toLowerCase().includes("training") ? (
              <section key={sectionIndex} className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    <span>{section.title.charAt(0).toUpperCase()}</span>
                  </div>
                  <h2 className="text-xl font-bold text-purple-800">{section.title}</h2>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-2 border-purple-400">
                  <div className="whitespace-pre-line">{section.content}</div>
                </div>
              </section>
            ) : null,
          )}
        </div>

        {/* Right column - Experience with skill mapping */}
        <div className="w-full md:w-2/3">
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>RE</span>
                </div>
                <h2 className="text-xl font-bold text-purple-800">Relevant Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="relative">
                    {/* Timeline visualization */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-200"></div>
                    <div className="absolute left-0 top-6 w-3 h-3 bg-purple-500 rounded-full -ml-1"></div>

                    <div className="pl-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-purple-400">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <h3 className="font-bold text-purple-700">{job.position}</h3>
                          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {job.startDate} - {job.endDate}
                          </span>
                        </div>
                        <h4 className="font-medium text-purple-600 mb-3 pb-2 border-b border-purple-100">
                          {job.company}
                        </h4>

                        {/* Skill mapping section */}
                        <div className="mb-3">
                          <div className="text-sm font-medium text-purple-700 mb-1">Transferable Skills Applied:</div>
                          <div className="flex flex-wrap gap-2">
                            {/* Generate random transferable skills from the job */}
                            {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, i) => (
                              <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {skills[Math.floor(Math.random() * skills.length)]?.name || "Leadership"}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="whitespace-pre-line">{job.description}</p>

                        {/* Career relevance indicator */}
                        <div className="mt-3 pt-3 border-t border-purple-100">
                          <div className="text-sm font-medium text-purple-700 mb-1">Relevance to New Career:</div>
                          <div className="w-full bg-purple-100 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Other custom sections */}
          {customSections.map((section, sectionIndex) =>
            !section.title.toLowerCase().includes("certification") &&
            !section.title.toLowerCase().includes("course") &&
            !section.title.toLowerCase().includes("training") ? (
              <section key={sectionIndex} className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                    <span>{section.title.charAt(0).toUpperCase()}</span>
                  </div>
                  <h2 className="text-xl font-bold text-purple-800">{section.title}</h2>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-purple-400">
                  <div className="whitespace-pre-line">{section.content}</div>
                </div>
              </section>
            ) : null,
          )}
        </div>
      </div>

      {/* Footer with career transition statement */}
      <footer className="bg-purple-700 text-white p-3 text-center">
        <div className="font-medium">
          Transitioning careers with confidence • Bringing valuable cross-industry perspective
        </div>
      </footer>
    </div>
  )
}

