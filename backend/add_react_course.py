import os
import django
from decimal import Decimal
from django.utils.text import slugify
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course, Category, Teacher, User

try:
    # Ensure we have a category and teacher
    user = User.objects.first()
    if not user:
        print("No user found. Create a superuser first.")
        exit(1)
        
    teacher, _ = Teacher.objects.get_or_create(user=user, defaults={'full_name': 'Admin Teacher'})
    
    cat_title = "Web Development"
    cat_slug = slugify(cat_title)
    
    # Try finding by slug first (most reliable)
    category = Category.objects.filter(slug=cat_slug).first()
    if not category:
        # Try finding by title (case insensitive)
        category = Category.objects.filter(title__iexact=cat_title).first()
        
    if not category:
        # Create if doesn't exist
        category = Category.objects.create(title=cat_title, slug=cat_slug)

    # Check if React exists, if not create it
    course_title = "React - The Complete Guide 2025"
    react_course, created = Course.objects.get_or_create(
        title=course_title,
        defaults={
            "description": "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
            "price": Decimal("49.99"),
            "level": "Beginner",
            "category": category,
            "teacher": teacher,
            "image": "https://geeksui.codescandy.com/geeks/assets/images/course/course-react.jpg",
            "file": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "language": "English",
            "platform_status": "Published",
            "featured": True,
            "slug": slugify(course_title)
        }
    )

    if created:
        print(f"Created course: {react_course.title}")
    else:
        print(f"Course already exists: {react_course.title}")
        # Force update to ensure it's published and featured
        react_course.platform_status = "Published"
        react_course.featured = True
        react_course.save()

    print("Done.")

except Exception:
    with open("error_log.txt", "w") as f:
        traceback.print_exc(file=f)
    print("Error occurred. Check error_log.txt")
