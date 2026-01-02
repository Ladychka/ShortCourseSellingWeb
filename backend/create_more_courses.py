
import os
import random
import requests
import django
from django.core.files.base import ContentFile
from django.utils import timezone
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course, Teacher, Category, User

# Data for new courses
NEW_COURSES = [
    {
        "title": "Machine Learning A-Z",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
        "price": 99.99,
        "level": "Advanced",
        "language": "English"
    },
    {
        "title": "Vue.js 3: The Complete Guide",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
        "price": 49.99,
        "level": "Intermediate",
        "language": "English"
    },
    {
        "title": "Go: The Complete Developer's Guide",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png",
        "price": 89.99,
        "level": "Intermediate",
        "language": "English"
    },
    {
        "title": "Docker & Kubernetes: The Practical Guide",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/1200px-Docker_%28container_engine%29_logo.svg.png",
        "price": 109.99,
        "level": "Advanced",
        "language": "English"
    }
]

def create_courses():
    # Ensure we have a teacher and category
    user = User.objects.first()
    teacher, _ = Teacher.objects.get_or_create(user=user, defaults={"full_name": "Demo Instructor"})
    category, _ = Category.objects.get_or_create(title="Development", defaults={"active": True})

    for data in NEW_COURSES:
        print(f"Creating course: {data['title']}")
        course, created = Course.objects.get_or_create(
            title=data['title'],
            defaults={
                "teacher": teacher,
                "category": category,
                "description": f"Learn {data['title']} in this comprehensive course.",
                "price": data['price'],
                "level": data['level'],
                "language": data['language'],
                "platform_status": "active",
                "teacher_status": "available",
                "featured": True,
                "date": timezone.now()
            }
        )
        
        if created:
            print(f" - Created new entry. Downloading image...")
            try:
                response = requests.get(data['image_url'], headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
                response.raise_for_status()
                
                ext = 'png'
                if 'jpg' in data['image_url'] or 'jpeg' in data['image_url']:
                    ext = 'jpg'
                
                file_name = f"{data['title'].replace(' ', '_').replace('/', '_').replace(':', '')}.{ext}"
                course.image.save(file_name, ContentFile(response.content), save=True)
                print(f" - Image saved.")
            except Exception as e:
                print(f" - Failed to download image: {e}")
        else:
            print(f" - Course already exists. Ensuring it is featured.")
            course.featured = True
            course.save()

if __name__ == "__main__":
    create_courses()
