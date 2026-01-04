import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

# Search for React
react_courses = Course.objects.filter(title__icontains='React')
print(f"Found {react_courses.count()} courses with 'React' in title:")
for c in react_courses:
    print(f"- {c.title} (ID: {c.id}, Status: {c.level})")

# Print all courses to see what we have
print("\nAll Courses:")
for c in Course.objects.all():
    print(f"- {c.title}")
