
import os
import django
import requests
from django.core.files.base import ContentFile
from django.utils.text import slugify

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course, Teacher, Category

def create_courses():
    # Ensure we have a teacher and category
    teacher = Teacher.objects.first()
    if not teacher:
        from userauths.models import User, Profile
        user = User.objects.first()
        if not user:
            print("No user found. Create a user first.")
            return
        teacher = Teacher.objects.create(user=user, full_name="Un Vongvechika", designation="Instructor")

    category, _ = Category.objects.get_or_create(title="Development", active=True)

    new_courses = [
        {
            "title": "Angular - The Complete Guide (2025 Edition)",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png",
            "price": 94.99,
            "level": "Intermediate",
            "description": "Master Angular (formerly 'Angular 2') and build awesome, reactive web apps with the successor of Angular.js",
        },
        {
            "title": "TypeScript: The Complete Developer's Guide",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
            "price": 84.99,
            "level": "Beginner",
            "description": "Master TypeScript by learning popular design patterns and building complex projects. Includes React and Express!",
        },
        {
            "title": "MongoDB - The Complete Developer's Guide 2025",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
            "price": 99.99,
            "level": "Advanced",
            "description": "Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!",
        }
    ]

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    for course_data in new_courses:
        # Check if exists
        if Course.objects.filter(title=course_data['title']).exists():
            print(f"Course {course_data['title']} already exists. Skipping.")
            continue

        print(f"Creating course: {course_data['title']}")
        course = Course(
            category=category,
            teacher=teacher,
            title=course_data['title'],
            description=course_data['description'],
            price=course_data['price'],
            level=course_data['level'],
            platform_status='active',
            teacher_status='available',
            featured=True,
            slug=slugify(course_data['title'])
        )
        
        # Download image
        try:
            print(f"Downloading image for {course_data['title']}...")
            response = requests.get(course_data['image_url'], headers=headers)
            if response.status_code == 200:
                file_name = f"course-image/{slugify(course_data['title'])}.png"
                course.image.save(file_name, ContentFile(response.content), save=False)
            else:
                print(f"Failed to download image. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error downloading image: {e}")

        course.save()
        print(f"Saved {course.title}")

if __name__ == '__main__':
    create_courses()
