import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Function to generate and download PDF
export const generateResumePdf = (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found for PDF generation");
    return;
  }

  const opt = {
    margin: 10,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().from(element).set(opt).save();
};

// Function to generate and download DOCX
export const generateResumeDocx = (resumeData: any, fileName: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.fullName,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.title,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Email: ${resumeData.personalInfo.email} | Phone: ${resumeData.personalInfo.phone} | Location: ${resumeData.personalInfo.location}`,
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Summary",
                bold: true,
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.summary,
                size: 18,
              }),
            ],
          }),
          // Add more sections for experience, education, skills, etc.
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.docx`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
};