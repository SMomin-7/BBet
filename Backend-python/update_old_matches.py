import os
import django
import random
from datetime import datetime, timedelta

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Match

# Update old matches
def update_old_matches():
    try:
        matches = Match.objects.all()
        start_time = datetime.now().replace(hour=12, minute=0, second=0, microsecond=0)

        for i, match in enumerate(matches):
            new_time = start_time + timedelta(hours=(i % 3) * 3 + (i // 3) * 24)
            match.timestamp = new_time
            match.save()

        print("Old matches updated successfully!")
    except Exception as e:
        print(f"Error updating matches: {e}")

if __name__ == "__main__":
    update_old_matches()
