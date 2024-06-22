from django.contrib.auth.models import User
from django.db import models

from blogs.models import Blog

# Create your models here.

class Comment(models.Model):
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    
    
    def __str__(self):
        return self.content