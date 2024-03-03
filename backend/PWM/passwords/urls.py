from django.urls import path
from .views import get_passwords, create_password, update_password, delete_password

# Define URL patterns for passwords-related views
urlpatterns = [
    # Endpoint to create a new password
    path('passwords/create/', create_password, name='create_password'),

    # Endpoint to retrieve all passwords for a specific user
    path('passwords/', get_passwords, name='get_passwords'),

    # Endpoint to update a specific password
    path('passwords/update/<int:password_id>/', update_password, name='update_password'),

    # Endpoint to delete a specific password
    path('passwords/delete/<int:password_id>/', delete_password, name='delete_password'),
]