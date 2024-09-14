from rest_framework.authentication import TokenAuthentication as BaseTokenAuth
from django.contrib.auth import get_user_model

User = get_user_model()

class TokenAuthentication(BaseTokenAuth):
    keyword = "Bearer"