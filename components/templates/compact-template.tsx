import type { ResumeData } from "@/types/resume"

interface CompactTemplateProps {
  data: ResumeData
}

export default function CompactTemplate({ data }: CompactTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-sans max-w-[800px] mx-auto text-gray-800 text-sm">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-lg">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-2 text-xs mt-1">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-1 bg-gray-100 px-2 py-1">Summary</h2>
        <p className="text-xs leading-tight">{personalInfo.summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-1 bg-gray-100 px-2 py-1">Experience</h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <h3 className="font-semibold">{job.position}</h3>
              <span className="text-xs">
                {job.startDate} - {job.endDate}
              </span>
            </div>
            <p className="text-xs italic">{job.company}</p>
            <ul className="list-disc list-inside text-xs mt-1">
              {job.description.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-1 bg-gray-100 px-2 py-1">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-1">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-xs">{edu.graduationDate}</span>
            </div>
            <p className="text-xs">{edu.institution}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1 bg-gray-100 px-2 py-1">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-2 py-0.5 rounded text-xs">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

