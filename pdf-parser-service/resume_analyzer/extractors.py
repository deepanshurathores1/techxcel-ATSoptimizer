from PyPDF2 import PdfReader

def extract_text_from_pdf(pdf_file_path):
    text = ""
    try:
        with open(pdf_file_path, "rb") as file:
            reader = PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return "[Text extraction failed]"
    
    return text.strip() if text else "[No text found in PDF]"