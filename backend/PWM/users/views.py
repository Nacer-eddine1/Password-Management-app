from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserListSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # No need to specify role, it will be 'client' by default
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        # Extract email and password from request data
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if email and password are provided
        if not email or not password:
            raise AuthenticationFailed('Email and password are required.')

        # Authenticate user
        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid email or password.')

        # Generate JWT token
        payload = {
            'id': user.id,
            'email': user.email,
            'username': user.first_name,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),       # exp : Expiration Time
            'iat': datetime.datetime.utcnow()                                      # iat : Issued at time
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        # decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

        # Set the JWT token as a cookie in the response
        response = Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
        response.set_cookie(key='token', value=token, httponly=True)
        return response
    
# Logout View: Clears the JWT token cookie in the response
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('token')
        response.data = {'message': 'success'}
        return response
    



@api_view(['GET', 'POST'])
def users(request):
    if request.method == 'GET':
        users = User.objects.filter(role='client')    # Filter clients
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserListSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

