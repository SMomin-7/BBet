import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Team

def populate_teams():
    # List of team data
    teams = [
        {"ranking": 1, "name": "Toronto Raptors", "coach": "Darko Rajakovic", "year_founded": 1995, "points": 0},
        {"ranking": 2, "name": "Boston Celtics", "coach": "Joe Mazzulla", "year_founded": 1946, "points": 0},
        {"ranking": 3, "name": "Golden State Warriors", "coach": "Steve Kerr", "year_founded": 1946, "points": 0},
        {"ranking": 4, "name": "New York Knicks", "coach": "Tom Thibodeau", "year_founded": 1946, "points": 0},
        {"ranking": 5, "name": "Los Angeles Lakers", "coach": "JJ Redick", "year_founded": 1946, "points": 0},
        {"ranking": 6, "name": "Miami Heat", "coach": "Erik Spoelstra", "year_founded": 1988, "points": 0},
        {"ranking": 7, "name": "Chicago Bulls", "coach": "Billy Donovan", "year_founded": 1966, "points": 0},
        {"ranking": 8, "name": "Brooklyn Nets", "coach": "Jordi Fernandez", "year_founded": 1967, "points": 0},
    ]

    for team in teams:
        Team.objects.update_or_create(
            name=team["name"],  # Use team name as the primary key
            defaults={
                "coach": team["coach"],
                "ranking": team["ranking"],
                "year_founded": team["year_founded"],
                "points": team["points"],
            },
        )

    print("Teams populated successfully!")

if __name__ == "__main__":
    populate_teams()
