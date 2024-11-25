from django.urls import path
from .views import signup, login_view  # Import both views

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),  # Add login endpoint
]
