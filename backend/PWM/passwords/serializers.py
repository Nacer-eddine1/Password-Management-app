from rest_framework import serializers
from .models import Passwords

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passwords
        fields = ['id', 'title', 'app_name', 'link', 'username', 'generated_password']
