from django.contrib.auth import get_user_model
from rest_framework import serializers
from blog.models import BlogPost

User = get_user_model()

        
class AdminBlogPostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    last_read = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = "__all__"

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super(AdminBlogPostSerializer, self).create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"