import type { ResumeData } from "@/types/resume"

export default function EducationTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-serif"
      style={{
        fontFamily: styles?.fontFamily || "Georgia, serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
        color: "#333",
      }}
    >
      {/* Academic-style header */}
      <header className="mb-6 text-center bg-blue-50 p-6 border-b-4 border-blue-700">
        <h1 className="text-3xl font-bold mb-1 text-blue-800">{personalInfo.fullName}</h1>
        <p className="text-xl font-medium text-blue-700 mb-3">{personalInfo.title}</p>
        <div className="flex justify-center flex-wrap gap-x-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="text-blue-600">✉</span> {personalInfo.email}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-600">☎</span> {personalInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-600">⌂</span> {personalInfo.location}
          </span>
        </div>
      </header>

      {/* Main content in two columns */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Left column - 2/3 width */}
        <div className="w-full md:w-2/3">
          {/* Teaching philosophy */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
                <span className="mr-2">📚</span> Teaching Philosophy
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700 italic">
                <p className="text-justify">{personalInfo.summary}</p>
              </div>
            </section>
          )}

          {/* Teaching experience */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
                <span className="mr-2">🏫</span> Teaching Experience
              </h2>
              {experience.map((job, index) => (
                <div key={index} className="mb-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="font-bold text-blue-800">{job.position}</h3>
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded text-blue-700 font-medium">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-blue-600 mb-2">{job.company}</h4>

                  {/* Format job description with course highlights */}
                  <div className="pl-4 border-l-2 border-blue-200">
                    {job.description.split("\n").map((line, i) =>
                      line.trim() ? (
                        <div key={i} className="mb-2">
                          <p>{line}</p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  {/* Course highlights */}
                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <div className="text-sm font-medium text-blue-700 mb-1">Courses Taught:</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-full border border-blue-200">
                        Introduction to Education
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-full border border-blue-200">
                        Classroom Management
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-full border border-blue-200">
                        Curriculum Development
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-full border border-blue-200">
                        Educational Psychology
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Publications and research */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
              <span className="mr-2">📝</span> Publications & Research
            </h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-800">"Modern Teaching Methods in the Digital Age"</p>
                <p className="text-sm">Journal of Education, Vol. 45, 2023</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-800">"Engaging Students Through Project-Based Learning"</p>
                <p className="text-sm">Educational Research Quarterly, Vol. 12, 2022</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-800">"The Impact of Technology on Student Learning Outcomes"</p>
                <p className="text-sm">Technology in Education Conference, 2021</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right column - 1/3 width */}
        <div className="w-full md:w-1/3">
          {/* Education & credentials */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
                <span className="mr-2">🎓</span> Education & Credentials
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 bg-blue-50 p-3 rounded-lg">
                  <h3 className="font-bold text-blue-800">{edu.institution}</h3>
                  <p className="text-sm text-blue-600">{edu.graduationDate}</p>
                  <p>
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Teaching skills & competencies */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
                <span className="mr-2">✓</span> Teaching Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional development */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
              <span className="mr-2">🔄</span> Professional Development
            </h2>
            <div className="space-y-2">
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="font-medium">Innovative Teaching Methods Workshop</p>
                <p className="text-sm">National Education Association, 2023</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="font-medium">Technology Integration in the Classroom</p>
                <p className="text-sm">EdTech Conference, 2022</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <p className="font-medium">Differentiated Instruction Certificate</p>
                <p className="text-sm">American Board of Education, 2021</p>
              </div>
            </div>
          </section>

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-blue-700 border-b border-blue-200 pb-1 flex items-center">
                <span className="mr-2">📋</span> {section.title}
              </h2>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="whitespace-pre-line">{section.content}</div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer with education quote */}
      <footer className="bg-blue-700 text-white p-4 text-center">
        <div className="font-medium italic">
          "Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats
        </div>
      </footer>
    </div>
  )
}

