from django.contrib.auth import get_user_model
from rest_framework import serializers
from blog.models import BlogPost

User = get_user_model()


class AdminBlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"