from rest_framework import viewsets
from rest_framework import permissions

from .serializers import AdminBlogPostSerializer,UserSerializer
from blog.serializers import CategorySerializer
from blog.models import Category,BlogPost

from rest_framework import generics

from users.serializers import UserRegistrationSerializer

from django.contrib.auth import get_user_model
from users.models import Role


from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.inspectors import SwaggerAutoSchema

from media_api.permissions import isADMINISTRATOR

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status



User = get_user_model()



class FileUploadSchema(SwaggerAutoSchema):
    def get_manual_fields(self):
        manual_fields = super().get_manual_fields()
        if self.method.lower() == 'post':
            manual_fields.append(openapi.Parameter(
                'thumbnail', in_=openapi.IN_FORM, type=openapi.TYPE_FILE,
                description='thumbnail file'
            ))
        return manual_fields

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated,isADMINISTRATOR]


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = AdminBlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, isADMINISTRATOR]

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('thumbnail', in_=openapi.IN_FORM, type=openapi.TYPE_FILE)
    ])
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save()
    
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, isADMINISTRATOR]
    
    
    def get_queryset(self):
        return super().get_queryset().filter(role=Role.CONTENT_CREATOR)
    @swagger_auto_schema(
        operation_summary="List All Users",
        operation_description="Retrieves a list of all registered users. Accessible by authenticated users with admin rights."
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    
class SuperUserAuthTokenView(ObtainAuthToken):
    @swagger_auto_schema(
        operation_summary="Administrator Authentication",
        operation_description="Authenticates a Administrator and returns a token. Non Administrator receive a 404 response.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['username', 'password'],
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Administrator username'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Administrator password'),
            },
        ),
        responses={
            200: openapi.Response(
                description="Authentication successful",
                examples={
                    "application/json": {
                        "token": "token_string",
                        "user_id": "user_id",
                        "email": "user_email"
                    }
                }
            ),
            404: openapi.Response(
                description="User is not Administrator",
                examples={
                    "application/json": {
                        "error": "User is not admin"
                    }
                }
            )
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        if not user.role == Role.ADMINISTRATOR:
            return Response({"error": "User is not admin"}, status=status.HTTP_404_NOT_FOUND)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
