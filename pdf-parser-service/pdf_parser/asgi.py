"""
ASGI configuration for the Django project.

This file allows the Django application to handle asynchronous requests.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pdf_parser.settings')

application = get_asgi_application()
