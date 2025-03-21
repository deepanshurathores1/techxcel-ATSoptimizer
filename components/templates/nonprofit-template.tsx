import type { ResumeData } from "@/types/resume"

export default function NonprofitTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-sans text-gray-800 p-6"
      style={{
        fontFamily: styles?.fontFamily || "Helvetica, Arial, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#2c3e50",
        background: "#fff",
      }}
    >
      {/* Header with mission-focused design */}
      <header className="mb-6 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-600">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold text-emerald-800">{personalInfo.fullName}</h1>
            <p className="text-lg font-medium text-emerald-600 mb-2">{personalInfo.title}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">✉</span> {personalInfo.email}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">☎</span> {personalInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">⌂</span> {personalInfo.location}
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/4 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center">
              <div className="text-center text-emerald-600">
                <div className="text-xs">MAKING</div>
                <div className="text-lg font-bold">IMPACT</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mission Statement */}
      {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
        <section className="mb-6 bg-emerald-50 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2 text-emerald-800 flex items-center">
            <span className="mr-2">❖</span> Mission Statement
          </h2>
          <p className="text-justify italic border-l-2 border-emerald-300 pl-4">{personalInfo.summary}</p>
        </section>
      )}

      {/* Main content in three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-1">
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-emerald-800 border-b border-emerald-300 pb-1">
                Core Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-emerald-50 px-3 py-2 rounded-lg border-l-2 border-emerald-400">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {customSections.map((section, sectionIndex) =>
            section.title.toLowerCase().includes("volunteer") || section.title.toLowerCase().includes("community") ? (
              <section key={sectionIndex} className="mb-6">
                <h2 className="text-lg font-bold mb-3 text-emerald-800 border-b border-emerald-300 pb-1">
                  {section.title}
                </h2>
                <div className="whitespace-pre-line">{section.content}</div>
              </section>
            ) : null,
          )}
        </div>

        {/* Middle and right columns */}
        <div className="col-span-2">
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-emerald-800 border-b border-emerald-300 pb-1">
                Impact & Experience
              </h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5 relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-200"></div>
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-emerald-600"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h3 className="font-bold text-emerald-700">{job.position}</h3>
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-emerald-600 mb-2">{job.company}</h4>
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              ))}
            </section>
          )}

          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-emerald-800 border-b border-emerald-300 pb-1">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-emerald-50 p-3 rounded-lg">
                    <h3 className="font-bold text-emerald-700">{edu.institution}</h3>
                    <p className="text-sm text-emerald-600">{edu.graduationDate}</p>
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
            !section.title.toLowerCase().includes("volunteer") && !section.title.toLowerCase().includes("community") ? (
              <section key={sectionIndex} className="mb-6">
                <h2 className="text-lg font-bold mb-3 text-emerald-800 border-b border-emerald-300 pb-1">
                  {section.title}
                </h2>
                <div className="whitespace-pre-line">{section.content}</div>
              </section>
            ) : null,
          )}
        </div>
      </div>

      {/* Footer with impact statement */}
      <footer className="mt-6 pt-4 border-t border-emerald-300 text-center text-sm text-emerald-600">
        <div className="flex items-center justify-center gap-2">
          <span>●</span>
          <span>Committed to Social Impact</span>
          <span>●</span>
          <span>Community-Focused</span>
          <span>●</span>
          <span>Mission-Driven</span>
          <span>●</span>
        </div>
      </footer>
    </div>
  )
}

