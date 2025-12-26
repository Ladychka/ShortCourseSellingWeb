import os
import django
import random
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from userauths.models import User, Profile
from api.models import (
    Teacher, Category, Course, Review, Variant, VariantItem
)

def create_data():
    print("Creating data...")
    
    # 1. Create Superuser (Admin)
    if not User.objects.filter(email='admin@gmail.com').exists():
        admin = User.objects.create_superuser(
            username='admin', 
            email='admin@gmail.com', 
            password='password123',
            full_name='Admin User'
        )
        print("Superuser created: admin@gmail.com")
    else:
        admin = User.objects.get(email='admin@gmail.com')

    # 2. Create Teacher User
    if not User.objects.filter(email='teacher@gmail.com').exists():
        teacher_user = User.objects.create_user(
            username='teacher', 
            email='teacher@gmail.com', 
            password='password123',
            full_name='John Teacher'
        )
        print("Teacher user created: teacher@gmail.com")
    else:
        teacher_user = User.objects.get(email='teacher@gmail.com')

    # 3. Create Student User
    if not User.objects.filter(email='student@gmail.com').exists():
        student_user = User.objects.create_user(
            username='student', 
            email='student@gmail.com', 
            password='password123',
            full_name='Jane Student'
        )
        print("Student user created: student@gmail.com")
    else:
        student_user = User.objects.get(email='student@gmail.com')

    # 4. Create Teacher Profile
    teacher_profile, created = Teacher.objects.get_or_create(
        user=teacher_user,
        defaults={
            'full_name': teacher_user.full_name,
            'bio': 'Experienced web developer and instructor.',
            'about': 'I have been teaching for 10 years...',
            'country': 'USA'
        }
    )

    # 5. Create Categories
    categories = ['Web Development', 'Data Science', 'Mobile Apps', 'UI/UX Design']
    cat_objs = []
    for cat in categories:
        c, _ = Category.objects.get_or_create(title=cat, defaults={'active': True})
        cat_objs.append(c)
    
    # 6. Create Courses
    for i in range(5):
        course = Course.objects.create(
            category=random.choice(cat_objs),
            teacher=teacher_profile,
            title=f"Complete Course on {random.choice(categories)} #{i+1}",
            description="This is a comprehensive course covering all aspects...",
            price=random.choice([19.99, 49.99, 99.99]),
            level='Beginner',
            platform_status='Published',
            teacher_status='Published',
            featured=True,
            language='English'
        )
        # Add basic curriculum
        variant = Variant.objects.create(course=course, title="Introduction")
        VariantItem.objects.create(variant=variant, title="Welcome to the course", duration=timedelta(minutes=5))
        
        # Add Review
        Review.objects.create(
            user=student_user,
            course=course,
            rating=random.randint(4, 5),
            review="Great course! Highly recommended.",
            active=True
        )
        print(f"Created Course: {course.title}")

    print("Data population complete.")

if __name__ == '__main__':
    create_data()
