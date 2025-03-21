"use client"

import { useResume } from "@/context/resume-context"

export function ResumePreview() {
  const { resume, activeTemplate } = useResume()

  // This is a simplified preview - in a real app, you would have different template components
  return (
    <div className="p-6 min-h-[600px] text-black">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">
          {resume.personalInfo?.firstName || "First"} {resume.personalInfo?.lastName || "Last"}
        </h1>
        <p className="text-lg">{resume.personalInfo?.title || "Professional Title"}</p>
        <div className="flex justify-center gap-4 text-sm mt-2">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {resume.personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Summary</h2>
          <p>{resume.personalInfo.summary}</p>
        </div>
      )}

      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <p className="font-medium">
                {exp.company}, {exp.location}
              </p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{edu.degree}</h3>
                <span className="text-sm">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
              <p className="font-medium">
                {edu.institution}, {edu.location}
              </p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                {skill.name} {skill.level && `(${skill.level})`}
              </span>
            ))}
          </div>
        </div>
      )}

      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm mt-1">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.split(",").map((tech, i) => (
                    <span key={i} className="bg-gray-100 px-1 rounded text-xs">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Certifications</h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold">{cert.name}</h3>
              <p className="text-sm">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          ))}
        </div>
      )}

      {resume.languages && resume.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {resume.languages.map((lang, index) => (
              <div key={index}>
                <span className="font-medium">{lang.language}</span>
                {lang.proficiency && <span className="text-sm ml-1">({lang.proficiency})</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

