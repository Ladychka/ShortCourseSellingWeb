from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    # Removed unique constraint to avoid IntegrityError when empty / duplicated auto values
    full_name = models.CharField(max_length=100, blank=True, null=True)
    otp = models.CharField(max_length=100, null=True)
    refresh_token = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if self.email:
            email_username = self.email.split('@')[0]
            if not self.full_name:
                # Correct assignment (was ==)
                self.full_name = email_username
            if not self.username:
                self.username = email_username
        super(User, self).save(*args, **kwargs)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="user_folder", default='default_profile_picture.png', blank=True, null=True)
    country = models.CharField(max_length=100, unique=True, blank=True, null=True)
    about = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.user.full_name:
            return str(self.user.full_name)
        else:
            return str(self.user.email)
        

    def save(self, *args, **kwargs):
        # No full_name field on Profile; ensure safe save
        super(Profile, self).save(*args, **kwargs)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    # Ensure profile exists then save
    if hasattr(instance, 'profile'):
        instance.profile.save()

# Connect signals once at import time
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
