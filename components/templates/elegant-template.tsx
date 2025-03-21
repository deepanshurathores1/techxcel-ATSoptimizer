import type { ResumeData } from "@/types/resume"

interface ElegantTemplateProps {
  data: ResumeData
}

export default function ElegantTemplate({ data }: ElegantTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-serif max-w-[800px] mx-auto text-gray-800">
      <header className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-light mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl italic mb-4">{personalInfo.title}</p>
        <div className="flex justify-center space-x-4 text-sm">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-light mb-3 border-b border-gray-300 pb-1">Professional Summary</h2>
        <p className="text-sm leading-relaxed italic">{personalInfo.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-light mb-3 border-b border-gray-300 pb-1">Experience</h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{job.position}</h3>
            <p className="text-sm italic mb-1">
              {job.company} | {job.startDate} - {job.endDate}
            </p>
            <ul className="list-disc list-inside text-sm">
              {job.description.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-light mb-3 border-b border-gray-300 pb-1">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-lg font-semibold">
              {edu.degree} in {edu.fieldOfStudy}
            </h3>
            <p className="text-sm italic">
              {edu.institution} | {edu.graduationDate}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-light mb-3 border-b border-gray-300 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="border border-gray-300 px-3 py-1 rounded-full text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

