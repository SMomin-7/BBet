from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

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


