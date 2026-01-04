import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

# Update Python course
python_courses = Course.objects.filter(title__icontains='Python')
for c in python_courses:
    print(f"Updating {c.title} from {c.price} to 39.00")
    c.price = Decimal('39.00')
    c.save()

# Update free courses
free_courses = Course.objects.filter(price__lte=0) | Course.objects.filter(price__isnull=True)
for c in free_courses:
    print(f"Updating free course {c.title} from {c.price} to 49.99")
    c.price = Decimal('49.99')
    c.save()

print("Price updates complete.")
