
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from userauths.models import User

email_db = "LadychkaTheCEO@gmail.com" # The one found in DB
new_password = "ladychka16112005"

try:
    user = User.objects.get(email=email_db)
    user.set_password(new_password)
    user.save()
    print(f"Password for {email_db} has been reset to '{new_password}'.")
except User.DoesNotExist:
    print(f"User {email_db} not found.")
