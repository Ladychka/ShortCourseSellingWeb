import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from userauths.models import User

username = "admin"
email = "admin@gmail.com"
password = "password123"

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser created: {email} / {password}")
else:
    print(f"Superuser {email} already exists.")
