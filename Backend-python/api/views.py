from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser  # Use the renamed model
from django.contrib.auth.hashers import make_password, check_password
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the frontend
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            dob = data.get('dob')
            deposit = float(data.get('deposit', 0))

            # Validate required fields
            if not name or not email or not password or not dob:
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Check if the email is already registered
            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email is already registered'}, status=400)

            # Hash the password before saving
            hashed_password = make_password(password)

            # Create the user
            user = CustomUser.objects.create(
                name=name,
                email=email,
                password=hashed_password,
                dob=dob,
                deposit=deposit,
                balance=deposit,  # Initial balance equals deposit
            )
            return JsonResponse({'message': 'User registered successfully!'}, status=201)

        except Exception as e:
            logger.exception(f"Error during signup: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            logger.info(f"Attempting login for email: {email}")

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=400)

            # Retrieve the user by email
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                logger.error(f"User not found for email: {email}")
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

            # Verify the password
            if check_password(password, user.password):
                logger.info(f"Login successful for user: {email}")
                return JsonResponse({'message': 'Login successful', 'user': {'id': user.user_id, 'email': user.email}}, status=200)
            else:
                logger.error(f"Invalid credentials for email: {email}")
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except Exception as e:
            logger.exception(f"Error during login: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
