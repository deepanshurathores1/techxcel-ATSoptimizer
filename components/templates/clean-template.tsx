import type { ResumeData } from "@/types/resume"

interface CleanTemplateProps {
  data: ResumeData
}

export default function CleanTemplate({ data }: CleanTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-sans max-w-[800px] mx-auto text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl mb-2">{personalInfo.title}</p>
        <div className="flex justify-center space-x-4 text-sm">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Professional Summary</h2>
        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Experience</h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{job.position}</h3>
            <p className="text-sm italic">
              {job.company} | {job.startDate} - {job.endDate}
            </p>
            <ul className="list-disc list-inside text-sm mt-2">
              {job.description.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">
              {edu.degree} in {edu.fieldOfStudy}
            </h3>
            <p className="text-sm">
              {edu.institution} | {edu.graduationDate}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

