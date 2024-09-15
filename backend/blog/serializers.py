from rest_framework import serializers
from .models import BlogPost, Category, UserImages

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.CharField(read_only=True)
    last_read = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = "__all__"

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super(BlogPostSerializer, self).create(validated_data)

class UserImagesSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = UserImages
        fields = ['user', 'image', 'name']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(UserImagesSerializer, self).create(validated_data)

