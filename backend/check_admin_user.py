
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from userauths.models import User

email = "LadychkaTheCeo@gmail.com"

print(f"Checking for user with email: {email}")

try:
    user = User.objects.get(email=email)
    print(f"User found!")
    print(f"  Username: {user.username}")
    print(f"  Email: {user.email}")
    print(f"  Is Staff: {user.is_staff}")
    print(f"  Is Superuser: {user.is_superuser}")
    print(f"  Is Active: {user.is_active}")
    print(f"  Password set: {user.has_usable_password()}")
except User.DoesNotExist:
    print("User not found.")
    
    # Optional: check if any superusers exist
    superusers = User.objects.filter(is_superuser=True)
    if superusers.exists():
        print(f"\nExisting superusers: {[u.email for u in superusers]}")
    else:
        print("\nNo superusers found in the database.")
