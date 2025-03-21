import type { ResumeData } from "@/types/resume"
import { Heart, Award, BookOpen, Stethoscope, Clipboard, Users, Mail, Phone, MapPin, Calendar } from "lucide-react"

interface HealthcareProfessionalTemplateProps {
  data: ResumeData
}

export default function HealthcareProfessionalTemplate({ data }: HealthcareProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  // Healthcare-focused color scheme
  const colors = {
    primary: "#0891B2", // Cyan
    secondary: "#4338CA", // Indigo
    accent: "#059669", // Emerald
    light: "#E0F2FE", // Light cyan
    text: "#1E293B", // Slate
    background: "#ffffff",
  }

  return (
    <div
      className="font-sans"
      style={{
        color: colors.text,
        fontFamily: styles?.fontFamily || "Inter, sans-serif",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
      }}
    >
      {/* Header with medical symbol */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-3/4">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={24} style={{ color: colors.primary }} />
            <h1 className="text-3xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
          </div>
          <h2 className="text-xl mb-3" style={{ color: colors.primary }}>
            {personalInfo.title || "Healthcare Professional"}
          </h2>
          <p className="mb-4">{personalInfo.summary || "Your professional summary goes here..."}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} style={{ color: colors.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/4">
          <div
            className="p-4 rounded-lg text-white h-full flex flex-col justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="text-center">
              <Stethoscope size={28} className="inline-block mb-2" />
              <div className="font-bold">License #12345678</div>
              <div className="text-sm opacity-90">Valid through Dec 2025</div>
              <div className="mt-2 text-sm">Board Certified</div>
              <div className="font-medium">American Board of Medical Specialties</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Experience */}
      <div className="mb-6">
        <h2
          className="text-lg font-bold mb-4 pb-1 border-b-2 flex items-center gap-2"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <Clipboard size={18} /> Clinical Experience
        </h2>
        {experience.map((job, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{job.position}</h3>
                <h4 className="text-base" style={{ color: colors.secondary }}>
                  {job.company}
                </h4>
              </div>
              <div
                className="text-sm px-2 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: colors.light, color: colors.primary }}
              >
                <Calendar size={12} />
                <span>
                  {job.startDate} - {job.endDate}
                </span>
              </div>
            </div>
            <div className="mt-2 whitespace-pre-line">{job.description}</div>

            {/* Clinical metrics for first position */}
            {index === 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="p-2 rounded text-center" style={{ backgroundColor: colors.light }}>
                  <div className="text-sm font-medium">Patient Care</div>
                  <div className="text-base font-bold" style={{ color: colors.primary }}>
                    1,200+ patients
                  </div>
                </div>
                <div className="p-2 rounded text-center" style={{ backgroundColor: colors.light }}>
                  <div className="text-sm font-medium">Procedures</div>
                  <div className="text-base font-bold" style={{ color: colors.primary }}>
                    500+ completed
                  </div>
                </div>
                <div className="p-2 rounded text-center" style={{ backgroundColor: colors.light }}>
                  <div className="text-sm font-medium">Patient Satisfaction</div>
                  <div className="text-base font-bold" style={{ color: colors.primary }}>
                    98% rating
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Three column layout for remaining content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Education & Training */}
        <div>
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <BookOpen size={18} /> Education & Training
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{edu.degree}</h3>
              <div style={{ color: colors.secondary }}>{edu.institution}</div>
              <div className="text-sm">
                {edu.fieldOfStudy} • {edu.graduationDate}
              </div>
            </div>
          ))}

          {/* Residency & Fellowship */}
          <div className="mt-4">
            <h3 className="font-bold mb-2">Residency & Fellowship</h3>
            <div className="mb-2">
              <div className="font-medium">Internal Medicine Residency</div>
              <div className="text-sm">University Hospital • 2018-2021</div>
            </div>
            <div>
              <div className="font-medium">Cardiology Fellowship</div>
              <div className="text-sm">Medical Center • 2021-2023</div>
            </div>
          </div>
        </div>

        {/* Clinical Skills */}
        <div>
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <Stethoscope size={18} /> Clinical Skills
          </h2>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span>{skill.name}</span>
              </div>
            ))}

            {/* Additional clinical skills */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <span>Advanced Cardiac Life Support (ACLS)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <span>Electrocardiogram (ECG) Interpretation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <span>Ventilator Management</span>
            </div>
          </div>

          {/* Technical Skills */}
          <h3 className="font-bold mt-4 mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["Epic EMR", "Cerner", "Telehealth", "Medical Imaging", "Point-of-Care Ultrasound"].map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs"
                style={{ backgroundColor: colors.light, color: colors.primary }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications & Professional Development */}
        <div>
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <Award size={18} /> Certifications
          </h2>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="min-w-[70px] text-sm">2023</div>
              <span>Board Certification in Internal Medicine</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-[70px] text-sm">2022</div>
              <span>Advanced Cardiovascular Life Support</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-[70px] text-sm">2021</div>
              <span>Basic Life Support Instructor</span>
            </li>
          </ul>

          {/* Professional Memberships */}
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2 flex items-center gap-2"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <Users size={18} /> Professional Memberships
          </h2>
          <ul className="space-y-2">
            <li>American Medical Association</li>
            <li>American College of Physicians</li>
            <li>Society of Hospital Medicine</li>
            <li>State Medical Society</li>
          </ul>
        </div>
      </div>

      {/* Publications & Research */}
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
        <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
          Publications & Research
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="min-w-[50px] text-sm">2023</div>
            <span>
              <span className="font-medium">Journal of Medicine</span> - "Novel Approaches to Treating Hypertension in
              Geriatric Patients"
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="min-w-[50px] text-sm">2022</div>
            <span>
              <span className="font-medium">Clinical Research Quarterly</span> - "Effects of Telehealth Interventions on
              Patient Outcomes"
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

