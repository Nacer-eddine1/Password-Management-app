from django.urls import path
from .views import get_passwords, create_password, update_password, delete_password

# Define URL patterns for passwords-related views
urlpatterns = [
    # Endpoint to create a new password
    path('api/passwords/', create_password, name='create_password'),

    # Endpoint to retrieve all passwords for a specific user
    path('api/passwords/<int:user_id>/', get_passwords, name='get_passwords'),

    # Endpoint to update a specific password
    path('api/passwords/<int:pk>/', update_password, name='update_password'),

    # Endpoint to delete a specific password
    path('api/passwords/<int:pk>/', delete_password, name='delete_password'),
]