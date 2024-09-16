from django.contrib.auth import get_user_model
from rest_framework import serializers
from blog.models import BlogPost
from blog.serializers import CategorySerializer,UserSerializer

User = get_user_model()

        
class AdminBlogPostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    status = serializers.CharField()
    last_read = serializers.DateTimeField(read_only=True)
    author_details = UserSerializer(read_only=True,source='author')
    category_details = CategorySerializer(source="category", read_only=True)
    is_owner = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = "__all__"

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super(AdminBlogPostSerializer, self).create(validated_data)
    
    def get_is_owner(self,obj):
        try:
            return obj.author == self.context['request'].user
        except:
            return False


