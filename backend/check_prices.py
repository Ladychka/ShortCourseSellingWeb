import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

courses = Course.objects.all()
for c in courses:
    print(f"ID: {c.id} | Title: {c.title} | Price: {c.price}")
