from . import views
from django.urls import path
from .views import signup, login_view,get_user_data,update_balance_and_place_bet,get_leaderboard# Import both views
from .views import leaderboard,import_leaderboard,sync_leaderboard,get_teams,generate_matches,get_matches

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),  # Add login endpoint
    path('get-user-data/', get_user_data, name='get_user_data'),
    path('update-balance-and-place-bet/', update_balance_and_place_bet, name='update_balance_and_place_bet'),
    path('get-leaderboard/', get_leaderboard, name='get_leaderboard'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('sync-leaderboard/', views.sync_leaderboard, name='sync_leaderboard'),
    path('teams/', views.get_teams, name='get_teams'),
    path('generate-matches/', views.generate_matches, name='generate_matches'),
    path('matches/', views.get_matches, name='get_matches'),

]
