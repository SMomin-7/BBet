from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
import uuid

class CustomUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    dob = models.DateField()
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    deposit = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.00'))])
    balance = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.00'))])
    ranking = models.IntegerField(default=0, null=True, blank=True)
    admin_id = models.IntegerField(null=True, blank=True)
    client_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.email

class Bet(models.Model):
    bet_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    game = models.CharField(max_length=255)  # e.g., "Team A vs Team B"
    selected_team = models.CharField(max_length=100)  # The user's chosen team
    bet_amount = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.01'))])
    payout = models.DecimalField(max_digits=10, decimal_places=2,validators=[MinValueValidator(Decimal('0.01'))])
    result = models.CharField(max_length=50, default="Pending")  # "Won", "Lost", or "Pending"
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.game} - {self.selected_team}"
    

from django.db import models
from .models import CustomUser

class Leaderboard(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)  # Relationship to user
    rank = models.IntegerField(null=True, blank=True)  # Rank in the leaderboard
    bet_count = models.IntegerField(default=0)  # Number of bets placed

    def __str__(self):
        return f"{self.user.name} - {self.rank} - {self.bet_count}"
    
class Team(models.Model):
    name = models.CharField(max_length=100, primary_key=True)  # Primary Key
    coach = models.CharField(max_length=100)
    ranking = models.IntegerField(default=0)
    year_founded = models.IntegerField()
    points = models.IntegerField(default=10)

    def __str__(self):
        return self.name
    
class Match(models.Model):
    team1 = models.ForeignKey(Team, related_name='team1_matches', on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name='team2_matches', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    team1_score = models.IntegerField(null=True, blank=True)
    team2_score = models.IntegerField(null=True, blank=True)
    winner = models.ForeignKey(Team, related_name='wins', null=True, blank=True, on_delete=models.SET_NULL)
    stadium = models.CharField(max_length=255, default='McMahon Stadium')
    team1_odds = models.FloatField(default=1.0)  # Default odds for team 1
    team2_odds = models.FloatField(default=1.0)  # Default odds for team 2
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.team1.name} vs {self.team2.name}"


class Player(models.Model):
    player_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)  # Unique Player ID
    ranking = models.IntegerField(default=0)  # Dynamic ranking
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')  # Relationship to Team
    contract_length = models.IntegerField(default=1)  # Contract length in years
    overall_rating = models.IntegerField(default=0)  # Player's overall rating
    shots = models.IntegerField(default=0)  # Total shots
    assists = models.IntegerField(default=0)  # Total assists
    points = models.IntegerField(default=0)  # Total points

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.team.name})"
