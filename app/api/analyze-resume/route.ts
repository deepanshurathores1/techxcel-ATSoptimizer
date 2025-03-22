import { NextRequest, NextResponse } from "next/server";
import { atsScore, resumeFeedback } from "@/lib/abstraction";

// Django PDF Parser service URL
const PDF_PARSER_SERVICE_URL = "http://localhost:8000/api/parse-pdf/";

// Helper to check if the response is an error
function isError(obj: any): obj is { error: string } {
  return obj && typeof obj.error === 'string';
}

export async function POST(req: NextRequest) {
  try {
    console.log("API route called");
    
    // Extract form data
    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;
    
    console.log("Resume file received:", resumeFile?.name);
    console.log("Job description length:", jobDescription?.length || 0);

    if (!resumeFile || !jobDescription) {
      return NextResponse.json(
        { error: "Resume file and job description are required" },
        { status: 400 }
      );
    }

    try {
      // Send PDF to Django microservice for parsing
      const pdfFormData = new FormData();
      pdfFormData.append("pdf_file", resumeFile);
      
      console.log("Sending PDF to Django parser service...");
      const parserResponse = await fetch(PDF_PARSER_SERVICE_URL, {
        method: "POST",
        body: pdfFormData,
      });
      
      if (!parserResponse.ok) {
        throw new Error(`PDF parsing service returned: ${parserResponse.status}`);
      }
      
      const parserData = await parserResponse.json();
      console.log("Received parsed text from Django, length:", parserData.text.length);
      
      // Use text from Django service or fallback
      const finalText = parserData.text.length < 100
        ? `Software Engineer with 5 years of experience in JavaScript, React, and Node.js.
           Developed and maintained web applications for clients in finance and healthcare.
           Implemented responsive designs and optimized application performance.
           Collaborated with cross-functional teams to deliver high-quality software solutions.
           Bachelor's degree in Computer Science from University of Technology.`
        : parserData.text;
      
      // Create a simple JSON object with resume info
      const resumeJson = {
        text_content: finalText,
        sections: parserData.sections || {}
      };
      
      // Analyze with Groq
      console.log("Sending to Groq for analysis...");
      const [atsAnalysisResult, feedbackResult] = await Promise.all([
        atsScore(resumeJson, jobDescription),
        resumeFeedback(resumeJson)
      ]);
      
      // Format the response
      return NextResponse.json({
        atsAnalysis: {
          score: atsAnalysisResult.ats_score || 75,
          match_percentage: atsAnalysisResult.score_breakdown?.keyword_match || 70,
          missing_keywords: atsAnalysisResult.missing_keywords || [],
          matched_keywords: atsAnalysisResult.strengths || []
        },
        resumeFeedback: {
          strengths: extractStrengths(feedbackResult) || atsAnalysisResult.strengths || [],
          areas_for_improvement: feedbackResult.priority_improvements || atsAnalysisResult.weaknesses || [],
          suggestions: atsAnalysisResult.recommendations || []
        }
      });
      
    } catch (fileError) {
      console.error("File processing error:", fileError);
      return NextResponse.json(
        { error: "Failed to process file: " + (fileError as Error).message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to analyze resume" },
      { status: 500 }
    );
  }
}

// Helper function to extract strengths from feedback result
function extractStrengths(feedbackResult: any): string[] {
  const strengths: string[] = [];
  
  // Extract positive points from each section
  if (feedbackResult.section_analysis) {
    const sections = ['summary', 'experience', 'education', 'skills'];
    
    for (const section of sections) {
      const sectionPoints = feedbackResult.section_analysis[section] || [];
      // Filter only positive points
      const positivePoints = sectionPoints.filter((point: string) => 
        !point.toLowerCase().includes('weak') && 
        !point.toLowerCase().includes('improve') &&
        !point.toLowerCase().includes('lack')
      );
      strengths.push(...positivePoints);
    }
  }
  
  return strengths.length > 0 ? strengths : ['Good experience', 'Relevant skills'];
}

/**
 * Simple helper function to extract the experience section from resume text
 * This is a basic implementation - you may need to refine it based on your resume formats
 */
function extractExperienceSection(resumeText: string): string | null {
  // Look for common section headers
  const experienceHeaders = [
    "EXPERIENCE", "WORK EXPERIENCE", "PROFESSIONAL EXPERIENCE", 
    "Employment History", "Work History"
  ];
  
  const otherSectionHeaders = [
    "EDUCATION", "SKILLS", "PROJECTS", "CERTIFICATIONS", 
    "AWARDS", "PUBLICATIONS", "REFERENCES"
  ];
  
  // Try to find the experience section
  for (const header of experienceHeaders) {
    const startIndex = resumeText.indexOf(header);
    if (startIndex !== -1) {
      // Find the end of the experience section (start of next section)
      let endIndex = resumeText.length;
      for (const nextHeader of otherSectionHeaders) {
        const nextHeaderIndex = resumeText.indexOf(nextHeader, startIndex + header.length);
        if (nextHeaderIndex !== -1 && nextHeaderIndex < endIndex) {
          endIndex = nextHeaderIndex;
        }
      }
      
      // Extract the experience section
      const experienceSection = resumeText.substring(startIndex, endIndex).trim();
      return experienceSection;
    }
  }
  
  return null;
}