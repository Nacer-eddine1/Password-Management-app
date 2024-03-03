from venv import logger
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Passwords
from .serializers import PasswordSerializer
from users.models import User
import jwt
import logging

@api_view(['GET'])
def get_passwords(request):
    # Extract the JWT token from the request header
    token = request.headers.get('Authorization', '').split(' ')[1]
    try:
        # Decode the JWT token to extract the payload
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('id')

        # Retrieve the user from the database using the user_id from the payload
        user = User.objects.get(id=user_id)

        # Query passwords for the authenticated user
        passwords = Passwords.objects.filter(user=user)
        serializer = PasswordSerializer(passwords, many=True)
        return Response(serializer.data)
    except jwt.ExpiredSignatureError:
        print("Expired")
        return Response({"detail": "Expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        print("Invalid")
        return Response({"detail": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def create_password(request):
    token = request.headers.get('Authorization', '').split(' ')[1]
    logger.debug("Token extracted from header: %s", token)
    try:
        # Extract the JWT token from the request header

        # Decode the JWT token to extract the payload
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('id')

        # Retrieve the user from the database using the user_id from the payload
        user = User.objects.get(id=user_id)

        # Save the password data with the associated user
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except jwt.ExpiredSignatureError:
        return Response({"detail": "Expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({"detail": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_password(request, password_id):
    try:
        password = Passwords.objects.get(id=password_id)
    except Passwords.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PasswordSerializer(password, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_password(request, password_id):
    try:
        password = Passwords.objects.get(id=password_id)
    except Passwords.DoesNotExist:
        return Response({"detail": "Password not found."}, status=status.HTTP_404_NOT_FOUND)

    password.delete()
    return Response({"detail": "Password deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
