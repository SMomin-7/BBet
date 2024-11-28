import os
import django
from datetime import datetime, timedelta
import random

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Match

# Define stadiums
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

def update_existing_matches():
    try:
        matches = Match.objects.all().order_by('id')  # Fetch all matches in order of creation
        if not matches.exists():
            print("No matches found in the database.")
            return

        # Initialize scheduling variables
        start_time = datetime.now().replace(hour=12, minute=0, second=0, microsecond=0)
        max_matches_per_day = 3
        time_gap = timedelta(hours=3)
        match_count = 0

        for match in matches:
            # Assign timestamp if not already set
            if not match.timestamp:
                if match_count >= max_matches_per_day:
                    # Move to the next day
                    start_time += timedelta(days=1)
                    start_time = start_time.replace(hour=12, minute=0, second=0, microsecond=0)
                    match_count = 0  # Reset daily match count
                
                match.timestamp = start_time
                match_count += 1
                start_time += time_gap

            # Assign stadium if not already set
            if not match.stadium:
                match.stadium = random.choice(STADIUMS)

            match.save()  # Save updated match to the database
            print(f"Updated match: {match.team1.name} vs {match.team2.name}")

        print("All matches updated successfully.")
    except Exception as e:
        print(f"Error updating matches: {str(e)}")

if __name__ == "__main__":
    update_existing_matches()
