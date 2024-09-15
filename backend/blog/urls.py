from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet,CategoryListView,FeedView,BlogPostRetrieveView, UserImagesCreateView

router = DefaultRouter()
router.register(r'blogposts', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('categories/',CategoryListView.as_view()),
    path("feeds/", FeedView.as_view(), name="blog_feeds"),
    path('<int:pk>/', BlogPostRetrieveView.as_view(), name='blogpost-detail'),
    path('upload/', UserImagesCreateView.as_view(), name='upload-image'),
]
