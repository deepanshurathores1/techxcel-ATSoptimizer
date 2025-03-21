import type { ResumeData } from "@/types/resume"

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="font-sans max-w-[800px] mx-auto flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3 bg-gray-100 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-lg text-gray-700 mb-4">{personalInfo.title || "Professional Title"}</p>
          <div className="space-y-2">
            {personalInfo.phone && (
              <p className="text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.email && (
              <p className="text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {personalInfo.email}
              </p>
            )}
            {personalInfo.location && (
              <p className="text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {personalInfo.location}
              </p>
            )}
          </div>
        </div>

        {skills && skills.length > 0 && skills[0].name && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Skills</h2>
            <div className="space-y-2">
              {skills.map(
                (skill, index) =>
                  skill.name && (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {education && education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">Education</h2>
            {education.map(
              (edu, index) =>
                edu.institution && (
                  <div key={index} className="mb-4">
                    <h3 className="text-base font-bold">{edu.institution}</h3>
                    <p className="text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-xs text-gray-600">{edu.graduationDate}</p>
                  </div>
                ),
            )}
          </div>
        )}
      </div>

      <div className="md:w-2/3 p-6">
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-3 border-b border-gray-300 pb-1">Profile</h2>
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience && experience.length > 0 && experience[0].company && (
          <section>
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-1">Work Experience</h2>
            {experience.map(
              (job, index) =>
                job.company && (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold">{job.position}</h3>
                      <span className="text-sm text-gray-600">
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p className="text-base italic mb-2">{job.company}</p>
                    <p className="text-sm whitespace-pre-line">{job.description}</p>
                  </div>
                ),
            )}
          </section>
        )}
      </div>
    </div>
  )
}

