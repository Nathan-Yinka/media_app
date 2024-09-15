from django.urls import path
from .views import CustomAuthTokenView,UserRegistrationView
from administrator.views import SuperUserAuthTokenView


urlpatterns = [
    path('login/', CustomAuthTokenView.as_view(), name="login"),
    path("sign-up", UserRegistrationView.as_view(), name="sign_up"),
    path("admin/",SuperUserAuthTokenView.as_view(),name="admin_login")
]