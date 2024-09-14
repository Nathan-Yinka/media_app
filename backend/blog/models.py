from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True, blank=True,upload_to='blog_images/')
    status = models.CharField(
        max_length=15, 
        choices=[
            ('in_review', 'In Review'), 
            ('published', 'Published'),
            ('revoked', 'Revoked')
        ],
        default='in_review'
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='blog_posts')
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
