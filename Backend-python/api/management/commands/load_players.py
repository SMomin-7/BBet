import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Team, Player

class Command(BaseCommand):
    help = "Load players from CompiledData.xlsx into the database"

    def handle(self, *args, **kwargs):
        file_path = "CompiledData.xlsx"  # Ensure this file exists in the root directory
        try:
            # Load Excel file
            df = pd.read_excel(file_path)
            df.columns = df.columns.str.strip()  # Normalize column names
            df['Team'] = df['Team'].astype(str).str.strip()  # Ensure Team column is clean

            # Check for missing values in Team column
            if df['Team'].isnull().any():
                raise ValueError("Missing values detected in 'Team' column.")

            # Temporary list to store players for calculating rankings
            players_stats = []

            # Loop through each row in the Excel file
            for _, row in df.iterrows():
                # Get or create the team
                team_name = row['Team']
                team, created = Team.objects.get_or_create(
                    name=team_name,
                    defaults={
                        "coach": "Unknown",
                        "ranking": 0,  # Default ranking
                        "year_founded": 1900,  # Default year founded
                        "points": 0,  # Default team points
                    }
                )
                if created:
                    self.stdout.write(f"Created new team: {team_name}")

                # Calculate total stats to be used for ranking
                total_stats = row['Overall Rating'] + row['Rebounds'] + row['Assists'] + row['Points']

                # Append player data with calculated total stats
                players_stats.append({
                    "first_name": row['Fname'],
                    "last_name": row['Lname'],
                    "team": team,
                    "contract_length": row['Contract Length'],
                    "overall_rating": row['Overall Rating'],
                    "shots": row['Rebounds'],
                    "assists": row['Assists'],
                    "points": row['Points'],
                    "total_stats": total_stats,  # Used for unique ranking
                })

            # Sort players by total stats in descending order
            players_stats = sorted(players_stats, key=lambda x: x['total_stats'], reverse=True)

            # Assign unique rankings based on sorted order
            for rank, player_data in enumerate(players_stats, start=1):
                Player.objects.create(
                    first_name=player_data['first_name'],
                    last_name=player_data['last_name'],
                    team=player_data['team'],
                    contract_length=player_data['contract_length'],
                    overall_rating=player_data['overall_rating'],
                    shots=player_data['shots'],
                    assists=player_data['assists'],
                    points=player_data['points'],
                    ranking=rank,  # Assign rank based on sorted order
                )

            self.stdout.write(self.style.SUCCESS("Players loaded successfully with unique rankings."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error loading players: {str(e)}"))
