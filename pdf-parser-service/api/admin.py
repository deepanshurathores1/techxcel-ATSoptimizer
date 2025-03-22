from django.contrib import admin
from .models import PDFDocument, ParsedText  # Importing your actual models

# Register your models with the admin site
@admin.register(PDFDocument)
class PDFDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    search_fields = ('title',)

@admin.register(ParsedText)
class ParsedTextAdmin(admin.ModelAdmin):
    list_display = ('pdf_document',)
    search_fields = ('content',)