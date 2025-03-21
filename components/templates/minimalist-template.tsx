import type { ResumeData } from "@/types/resume"

interface MinimalistTemplateProps {
  data: ResumeData
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-sans max-w-[800px] mx-auto text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName}</h1>
        <p className="text-lg mb-2">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-300">Summary</h2>
        <p className="text-sm">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-300">Experience</h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold">{job.position}</h3>
              <span className="text-sm">
                {job.startDate} - {job.endDate}
              </span>
            </div>
            <p className="text-sm mb-1">{job.company}</p>
            <ul className="list-disc list-inside text-sm">
              {job.description.split("\n").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-300">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <span className="text-sm">{edu.graduationDate}</span>
            </div>
            <p className="text-sm">{edu.institution}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-300">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

