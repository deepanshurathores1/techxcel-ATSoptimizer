from django.urls import path
from .views import PDFParserView

urlpatterns = [
    path('parse-pdf/', PDFParserView.as_view(), name='parse-pdf'),
]