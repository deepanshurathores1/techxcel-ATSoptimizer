# pdf-parser-service/pdf-parser-service/README.md

# PDF Parser Service

This project is a Django-based microservice designed for parsing PDF files. It provides an API for extracting text from PDF documents and analyzing resumes against job descriptions using AI models.

## Project Structure

- **pdf_parser/**: Contains the main Django project files.
  - **asgi.py**: ASGI configuration for handling asynchronous requests.
  - **settings.py**: Configuration settings for the Django project.
  - **urls.py**: URL routing for the Django project.
  - **wsgi.py**: WSGI configuration for serving HTTP requests.

- **api/**: Contains the Django app for the API.
  - **admin.py**: Register models with the Django admin site.
  - **models.py**: Defines the data models for the application.
  - **serializers.py**: Serializers for converting model instances to JSON.
  - **views.py**: View functions or classes that handle requests and return responses.
  - **urls.py**: URL routing for the API application.

- **resume_analyzer/**: Contains logic for analyzing resumes.
  - **extractors.py**: Functions for extracting text from PDF files.
  - **ai_clients.py**: Functions for interacting with AI services.
  - **analyzers.py**: Functions for analyzing resumes based on extracted text.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pdf-parser-service
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up the database:
   ```
   python manage.py migrate
   ```

4. Run the development server:
   ```
   python manage.py runserver
   ```

## Usage

- The API provides endpoints for uploading PDF files and receiving parsed text.
- You can analyze resumes by sending the extracted text along with job descriptions to the appropriate endpoints.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.