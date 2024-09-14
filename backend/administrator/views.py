from rest_framework import viewsets
from rest_framework import permissions

from .serializers import AdminBlogPostSerializer,UserSerializer
from blog.serializers import CategorySerializer
from blog.models import Category,BlogPost

from rest_framework import generics

from users.serializers import UserRegistrationSerializer

from django.contrib.auth import get_user_model


from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.inspectors import SwaggerAutoSchema

from media_api.permissions import IsAdminOrReadOnly


User = get_user_model()



class FileUploadSchema(SwaggerAutoSchema):
    def get_manual_fields(self):
        manual_fields = super().get_manual_fields()
        if self.method.lower() == 'post':
            manual_fields.append(openapi.Parameter(
                'image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE,
                description='Image file'
            ))
        return manual_fields

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated,IsAdminOrReadOnly]


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = AdminBlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE)
    ])
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save()
    
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly]
    
    @swagger_auto_schema(
        operation_summary="List All Users",
        operation_description="Retrieves a list of all registered users. Accessible by authenticated users with admin rights."
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)