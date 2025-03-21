import type { ResumeData } from "@/types/resume"

export default function CybersecurityTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, customSections, styles } = data

  return (
    <div
      className="font-mono bg-slate-900 text-slate-200 p-6"
      style={{
        fontFamily: styles?.fontFamily || "Consolas, monospace",
        fontSize: `${styles?.fontSize || 12}px`,
        lineHeight: styles?.lineHeight || 1.5,
      }}
    >
      {/* Terminal-style header */}
      <header className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
        <div className="bg-slate-800 p-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center flex-grow text-slate-400 text-sm">security_profile.sh</div>
        </div>
        <div className="p-4 bg-slate-950">
          <div className="flex items-center mb-2">
            <span className="text-green-400">root@security:~$</span>
            <span className="ml-2 text-slate-300">./display_profile.sh</span>
          </div>
          <div className="mb-2">
            <span className="text-green-400">[+]</span> <span className="text-slate-300">Name:</span>{" "}
            <span className="text-white font-bold">{personalInfo.fullName}</span>
          </div>
          <div className="mb-2">
            <span className="text-green-400">[+]</span> <span className="text-slate-300">Role:</span>{" "}
            <span className="text-white">{personalInfo.title}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-green-400">[+]</span> <span className="text-slate-300">Email:</span>{" "}
              <span className="text-white">{personalInfo.email}</span>
            </div>
            <div>
              <span className="text-green-400">[+]</span> <span className="text-slate-300">Phone:</span>{" "}
              <span className="text-white">{personalInfo.phone}</span>
            </div>
            <div>
              <span className="text-green-400">[+]</span> <span className="text-slate-300">Location:</span>{" "}
              <span className="text-white">{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content in terminal style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div>
          {/* Security profile */}
          {!styles?.hiddenSections?.includes("summary") && personalInfo.summary && (
            <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
              <div className="bg-slate-800 p-2">
                <div className="text-slate-300 font-bold flex items-center">
                  <span className="text-green-400 mr-2">[SYS]</span> SECURITY PROFILE
                </div>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="text-slate-300 whitespace-pre-line font-mono">
                  <span className="text-green-400">$</span> cat security_profile.txt
                  <br />
                  {personalInfo.summary}
                </div>
              </div>
            </section>
          )}

          {/* Technical security skills */}
          {!styles?.hiddenSections?.includes("skills") && skills.length > 0 && (
            <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
              <div className="bg-slate-800 p-2">
                <div className="text-slate-300 font-bold flex items-center">
                  <span className="text-green-400 mr-2">[SYS]</span> TECHNICAL SKILLS
                </div>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="text-slate-300">
                  <span className="text-green-400">$</span> ls -la /usr/skills/
                  <br />
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-400 mr-2">[+]</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-green-300 font-bold mr-2 w-8 text-center">
                          {Math.floor(Math.random() * 90) + 10}%
                        </span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Certifications */}
          <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
            <div className="bg-slate-800 p-2">
              <div className="text-slate-300 font-bold flex items-center">
                <span className="text-green-400 mr-2">[SYS]</span> CERTIFICATIONS
              </div>
            </div>
            <div className="p-4 bg-slate-950">
              <div className="text-slate-300">
                <span className="text-green-400">$</span> cat /etc/certs.conf
                <br />
                <div className="space-y-2 mt-2">
                  <div className="bg-slate-800 p-2 rounded border-l-2 border-green-400">
                    <div className="font-bold">CISSP (Certified Information Systems Security Professional)</div>
                    <div className="text-sm text-slate-400">ISC², 2023-Present</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded border-l-2 border-green-400">
                    <div className="font-bold">CEH (Certified Ethical Hacker)</div>
                    <div className="text-sm text-slate-400">EC-Council, 2022-Present</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded border-l-2 border-green-400">
                    <div className="font-bold">CompTIA Security+</div>
                    <div className="text-sm text-slate-400">CompTIA, 2021-Present</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          {!styles?.hiddenSections?.includes("education") && education.length > 0 && (
            <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
              <div className="bg-slate-800 p-2">
                <div className="text-slate-300 font-bold flex items-center">
                  <span className="text-green-400 mr-2">[SYS]</span> EDUCATION
                </div>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="text-slate-300">
                  <span className="text-green-400">$</span> find /education/ -type f -name "*.edu" | xargs cat
                  <br />
                  <div className="space-y-3 mt-2">
                    {education.map((edu, index) => (
                      <div key={index} className="bg-slate-800 p-2 rounded">
                        <div className="font-bold">{edu.institution}</div>
                        <div className="text-sm text-slate-400">{edu.graduationDate}</div>
                        <div>
                          {edu.degree}
                          {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div>
          {/* Security experience */}
          {!styles?.hiddenSections?.includes("experience") && experience.length > 0 && (
            <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
              <div className="bg-slate-800 p-2">
                <div className="text-slate-300 font-bold flex items-center">
                  <span className="text-green-400 mr-2">[SYS]</span> SECURITY EXPERIENCE
                </div>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="text-slate-300">
                  <span className="text-green-400">$</span> cat /var/log/experience.log
                  <br />
                  <div className="space-y-4 mt-2">
                    {experience.map((job, index) => (
                      <div key={index} className="bg-slate-800 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-green-300">{job.position}</div>
                          <div className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                            {job.startDate} - {job.endDate}
                          </div>
                        </div>
                        <div className="text-slate-400 mb-2">{job.company}</div>

                        {/* Format job description as command outputs */}
                        <div className="space-y-1 text-sm">
                          {job.description.split("\n").map((line, i) =>
                            line.trim() ? (
                              <div key={i} className="flex">
                                <span className="text-green-400 mr-2">$</span>
                                <p>{line}</p>
                              </div>
                            ) : null,
                          )}
                        </div>

                        {/* Security metrics */}
                        <div className="mt-3 pt-2 border-t border-slate-700">
                          <div className="text-xs text-slate-400 mb-1">Security Metrics:</div>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="bg-slate-900 p-1 rounded border border-slate-700">
                              <div className="text-green-400 font-bold">{Math.floor(Math.random() * 100) + 50}</div>
                              <div className="text-slate-500">Vulnerabilities Patched</div>
                            </div>
                            <div className="bg-slate-900 p-1 rounded border border-slate-700">
                              <div className="text-green-400 font-bold">{Math.floor(Math.random() * 10) + 1}</div>
                              <div className="text-slate-500">Security Frameworks</div>
                            </div>
                            <div className="bg-slate-900 p-1 rounded border border-slate-700">
                              <div className="text-green-400 font-bold">{Math.floor(Math.random() * 20) + 5}</div>
                              <div className="text-slate-500">Incidents Resolved</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Security tools */}
          <section className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
            <div className="bg-slate-800 p-2">
              <div className="text-slate-300 font-bold flex items-center">
                <span className="text-green-400 mr-2">[SYS]</span> SECURITY TOOLS
              </div>
            </div>
            <div className="p-4 bg-slate-950">
              <div className="text-slate-300">
                <span className="text-green-400">$</span> ls -la /opt/security/
                <br />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Wireshark</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Metasploit</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Nmap</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Burp Suite</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Kali Linux</div>
                  </div>
                  <div className="bg-slate-800 p-2 rounded text-center">
                    <div className="text-green-300 font-bold">Splunk</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Custom sections */}
          {customSections.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-6 border border-slate-600 rounded-lg overflow-hidden">
              <div className="bg-slate-800 p-2">
                <div className="text-slate-300 font-bold flex items-center">
                  <span className="text-green-400 mr-2">[SYS]</span> {section.title.toUpperCase()}
                </div>
              </div>
              <div className="p-4 bg-slate-950">
                <div className="text-slate-300">
                  <span className="text-green-400">$</span> cat /etc/{section.title.toLowerCase().replace(/\s+/g, "_")}
                  .txt
                  <br />
                  <div className="mt-2 whitespace-pre-line">{section.content}</div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Terminal footer */}
      <footer className="mt-6 border border-slate-600 rounded-lg overflow-hidden">
        <div className="p-2 bg-slate-950 text-center">
          <span className="text-green-400">root@security:~$</span>{" "}
          <span className="text-slate-300">echo "Securing systems, protecting data, enabling business."</span>
        </div>
      </footer>
    </div>
  )
}

