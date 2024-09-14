from django.urls import path
from .views import CustomAuthTokenView,UserRegistrationView


urlpatterns = [
    path('login/', CustomAuthTokenView.as_view(), name="login"),
    path("sign-up", UserRegistrationView.as_view(), name="sign_up"),
]