from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import BlogPost, Category, UserImages
from .serializers import BlogPostSerializer, CategorySerializer,UserImagesSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema

from media_api.permissions import IsAuthorOrAdminOrReadOnly
from drf_yasg import openapi


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrAdminOrReadOnly]

    @swagger_auto_schema(
        operation_summary="List Blog Posts",
        operation_description="Retrieve a list of all blog posts created by the authenticated user.",
        responses={200: BlogPostSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        user = self.request.user
        statusblog = self.request.query_params.get('status', None)
        queryset = super().get_queryset().filter(author=user)
        if status:
            queryset = queryset.filter(status=statusblog)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create Blog Post for a user",
        operation_description="Allows authenticated users to create a new blog post.",
        manual_parameters=[
            openapi.Parameter('thumbnail', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload blog thumbnail')
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
            openapi.Parameter('thumbnail', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload new blog thumbnail')
        ],
        responses={200: BlogPostSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Partial Update Blog Post",
        operation_description="Partially update a blog post if the user is the author.",
        manual_parameters=[
            openapi.Parameter('image', in_=openapi.IN_FORM, type=openapi.TYPE_FILE, description='Upload new blog thumbnail')
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
        """
        Retrieve the queryset of blog posts that are filtered by the 'title' and 'category'
        query parameters if they are provided in the request.
        """
        queryset = BlogPost.objects.filter(status='published')
        title = self.request.query_params.get('search', None)
        category = self.request.query_params.get('category', None)
        
        if title:
            queryset = queryset.filter(title__icontains=title)
        if category:
            queryset = queryset.filter(category__name__icontains=category)

        return queryset

    @swagger_auto_schema(
        operation_summary="List Published Blog Posts",
        operation_description="Retrieves a list of all blog posts that are marked as 'published'. Allows filtering by title and category.",
        manual_parameters=[
            openapi.Parameter('title', openapi.IN_QUERY, description="Filter by title", type=openapi.TYPE_STRING),
            openapi.Parameter('category', openapi.IN_QUERY, description="Filter by category name", type=openapi.TYPE_STRING)
        ],
        responses={200: BlogPostSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        """ Optionally override to add extra functionality, or simply pass """
        return super().list(request, *args, **kwargs)

    
class BlogPostRetrieveView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.queryset.objects.filter(author=self.request.user)
        else:
            return BlogPost.objects.filter(status='published')

    @swagger_auto_schema(
        operation_summary="Retrieve a single blog post",
        operation_description="Fetches a detailed view of a blog post and update th last read",
        responses={200: BlogPostSerializer}
    )
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.view_count += 1
        instance.save()
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
    
class UserImagesCreateView(generics.ListCreateAPIView):
    queryset = UserImages.objects.all()
    serializer_class = UserImagesSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    @swagger_auto_schema(
        operation_summary="List uploaded images",
        operation_description="Retrieves a list of all uploaded images associated with users.",
        responses={200: UserImagesSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        """ Retrieves a list of images """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Upload an image",
        operation_description="Uploads an image file associated with a user.",
        manual_parameters=[
            openapi.Parameter(
                name="image",
                in_=openapi.IN_FORM,
                description="Upload an image file. Only JPEG and PNG are allowed.",
                type=openapi.TYPE_FILE,
                required=True,
            )
        ],
        consumes=['multipart/form-data'],
        responses={201: UserImagesSerializer(many=False)}
    )
    def post(self, request, *args, **kwargs):
        """ Handles image upload """
        return super().create(request, *args, **kwargs)