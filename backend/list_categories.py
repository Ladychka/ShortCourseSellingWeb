import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Category

print("--- CATEGORY LIST ---")
cats = Category.objects.all()
for c in cats:
    print(f"ID: {c.id} | Title: {c.title} | Slug: {c.slug} | Active: {c.active}")

print(f"Total: {cats.count()}")
