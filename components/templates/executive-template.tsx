import type { ResumeData } from "@/types/resume"

interface ExecutiveTemplateProps {
  data: ResumeData
}

export default function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-serif max-w-[800px] mx-auto">
      <header className="mb-8">
        <div className="bg-gray-800 text-white p-6 mb-4">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-xl">{personalInfo.title || "Professional Title"}</p>
        </div>
        <div className="flex justify-between px-2">
          <div className="flex flex-col">
            {personalInfo.phone && <span className="text-sm">{personalInfo.phone}</span>}
            {personalInfo.email && <span className="text-sm">{personalInfo.email}</span>}
          </div>
          {personalInfo.location && <span className="text-sm">{personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8 px-2">
          <h2 className="text-xl font-bold mb-3 text-gray-800 uppercase tracking-wider">Executive Summary</h2>
          <div className="border-l-4 border-gray-800 pl-4">
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        </section>
      )}

      {experience && experience.length > 0 && experience[0].company && (
        <section className="mb-8 px-2">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wider">Professional Experience</h2>
          {experience.map(
            (job, index) =>
              job.company && (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-bold">{job.company}</h3>
                    <span className="text-sm">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p className="text-base font-medium italic mb-2">{job.position}</p>
                  <p className="text-sm whitespace-pre-line">{job.description}</p>
                </div>
              ),
          )}
        </section>
      )}

      {education && education.length > 0 && education[0].institution && (
        <section className="mb-8 px-2">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wider">Education</h2>
          {education.map(
            (edu, index) =>
              edu.institution && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-base font-bold">{edu.institution}</h3>
                      <p className="text-sm">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                    </div>
                    <span className="text-sm">{edu.graduationDate}</span>
                  </div>
                </div>
              ),
          )}
        </section>
      )}

      {skills && skills.length > 0 && skills[0].name && (
        <section className="px-2">
          <h2 className="text-xl font-bold mb-3 text-gray-800 uppercase tracking-wider">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map(
              (skill, index) =>
                skill.name && (
                  <div key={index} className="text-sm border border-gray-300 p-2 text-center">
                    {skill.name}
                  </div>
                ),
            )}
          </div>
        </section>
      )}
    </div>
  )
}

