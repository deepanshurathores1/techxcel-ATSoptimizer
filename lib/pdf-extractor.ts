import { NextRequest } from "next/server";

const PARSIO_API_KEY = "0ow4z1f6tht7irhx041gqml8spc14aug6zlwh6td160rsouv";
const PARSIO_MAILBOX_ID = "pdfparse.86742@io.parsio.io"; // Replace with your actual mailbox ID

/**
 * Extracts text from a PDF buffer
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    // Simple text extraction approach
    return enhancedTextExtraction(pdfBuffer);
  } catch (err) {
    console.error('Error in PDF extraction:', err);
    return '[Text extraction failed]';
  }
}

/**
 * Enhanced text extraction with better PDF cleanup
 */
function enhancedTextExtraction(pdfBuffer: Buffer): string {
  try {
    const textDecoder = new TextDecoder('utf-8');
    let text = textDecoder.decode(pdfBuffer);
    
    // More aggressive PDF cleanup
    text = text
      .replace(/%PDF-[0-9.]+/g, '') // Remove PDF header
      .replace(/<<\/[^>]+>>/g, '')  // Remove PDF dictionary objects
      .replace(/endobj|obj|stream|endstream/g, ' ') // Remove PDF structure keywords
      .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars
      .replace(/\\[0-9]{3}/g, ' ')  // Remove octal codes
      .replace(/(\r\n|\n|\r)/gm, "\n") // Normalize line breaks
      .replace(/\s+/g, ' ') // Collapse whitespace
      .trim();
    
    // If text still has too many non-text characters, use a placeholder
    const textCharRatio = text.replace(/[^a-zA-Z0-9\s.,;:()!?-]/g, '').length / text.length;
    if (textCharRatio < 0.7) {
      return "Unable to extract readable text from this PDF. Please try a different file format.";
    }
    
    return text;
  } catch (error) {
    console.error('Enhanced text extraction failed:', error);
    return '[Text extraction failed]';
  }
}