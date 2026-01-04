import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

print("--- COURSE LIST ---")
titles = list(Course.objects.values_list('title', flat=True))
for t in titles:
    print(t)
print(f"--- TOTAL: {len(titles)} ---")
