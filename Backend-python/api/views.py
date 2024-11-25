from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser,Bet  # Use the renamed model
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

@csrf_exempt
def get_user_data(request):
    """Retrieve user's balance and bet history"""
    if request.method == 'GET':
        try:
            # Extract user ID from request
            user_id = request.GET.get('user_id')
            if not user_id:
                return JsonResponse({'error': 'User ID is required'}, status=400)

            # Fetch the user
            user = CustomUser.objects.get(user_id=user_id)

            # Fetch the user's bet history
            bet_history = Bet.objects.filter(user=user).values(
                'bet_id', 'game', 'selected_team', 'bet_amount', 'payout', 'result', 'timestamp'
            )

            # Respond with balance and bet history
            return JsonResponse({
                'balance': user.balance,
                'bet_history': list(bet_history)
            }, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def update_balance_and_place_bet(request):
    """Update user's balance and place a new bet"""
    if request.method == 'POST':
        try:
            # Parse the request body
            data = json.loads(request.body)
            logger.info(f"Received payload: {data}")  # Log the received data

            user_id = data.get('user_id')
            game = data.get('game')
            selected_team = data.get('selected_team')
            bet_amount = data.get('bet_amount')
            payout = data.get('payout')

            # Validate inputs
            if not all([user_id, game, selected_team, bet_amount, payout]):
                logger.error("Missing fields in payload")
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Fetch the user
            try:
                user = CustomUser.objects.get(user_id=user_id)
            except CustomUser.DoesNotExist:
                logger.error(f"User with user_id={user_id} not found")
                return JsonResponse({'error': 'User not found'}, status=404)

            # Ensure sufficient balance
            if user.balance < float(bet_amount):
                logger.error("Insufficient balance")
                return JsonResponse({'error': 'Insufficient balance'}, status=400)

            # Deduct the bet amount and update balance
            from decimal import Decimal
            user.balance -= Decimal(bet_amount)
            user.save()

            # Create a new bet
            Bet.objects.create(
                user=user,
                game=game,
                selected_team=selected_team,
                bet_amount=float(bet_amount),
                payout=float(payout),
            )

            logger.info(f"Bet placed successfully for user_id={user_id}")
            return JsonResponse({'message': 'Bet placed successfully!', 'balance': user.balance}, status=201)

        except Exception as e:
            logger.exception(f"Error during placing bet: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred. Check logs for details.'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
