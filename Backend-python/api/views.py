from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser,Bet  # Use the renamed model
from django.contrib.auth.hashers import make_password, check_password
import logging
from decimal import Decimal
from django.db.models import Count  # Import Count for aggregation
from .models import CustomUser
from .models import Leaderboard
from .models import Team,Match
import random
from .models import Match
from datetime import datetime, timedelta

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

            # Ensure bet_amount and payout are non-negative
            if float(bet_amount) <= 0 or float(payout) <= 0:
                logger.error("Bet amount and payout must be positive")
                return JsonResponse({'error': 'Bet amount and payout must be positive'}, status=400)

            # Fetch the user
            try:
                user = CustomUser.objects.get(user_id=user_id)
            except CustomUser.DoesNotExist:
                logger.error(f"User with user_id={user_id} not found")
                return JsonResponse({'error': 'User not found'}, status=404)

            # Ensure sufficient balance
            if user.balance < Decimal(bet_amount):
                logger.error("Insufficient balance")
                return JsonResponse({'error': 'Insufficient balance'}, status=400)

            # Deduct the bet amount and update balance
            user.balance -= Decimal(bet_amount)
            user.save()

            # Create a new bet
            Bet.objects.create(
                user=user,
                game=game,
                selected_team=selected_team,
                bet_amount=Decimal(bet_amount),
                payout=Decimal(payout),
            )
            
            # Update the leaderboard
            leaderboard_entry, created = Leaderboard.objects.get_or_create(user=user)
            leaderboard_entry.bet_count += 1
            leaderboard_entry.save()

            logger.info(f"Bet placed successfully for user_id={user_id}")
            return JsonResponse({'message': 'Bet placed successfully!', 'balance': user.balance}, status=201)

        except Exception as e:
            logger.exception(f"Error during placing bet: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred. Check logs for details.'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_leaderboard(request):
    if request.method == 'GET':
        try:
            # Aggregate bets by user and count them
            leaderboard_data = (
                CustomUser.objects.annotate(num_bets=Count('bet'))
                .values('name', 'email', 'num_bets')
                .order_by('-num_bets')  # Sort by number of bets placed
            )
            return JsonResponse({'leaderboard': list(leaderboard_data)}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def leaderboard(request):
    try:
        # Update or create leaderboard entries dynamically
        users_with_bet_counts = CustomUser.objects.annotate(num_bets=Count('bet')).order_by('-num_bets')

        rank = 1  # Initialize rank
        for user in users_with_bet_counts:
            # Update or create Leaderboard entry for each user
            Leaderboard.objects.update_or_create(
                user=user,
                defaults={
                    'bet_count': user.num_bets,
                    'rank': rank,
                }
            )
            rank += 1  # Increment rank for the next user

        # Fetch updated leaderboard data for response
        leaderboard_data = Leaderboard.objects.select_related('user').order_by('rank').values(
            'rank', 'user__name', 'user__email', 'bet_count'
        )

        # Return the data as JSON
        return JsonResponse({'leaderboard': list(leaderboard_data)}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def import_leaderboard(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request
            data = json.loads(request.body)
            for entry in data:
                name = entry.get('name')
                email = entry.get('email')
                num_bets = entry.get('num_bets')

                # Check if user exists or create them
                user, _ = CustomUser.objects.get_or_create(
                    name=name,
                    email=email
                )

                # Update or create leaderboard entry
                Leaderboard.objects.update_or_create(
                    user=user,
                    defaults={'bet_count': num_bets},
                )

            return JsonResponse({'message': 'Leaderboard imported successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def sync_leaderboard(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Parse JSON payload
            leaderboard_data = data.get('leaderboard', [])

            # Update or create leaderboard entries and assign ranks
            for index, entry in enumerate(
                sorted(leaderboard_data, key=lambda x: x['num_bets'], reverse=True), start=1
            ):
                name = entry['name']
                email = entry['email']
                num_bets = entry['num_bets']

                # Update or create user and leaderboard entries
                user, created = CustomUser.objects.get_or_create(
                    email=email,
                    defaults={'name': name, 'password': 'placeholder'}
                )
                Leaderboard.objects.update_or_create(
                    user=user,
                    defaults={'bet_count': num_bets, 'rank': index}  # Assign rank
                )

            return JsonResponse({'message': 'Leaderboard synced and ranked successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
@csrf_exempt
def get_teams(request):
    teams = Team.objects.all().order_by('ranking')  # Order by ranking
    data = list(teams.values('ranking', 'name', 'coach', 'year_founded', 'points'))
    return JsonResponse({'teams': data})


import random
from datetime import datetime
from django.utils.timezone import now

STADIUMS = [
    "BC Place",
    "Scotiabank Arena",
    "Rogers Centre",
    "McMahon Stadium",
    "Commonwealth Stadium",
    "Tim Hortons Field",
    "TD Place Stadium",
    "Mosaic Stadium"
]


@csrf_exempt
def generate_matches(request):
    try:
        # Get all teams
        teams = list(Team.objects.all())
        if len(teams) < 2:
            return JsonResponse({'error': 'Not enough teams to generate matches'}, status=400)

        # Shuffle teams for random pairing
        random.shuffle(teams)
        
        # Initialize scheduling variables
        start_time = datetime.now().replace(hour=12, minute=0, second=0, microsecond=0)  # Matches start at 12 PM
        max_matches_per_day = 3  # Limit matches to 3 per day
        time_gap = timedelta(hours=3)  # 3-hour gap between matches
        scheduled_matches = []  # Keep track of scheduled matches
        
        match_count = 0

        # Pair teams and schedule matches
        for i in range(0, len(teams) - 1, 2):
            team1 = teams[i]
            team2 = teams[i + 1]

            # Check if match already exists
            match, created = Match.objects.get_or_create(team1=team1, team2=team2)

            # Calculate match start time
            if match_count >= max_matches_per_day:
                # Move to the next day
                start_time += timedelta(days=1)
                start_time = start_time.replace(hour=12, minute=0, second=0, microsecond=0)
                match_count = 0  # Reset daily match count

            match.timestamp = start_time
            match.stadium = random.choice(STADIUMS)  # Assign random stadium
            match.save()

            scheduled_matches.append({
                'team1': team1.name,
                'team2': team2.name,
                'date': match.timestamp.strftime('%b %d, %Y %I:%M %p'),
                'stadium': match.stadium,
                'team1_score': match.team1_score,
                'team2_score': match.team2_score,
                'winner': match.winner.name if match.winner else None,
            })

            # Increment time and match count
            start_time += time_gap
            match_count += 1

        return JsonResponse({'matches': scheduled_matches}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


import random
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

STADIUMS = [
    "BC Place",
    "Scotiabank Arena",
    "Rogers Centre",
    "McMahon Stadium",
    "Commonwealth Stadium",
    "Tim Hortons Field",
    "TD Place Stadium",
    "Mosaic Stadium",
]

from datetime import datetime

@csrf_exempt
def get_matches(request):
    try:
        matches = Match.objects.all().values(
            'id', 'team1__name', 'team2__name', 'timestamp', 'stadium', 'team1_score', 'team2_score', 'winner__name'
        )

        data = []
        for match in matches:
            timestamp = match['timestamp']
            formatted_date = (
                datetime.strftime(timestamp, '%b %d, %Y %I:%M %p')
                if timestamp else 'Date Unavailable'
            )

            data.append({
                'id': match['id'],
                'team1': match['team1__name'],
                'team2': match['team2__name'],
                'date': formatted_date,
                'stadium': match['stadium'],
                'team1_score': match['team1_score'],
                'team2_score': match['team2_score'],
                'winner': match['winner__name'],
            })

        return JsonResponse({'matches': data}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)





