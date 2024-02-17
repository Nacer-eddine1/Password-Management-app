from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Passwords
from .serializers import PasswordSerializer
from users.models import User

@api_view(['GET'])
def get_passwords(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    passwords = Passwords.objects.filter(user=user)
    serializer = PasswordSerializer(passwords, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_password(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PasswordSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_password(request, user_id, password_id):
    try:
        user = User.objects.get(id=user_id)
        password = Passwords.objects.get(id=password_id, user=user)
    except (User.DoesNotExist, Passwords.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PasswordSerializer(password, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_password(request, user_id, password_id):
    try:
        user = User.objects.get(id=user_id)
        password = Passwords.objects.get(id=password_id, user=user)
    except (User.DoesNotExist, Passwords.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    password.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
