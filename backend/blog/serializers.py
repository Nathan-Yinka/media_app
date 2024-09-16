from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import BlogPost, Category, UserImages

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name','full_name']
    def get_full_name(self, obj):
        # Concatenate first_name and last_name to form full name
        return f"{obj.first_name} {obj.last_name}".strip()  
        

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.CharField(read_only=True)
    last_read = serializers.DateTimeField(read_only=True)
    author_details = UserSerializer(read_only=True,source='author')
    category_details = CategorySerializer(source="category", read_only=True)
    is_owner = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = BlogPost
        fields = "__all__"

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super(BlogPostSerializer, self).create(validated_data)
    
    def get_is_owner(self,obj):
        try:
            return obj.author == self.context['request'].user
        except:
            return False

class UserImagesSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = UserImages
        fields = ['user', 'image', 'name']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(UserImagesSerializer, self).create(validated_data)

