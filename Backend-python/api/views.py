from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser  # Use the renamed model

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

            # Create the user
            user = CustomUser.objects.create(
                name=name,
                email=email,
                password=password,
                dob=dob,
                deposit=deposit,
                balance=deposit,  # Initial balance equals deposit
            )
            return JsonResponse({'message': 'User registered successfully!'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
