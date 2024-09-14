from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BlogPostViewSet,UserListView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'blogposts', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserListView.as_view(), name='user-list'),
]
