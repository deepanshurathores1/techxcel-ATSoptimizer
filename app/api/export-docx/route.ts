import { type NextRequest, NextResponse } from "next/server"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx"

export async function POST(request: NextRequest) {
  try {
    const { resumeData, templateName, settings } = await request.json()

    // Create a new document
    const doc = new Document({
      title: `${resumeData.personalInfo.fullName} - Resume`,
      description: resumeData.personalInfo.summary,
      styles: {
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 24,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
              border: {
                bottom: {
                  color: "999999",
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
            },
          },
        ],
      },
    })

    // Header with name and title
    const headerParagraphs = [
      new Paragraph({
        text: resumeData.personalInfo.fullName,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: resumeData.personalInfo.title,
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 200,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
            size: 20,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 400,
        },
      }),
    ]

    // Summary section
    const summaryParagraphs = [
      new Paragraph({
        text: "Professional Summary",
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        text: resumeData.personalInfo.summary,
        spacing: {
          after: 200,
        },
      }),
    ]

    // Experience section
    const experienceParagraphs = [
      new Paragraph({
        text: "Experience",
        heading: HeadingLevel.HEADING_2,
      }),
    ]

    // Add each experience
    resumeData.experience.forEach((job) => {
      experienceParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: job.position,
              bold: true,
              size: 24,
            }),
          ],
          spacing: {
            before: 200,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${job.company} | ${job.startDate} - ${job.endDate}`,
              italics: true,
            }),
          ],
          spacing: {
            after: 100,
          },
        }),
      )

      // Split description into bullet points
      const descriptionPoints = job.description.split("\n")
      descriptionPoints.forEach((point) => {
        if (point.trim()) {
          experienceParagraphs.push(
            new Paragraph({
              text: point.trim().startsWith("•") ? point.trim() : `• ${point.trim()}`,
              bullet: {
                level: 0,
              },
            }),
          )
        }
      })
    })

    // Education section
    const educationParagraphs = [
      new Paragraph({
        text: "Education",
        heading: HeadingLevel.HEADING_2,
        spacing: {
          before: 200,
        },
      }),
    ]

    // Add each education
    resumeData.education.forEach((edu) => {
      educationParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.fieldOfStudy}`,
              bold: true,
              size: 24,
            }),
          ],
          spacing: {
            before: 200,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.institution} | ${edu.graduationDate}`,
              italics: true,
            }),
          ],
          spacing: {
            after: 100,
          },
        }),
      )
    })

    // Skills section
    const skillsParagraphs = [
      new Paragraph({
        text: "Skills",
        heading: HeadingLevel.HEADING_2,
        spacing: {
          before: 200,
        },
      }),
      new Paragraph({
        text: resumeData.skills.map((skill) => skill.name).join(", "),
        spacing: {
          after: 200,
        },
      }),
    ]

    // Custom sections
    const customSectionsParagraphs = []
    if (resumeData.customSections && resumeData.customSections.length > 0) {
      resumeData.customSections.forEach((section) => {
        customSectionsParagraphs.push(
          new Paragraph({
            text: section.title,
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: section.content,
            spacing: {
              after: 200,
            },
          }),
        )
      })
    }

    // Add all sections to the document
    doc.addSection({
      properties: {},
      children: [
        ...headerParagraphs,
        ...summaryParagraphs,
        ...experienceParagraphs,
        ...educationParagraphs,
        ...skillsParagraphs,
        ...customSectionsParagraphs,
      ],
    })

    // Generate the DOCX file
    const buffer = await Packer.toBuffer(doc)

    // Return the DOCX file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${resumeData.personalInfo.fullName || "Resume"}_${templateName}.docx"`,
      },
    })
  } catch (error) {
    console.error("Error generating DOCX:", error)
    return NextResponse.json({ error: "Failed to generate DOCX file" }, { status: 500 })
  }
}

