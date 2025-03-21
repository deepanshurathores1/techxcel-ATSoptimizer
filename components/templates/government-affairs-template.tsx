import type { ResumeData } from "@/types/resume"

export default function GovernmentAffairsTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-serif text-gray-800 p-6"
      style={{
        fontFamily: styles?.fontFamily || "Georgia, serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#2c3e50",
      }}
    >
      {/* Two-column header with seal-like design */}
      <header className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <div className="w-32 h-32 rounded-full border-4 border-blue-800 flex items-center justify-center bg-blue-50">
            <div className="text-center">
              <div className="text-xs text-blue-800 font-bold">ESTABLISHED</div>
              <div className="text-xl font-bold text-blue-800">{new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-blue-900 border-b-2 border-blue-800 pb-2 mb-2">
            {personalInfo.fullName}
          </h1>
          <p className="text-xl font-semibold text-blue-700 mb-2">{personalInfo.title}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✉</span>
              </div>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">☎</span>
              </div>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⌂</span>
              </div>
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content in two columns */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - 1/3 width */}
        <div className="w-full md:w-1/3">
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6 bg-blue-50 p-4 border-l-4 border-blue-800">
              <h2 className="text-lg font-bold mb-3 text-blue-900 uppercase">Policy Expertise</h2>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-800 mr-2"></div>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6 bg-blue-50 p-4 border-l-4 border-blue-800">
              <h2 className="text-lg font-bold mb-3 text-blue-900 uppercase">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                  <p>
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}

          {customSections.map((section, sectionIndex) =>
            section.title.toLowerCase().includes("certification") ||
            section.title.toLowerCase().includes("affiliation") ||
            section.title.toLowerCase().includes("membership") ? (
              <section key={sectionIndex} className="mb-6 bg-blue-50 p-4 border-l-4 border-blue-800">
                <h2 className="text-lg font-bold mb-3 text-blue-900 uppercase">{section.title}</h2>
                <div className="whitespace-pre-line">{section.content}</div>
              </section>
            ) : null,
          )}
        </div>

        {/* Right column - 2/3 width */}
        <div className="w-full md:w-2/3">
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-blue-900 uppercase border-b-2 border-blue-800 pb-1">
                Executive Summary
              </h2>
              <p className="text-justify italic">{personalInfo.summary}</p>
            </section>
          )}

          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-blue-900 uppercase border-b-2 border-blue-800 pb-1">
                Government Affairs Experience
              </h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="font-bold text-lg">{job.position}</h3>
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded text-blue-800 font-medium">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-semibold text-blue-700 mb-2">{job.company}</h4>
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              ))}
            </section>
          )}

          {customSections.map((section, sectionIndex) =>
            !section.title.toLowerCase().includes("certification") &&
            !section.title.toLowerCase().includes("affiliation") &&
            !section.title.toLowerCase().includes("membership") ? (
              <section key={sectionIndex} className="mb-6">
                <h2 className="text-lg font-bold mb-2 text-blue-900 uppercase border-b-2 border-blue-800 pb-1">
                  {section.title}
                </h2>
                <div className="whitespace-pre-line">{section.content}</div>
              </section>
            ) : null,
          )}
        </div>
      </div>

      {/* Footer with decorative element */}
      <footer className="mt-6 pt-4 border-t-2 border-blue-800 text-center text-sm text-blue-800">
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-blue-800"></div>
          <div className="mx-2">Government Affairs Professional</div>
          <div className="h-px w-16 bg-blue-800"></div>
        </div>
      </footer>
    </div>
  )
}

