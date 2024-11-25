from django.urls import path
from .views import signup, login_view,get_user_data,update_balance_and_place_bet  # Import both views

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),  # Add login endpoint
    path('get-user-data/', get_user_data, name='get_user_data'),
    path('update-balance-and-place-bet/', update_balance_and_place_bet, name='update_balance_and_place_bet'),
]
