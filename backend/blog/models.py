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
    thumbnail = models.ImageField(null=True, blank=True,upload_to='blog_images/')
    status = models.CharField(
        max_length=15, 
        choices=[
            ('in_review', 'In Review'), 
            ('published', 'Published'),
            ('flagged', 'Flagged')
        ],
        default='in_review'
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='blog_posts')
    last_read = models.DateTimeField(auto_now=True)
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class UserImages(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='user_images/')
    name = models.CharField(("image_name"), max_length=50,null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.first_name} {self.image.url}"