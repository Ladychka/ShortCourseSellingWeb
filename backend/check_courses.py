import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Course

print(f"Total Courses: {Course.objects.count()}")
print(f"Active/Available Courses: {Course.objects.filter(platform_status='active', teacher_status='available').count()}")
print("Sample statuses:")
for c in Course.objects.all()[:5]:
    print(f"{c.title}: platform={c.platform_status}, teacher={c.teacher_status}")
