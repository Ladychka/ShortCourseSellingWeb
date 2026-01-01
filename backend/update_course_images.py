
import os
import requests
import django
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Course

# Map titles (lowercase) to image URLs
IMAGE_MAP = {
    'react': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    'java script': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png',
    'html': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png',
    'css': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/363px-CSS3_logo_and_wordmark.svg.png',
    'python': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
    'django': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Django_logo.svg/1200px-Django_logo.svg.png',
    'ux/ui': 'https://cdn-icons-png.flaticon.com/512/5202/5202998.png',
    'flutter': 'https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png',
    'dart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dart-logo.png/600px-Dart-logo.png',
    'swift': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/1200px-Swift_logo.svg.png',
    'java': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Java_Black_icon.svg/1200px-Java_Black_icon.svg.png',
}

def update_images():
    courses = Course.objects.all()
    for course in courses:
        key = course.title.lower().strip()
        if key in IMAGE_MAP:
            url = IMAGE_MAP[key]
            print(f"Updating {course.title} with image from {url}...")
            try:
                response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
                response.raise_for_status()
                
                # Determine extension
                ext = 'png'
                if 'jpg' in url or 'jpeg' in url:
                    ext = 'jpg'
                
                file_name = f"{key.replace(' ', '_').replace('/', '_')}.{ext}"
                
                course.image.save(file_name, ContentFile(response.content), save=True)
                print(f"Success: {course.title}")
            except Exception as e:
                print(f"Failed to update {course.title}: {e}")
        else:
            print(f"No mapping for {course.title}")

if __name__ == "__main__":
    update_images()
