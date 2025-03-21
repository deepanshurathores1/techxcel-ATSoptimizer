"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { Document, Paragraph, TextRun } from "docx";

interface WorkExperience {
  position: string;
  company: string;
  from: string;
  to: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  college: string;
  degree: string;
  education: string;
  workExperience: WorkExperience[];
  skills: string;
}

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    }
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: data.fullName, bold: true, size: 28 })] }),
            new Paragraph({
              children: [new TextRun({ text: `${data.email} | ${data.phone} | ${data.address}`, size: 12 })],
            }),
            new Paragraph({ children: [new TextRun({ text: "Professional Summary", bold: true, size: 16 })] }),
            new Paragraph({ children: [new TextRun({ text: data.summary, size: 12 })] }),
            new Paragraph({ children: [new TextRun({ text: "Education", bold: true, size: 16 })] }),
            new Paragraph({ children: [new TextRun({ text: `${data.degree} - ${data.college}`, size: 14 })] }),
            new Paragraph({ children: [new TextRun({ text: data.education, size: 12 })] }),
            new Paragraph({ children: [new TextRun({ text: "Work Experience", bold: true, size: 16 })] }),
            ...data.workExperience.map((exp) => 
              new Paragraph({ children: [
                new TextRun({ text: `${exp.position} at ${exp.company}`, bold: true, size: 14 }),
                new TextRun({ text: ` (${exp.from} - ${exp.to})`, size: 12 }),
                new TextRun({ text: `\n${exp.description}`, size: 12 })
              ]})
            ),
            new Paragraph({ children: [new TextRun({ text: "Skills", bold: true, size: 16 })] }),
            new Paragraph({ children: [new TextRun({ text: data.skills, size: 12 })] }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <div className="space-y-4">
      <div ref={resumeRef} className="w-[150mm] h-[180mm] bg-white p-8 shadow-lg relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-8xl font-bold text-gray-300 opacity-30 rotate-45">
            Not Verified
          </p>
        </div>

        {/* Resume Content */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{data.fullName}</h1>
            <p className="text-gray-600">
              {data.email} | {data.phone} | {data.address}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.summary}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">Education</h2>
            <p className="text-gray-700">
              <strong>{data.degree}</strong> - {data.college}
            </p>
            <p className="text-gray-700">{data.education}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">
              Work Experience
            </h2>
            {data.workExperience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.position} at {exp.company}
                </h3>
                <p className="text-gray-600">
                  {exp.from} - {exp.to}
                </p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2">Skills</h2>
            <p className="text-gray-700">{data.skills}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={downloadPDF} className="flex-1">
          Download PDF
        </Button>
        <Button onClick={downloadDOCX} className="flex-1">
          Download DOCX
        </Button>
      </div>
    </div>
  );
}
