declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  function parse(dataBuffer: Buffer, options?: Record<string, any>): Promise<PDFData>;
  
  // Also export the default function
  export default parse;
  // Export parseBuffer which is used in your code
  export const parseBuffer: typeof parse;
}