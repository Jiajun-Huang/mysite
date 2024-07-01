from blogs.models import Blog
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
COMMENT_TYPES = (
    (0, 'Blog'),
    (1, 'Page'),
    (2, 'Unknown')
)



class Comment(models.Model):
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    
    type = models.IntegerField(choices=COMMENT_TYPES, default=2)
    
    def __str__(self):
        return self.content