from django.db import models

class PDFDocument(models.Model):
    title = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='pdfs/')

    def __str__(self):
        return self.title

class ParsedText(models.Model):
    pdf_document = models.ForeignKey(PDFDocument, related_name='parsed_texts', on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return f'Parsed text for {self.pdf_document.title}'