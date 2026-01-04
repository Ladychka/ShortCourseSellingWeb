import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

# Find the React course
try:
    c = Course.objects.get(title="React - The Complete Guide 2025")
    print(f"Current status: {c.platform_status}")
    c.platform_status = "active"
    c.save()
    print(f"New status: {c.platform_status}")
except Course.DoesNotExist:
    print("Course not found!")
