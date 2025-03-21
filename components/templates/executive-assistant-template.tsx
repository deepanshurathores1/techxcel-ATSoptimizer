import type { ResumeData } from "@/types/resume"

export default function ExecutiveAssistantTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-serif"
      style={{
        fontFamily: styles?.fontFamily || "Cambria, serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#333",
      }}
    >
      {/* Elegant header with monogram */}
      <header className="text-center mb-6 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold">
          {personalInfo.fullName
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>
        <div className="pt-10 pb-4 border-b-2 border-gray-300">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">{personalInfo.fullName}</h1>
          <p className="text-lg font-medium text-gray-600 mb-2">{personalInfo.title}</p>
          <div className="flex justify-center flex-wrap gap-x-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-gray-500">✉</span> {personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-gray-500">☎</span> {personalInfo.phone}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-gray-500">⌂</span> {personalInfo.location}
            </span>
          </div>
        </div>
      </header>

      {/* Main content in three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-1">
          {/* Professional profile */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800 text-center border-b border-gray-200 pb-1">
                Professional Profile
              </h2>
              <p className="text-justify italic">{personalInfo.summary}</p>
            </section>
          )}

          {/* Administrative expertise */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800 text-center border-b border-gray-200 pb-1">
                Administrative Expertise
              </h2>
              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Software proficiency */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-gray-800 text-center border-b border-gray-200 pb-1">
              Software Proficiency
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span>Microsoft Office Suite</span>
                  <span className="text-gray-600">Expert</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span>Calendar Management</span>
                  <span className="text-gray-600">Expert</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span>Travel Coordination</span>
                  <span className="text-gray-600">Advanced</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span>CRM Systems</span>
                  <span className="text-gray-600">Proficient</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800 text-center border-b border-gray-200 pb-1">
                Education
              </h2>
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
        </div>

        {/* Middle and right columns */}
        <div className="col-span-2">
          {/* Professional experience */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800 text-center border-b border-gray-200 pb-1">
                Professional Experience
              </h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="font-bold text-gray-800">{job.position}</h3>
                    <span className="text-sm text-gray-600 italic">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-100">{job.company}</h4>

                  {/* Format job description as elegant bullet points */}
                  <div className="pl-4">
                    {job.description.split("\n").map((line, i) =>
                      line.trim() ? (
                        <div key={i} className="flex mb-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-1.5"></div>
                          <p>{line}</p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  {/* Executive support highlights */}
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-700 mb-1">Key Support Provided:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Calendar Management</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Travel Coordination</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Meeting Preparation</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Correspondence</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800 text-center border-b border-gray-200 pb-1">
                {section.title}
              </h2>
              <div className="whitespace-pre-line">{section.content}</div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer with elegant divider */}
      <footer className="mt-6 pt-4 border-t-2 border-gray-300 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-gray-300"></div>
          <div className="mx-2">Discretion • Organization • Efficiency</div>
          <div className="h-px w-16 bg-gray-300"></div>
        </div>
      </footer>
    </div>
  )
}

