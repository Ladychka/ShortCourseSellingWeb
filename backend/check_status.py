import os
import django
from django.db.models import Count

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

print("--- COURSE STATUS CHECK ---")
status_counts = Course.objects.values('platform_status').annotate(count=Count('id'))
for s in status_counts:
    print(f"Status '{s['platform_status']}': {s['count']} courses")

print("\n--- SAMPLE COURSES ---")
for c in Course.objects.all()[:5]:
     print(f"Title: {c.title} | Status: {c.platform_status}")
