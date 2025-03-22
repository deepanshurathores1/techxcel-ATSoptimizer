from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

class PDFParserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/pdf-parse/'  # Adjust this URL based on your actual endpoint

    def test_pdf_parsing(self):
        with open('path/to/test.pdf', 'rb') as pdf_file:  # Replace with the path to your test PDF
            response = self.client.post(self.url, {'file': pdf_file}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('extracted_text', response.data)  # Adjust based on your expected response structure
        self.assertIsInstance(response.data['extracted_text'], str)

    def test_invalid_file_type(self):
        response = self.client.post(self.url, {'file': 'not_a_pdf.txt'}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)  # Adjust based on your expected error response structure

    def test_missing_file(self):
        response = self.client.post(self.url, {}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)  # Adjust based on your expected error response structure