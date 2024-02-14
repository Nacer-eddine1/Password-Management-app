from django.db import models
from users.models import User
# Create your models here.
class Passwords(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    app_name = models.CharField(max_length=50)
    link = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    generated_password = models.CharField(max_length=255)