from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)


    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name



def upload_to(instance, filename):
    return f'blog/{instance.uri}/text.md'

class Blog(models.Model):

    
    title = models.CharField(max_length=200)
    description = models.TextField()    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    deleted = models.BooleanField(default=False)
    uri = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    tags = models.ManyToManyField(Tag)
    files = models.FileField(upload_to=upload_to)
    def __str__(self):
        return self.title
    