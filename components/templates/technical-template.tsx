import type { ResumeData } from "@/types/resume"

interface TechnicalTemplateProps {
  data: ResumeData
}

export default function TechnicalTemplate({ data }: TechnicalTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-mono max-w-[800px] mx-auto">
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-lg mb-2">{personalInfo.title || "Professional Title"}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gray-800 mr-2"></div>
            <h2 className="text-lg font-bold">Technical Profile</h2>
          </div>
          <p className="text-sm pl-5 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && skills[0].name && (
        <section className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gray-800 mr-2"></div>
            <h2 className="text-lg font-bold">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pl-5">
            {skills.map(
              (skill, index) =>
                skill.name && (
                  <div key={index} className="text-sm bg-gray-100 px-2 py-1 rounded border border-gray-300">
                    {skill.name}
                  </div>
                ),
            )}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && experience[0].company && (
        <section className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gray-800 mr-2"></div>
            <h2 className="text-lg font-bold">Professional Experience</h2>
          </div>
          {experience.map(
            (job, index) =>
              job.company && (
                <div key={index} className="mb-5 pl-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold">
                      {job.position} | {job.company}
                    </h3>
                    <span className="text-sm">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-line">{job.description}</p>
                </div>
              ),
          )}
        </section>
      )}

      {education && education.length > 0 && education[0].institution && (
        <section>
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-gray-800 mr-2"></div>
            <h2 className="text-lg font-bold">Education</h2>
          </div>
          {education.map(
            (edu, index) =>
              edu.institution && (
                <div key={index} className="mb-3 pl-5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold">{edu.institution}</h3>
                    <span className="text-sm">{edu.graduationDate}</span>
                  </div>
                  <p className="text-sm">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                </div>
              ),
          )}
        </section>
      )}
    </div>
  )
}

