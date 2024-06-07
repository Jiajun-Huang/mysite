from logging import Filterer
from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.

from blogs import serializers
from comments.models import *

class CommentFilter(Filterer):
    class Meta:
        model = Comment
        fields = {
            'content': ['icontains'],
            'created_at': ['gte', 'lte'],
            'updated_at': ['gte', 'lte'],
            'deleted': ['exact'],
            'blog': ['exact'],
            'user': ['exact'],
        }

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'updated_at', 'deleted', 'blog', 'user']

class CommentSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class =  CommentSerializer
    filter_class = CommentFilter
    search_fields = ['content', 'created_at', 'updated_at', 'deleted', 'blog', 'user']
    ordering_fields = ['created_at', 'updated_at', 'deleted', 'blog', 'user']
    ordering = ['created_at']
    pagination_class = None
    
        