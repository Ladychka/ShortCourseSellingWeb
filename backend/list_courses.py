
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

def list_courses():
    courses = Course.objects.all()
    with open("courses_list.txt", "w") as f:
        f.write(f"Found {courses.count()} courses:\n")
        for c in courses:
            f.write(f"ID: {c.id} | Title: {c.title} | Current Image: {c.image}\n")

if __name__ == "__main__":
    list_courses()
