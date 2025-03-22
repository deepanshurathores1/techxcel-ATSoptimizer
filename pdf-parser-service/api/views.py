from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from resume_analyzer.extractors import extract_text_from_pdf
import requests
from rest_framework.views import APIView
import PyPDF2
import re
import io
from pdfminer.high_level import extract_text
import logging

logger = logging.getLogger(__name__)

class PDFParserView(APIView):
    def post(self, request):
        if 'pdf_file' not in request.FILES:
            return Response(
                {"error": "No PDF file provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pdf_file = request.FILES['pdf_file']
        
        try:
            # Try multiple PDF extraction methods
            text = self.extract_with_multiple_methods(pdf_file)
            
            # Extract sections
            sections = self.extract_resume_sections(text)
            
            return Response({
                "text": text,
                "sections": sections
            })
            
        except Exception as e:
            logger.exception("PDF parsing failed")
            return Response(
                {"error": f"Failed to process PDF: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def extract_with_multiple_methods(self, pdf_file):
        """Try multiple PDF extraction methods for better results"""
        methods = [self.extract_with_pdfminer, self.extract_with_pypdf2]
        
        # Try each method in turn
        for method in methods:
            try:
                extracted_text = method(pdf_file)
                if extracted_text and len(extracted_text) > 100:
                    return extracted_text
                pdf_file.seek(0)  # Reset file pointer for next method
            except Exception as e:
                logger.warning(f"Extraction method failed: {str(e)}")
                pdf_file.seek(0)  # Reset file pointer for next method
        
        # If all methods fail or return minimal text
        return "Unable to extract meaningful text from this PDF."
    
    def extract_with_pdfminer(self, pdf_file):
        """Extract text using pdfminer.six"""
        return extract_text(pdf_file)
    
    def extract_with_pypdf2(self, pdf_file):
        """Extract text using PyPDF2"""
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    
    def extract_resume_sections(self, text):
        """Extract and categorize resume sections using regex patterns"""
        sections = {
            "contact_info": self.extract_contact_info(text),
            "summary": self.extract_section(text, ["summary", "objective", "profile"]),
            "experience": self.extract_section(text, ["experience", "employment", "work history"]),
            "education": self.extract_section(text, ["education", "academic"]),
            "skills": self.extract_section(text, ["skills", "technical skills", "competencies"])
        }
        return sections
    
    def extract_contact_info(self, text):
        """Extract contact information using regex patterns"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b'
        
        emails = re.findall(email_pattern, text)
        phones = re.findall(phone_pattern, text)
        
        return {
            "email": emails[0] if emails else None,
            "phone": phones[0] if phones else None
        }
    
    def extract_section(self, text, section_names):
        """Extract specific section from resume text"""
        # Make case-insensitive patterns for section headers
        patterns = [
            rf"(?i)({name})[:\s]*\n" for name in section_names
        ]
        
        # Find all section headers and their positions
        matches = []
        for pattern in patterns:
            for match in re.finditer(pattern, text):
                matches.append((match.start(), match.group()))
        
        # If no matches found, return empty string
        if not matches:
            return ""
        
        # Sort matches by position
        matches.sort()
        
        # Extract text for the first matching section
        start_pos = matches[0][0]
        
        # Find the next section, if any
        end_pos = len(text)
        for pos, _ in matches[1:]:
            if pos > start_pos:
                end_pos = pos
                break
        
        section_text = text[start_pos:end_pos].strip()
        return section_text