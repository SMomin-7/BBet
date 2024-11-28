import os
import django
import random

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Match  # Import the Match model

def assign_odds():
    # Fetch all matches where odds are still set to the default value of 1
    matches_with_default_odds = Match.objects.filter(team1_odds=1, team2_odds=1)
    
    if not matches_with_default_odds.exists():
        print("No matches with default odds found. All odds are already updated!")
        return

    for match in matches_with_default_odds:
        # Assign random odds between 1 and 3 (inclusive of decimals)
        match.team1_odds = round(random.uniform(1, 3), 2)
        match.team2_odds = round(random.uniform(1, 3), 2)
        match.save()  # Save the changes to the database
        print(f"Updated odds for match {match.team1.name} vs {match.team2.name}: "
              f"Team1 Odds: {match.team1_odds}, Team2 Odds: {match.team2_odds}")

    print("Random odds assignment completed for matches with default odds.")

if __name__ == "__main__":
    assign_odds()
