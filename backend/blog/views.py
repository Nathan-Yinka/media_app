from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import BlogPost, Category
from .serializers import BlogPostSerializer, CategorySerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema

from media_api.permissions import IsAuthorOrReadOnly
from drf_yasg import openapi


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return super().get_queryset().filter(author=user)

    @swagger_auto_schema(
        operation_summary="List Blog Posts",
        operation_description="Retrieve a list of all blog posts created by the authenticated user.",
        responses={200: BlogPostSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Create Blog Post for a user",
        operation_description="Allows authenticated users to create a new blog post.",
        manual_parameters=[
            openapi.Parameter('image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload blog image')
        ],
        responses={201: BlogPostSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Retrieve Blog Post",
        operation_description="Retrieve a user specific blog post by ID.",
        responses={200: BlogPostSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request,*args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Update Blog Post",
        operation_description="Update a blog post if the user is the author.",
        manual_parameters=[
            openapi.Parameter('image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload new blog image')
        ],
        responses={200: BlogPostSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Partial Update Blog Post",
        operation_description="Partially update a blog post if the user is the author.",
        manual_parameters=[
            openapi.Parameter('image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload new blog image')
        ],
        responses={200: BlogPostSerializer}
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Delete Blog Post",
        operation_description="Delete a blog post if the user is the author.",
        responses={204: None}
    )
    def destroy(self, request, *args, **kwargs):
        blog_post = self.get_object()
        self.perform_destroy(blog_post)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FeedView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.filter(status='published')

    
    @swagger_auto_schema(
        operation_summary="List Published Blog Posts",
        operation_description="Retrieves a list of all blog posts that are marked as 'published'.",
        responses={200: BlogPostSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        """ Optionally override to add extra functionality, or simply pass """
        return super().list(request, *args, **kwargs)
    
class BlogPostRetrieveView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    
    def get_queryset(self):
        return BlogPost.objects.filter(status='published')

    @swagger_auto_schema(
        operation_summary="Retrieve a single blog post",
        operation_description="Fetches a detailed view of a blog post and increments the view count.",
        responses={200: BlogPostSerializer}
    )
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    

class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
    @swagger_auto_schema(
        operation_summary="List Categories",
        operation_description="Retrieves a list of all categories.",
        responses={200: CategorySerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    

