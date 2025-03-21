import type { ResumeData } from "@/types/resume"

export default function RemoteProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-sans bg-white"
      style={{
        fontFamily: styles?.fontFamily || "Inter, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#374151",
      }}
    >
      {/* Modern sidebar layout for remote work */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-indigo-50 p-6">
          {/* Profile section with remote indicator */}
          <div className="mb-8 text-center">
            <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-3xl font-bold text-indigo-700">
                {personalInfo.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
            <h1 className="text-xl font-bold text-indigo-900 mb-1">{personalInfo.fullName}</h1>
            <div className="flex items-center justify-center mb-2">
              <span className="text-indigo-700 font-medium">{personalInfo.title}</span>
              <span className="ml-2 bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full">Remote</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center mr-2 text-indigo-700">
                  ✉
                </span>
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center mr-2 text-indigo-700">
                  ☎
                </span>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center mr-2 text-indigo-700">
                  ⌂
                </span>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Remote work skills */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-indigo-900 flex items-center">
                <span className="w-6 h-1 bg-indigo-400 mr-2"></span>
                Remote Work Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg px-3 py-2 shadow-sm border-l-2 border-indigo-400 flex items-center"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-indigo-900 flex items-center">
                <span className="w-6 h-1 bg-indigo-400 mr-2"></span>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <h3 className="font-bold text-indigo-700">{edu.institution}</h3>
                    <p className="text-xs text-indigo-600 mb-1">{edu.graduationDate}</p>
                    <p className="text-sm">
                      {edu.degree}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Digital Tools section */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-indigo-900 flex items-center">
              <span className="w-6 h-1 bg-indigo-400 mr-2"></span>
              Digital Workspace
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-indigo-700 font-bold">Zoom</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-indigo-700 font-bold">Slack</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-indigo-700 font-bold">Trello</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center shadow-sm">
                <div className="text-indigo-700 font-bold">Asana</div>
              </div>
            </div>
          </section>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Remote work profile */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>RP</span>
                </div>
                <h2 className="text-xl font-bold text-indigo-900">Remote Work Profile</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                <p className="text-justify">{personalInfo.summary}</p>
              </div>
            </section>
          )}

          {/* Remote experience with time zones */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>RE</span>
                </div>
                <h2 className="text-xl font-bold text-indigo-900">Remote Experience</h2>
              </div>
              <div className="space-y-4">
                {experience.map((job, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm relative">
                    <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-bl-lg">
                      {job.startDate} - {job.endDate}
                    </div>
                    <h3 className="font-bold text-indigo-800 text-lg pr-24">{job.position}</h3>
                    <div className="flex items-center mb-3">
                      <h4 className="font-medium text-indigo-600">{job.company}</h4>
                      <span className="ml-2 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">Remote</span>
                    </div>

                    {/* Format job description with remote work highlights */}
                    <div className="space-y-2">
                      {job.description.split("\n").map((line, i) =>
                        line.trim() ? (
                          <div key={i} className="flex">
                            <div className="text-indigo-500 mr-2">→</div>
                            <p>{line}</p>
                          </div>
                        ) : null,
                      )}
                    </div>

                    {/* Remote collaboration metrics */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-indigo-50 p-2 rounded">
                          <div className="text-indigo-800 font-bold">
                            {Math.floor(Math.random() * 5) + 3} Time Zones
                          </div>
                          <div className="text-xs text-gray-600">Collaboration</div>
                        </div>
                        <div className="bg-indigo-50 p-2 rounded">
                          <div className="text-indigo-800 font-bold">100% Remote</div>
                          <div className="text-xs text-gray-600">Work Style</div>
                        </div>
                        <div className="bg-indigo-50 p-2 rounded">
                          <div className="text-indigo-800 font-bold">{Math.floor(Math.random() * 10) + 5} Tools</div>
                          <div className="text-xs text-gray-600">Tech Stack</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                  <span>{section.title.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="text-xl font-bold text-indigo-900">{section.title}</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="whitespace-pre-line">{section.content}</div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer with remote work availability */}
      <footer className="bg-indigo-600 text-white p-3 text-center">
        <div className="font-medium">Available for remote work worldwide • Flexible hours across time zones</div>
      </footer>
    </div>
  )
}

