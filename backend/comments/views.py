from logging import Filterer

from django.shortcuts import render
from rest_framework import serializers, viewsets, response, decorators

from comments.models import *

# Create your views here.



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
        fields = "__all__"


class CommentSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    
    filter_class = CommentFilter
    search_fields = ['content', 'created_at', 'updated_at', 'deleted', 'blog', 'user']
    serializer_class = CommentSerializer
    ordering_fields = ['created_at', 'updated_at', 'deleted', 'blog', 'user']
    ordering = ['created_at']
    pagination_class = None

    #  a special api for get all top level comments given blog id
    @decorators.action(methods=['get'], detail=False)
    def get_comments(self, request):
        blog_id = request.GET.get('blog_id')
        if blog_id:
            comments = Comment.objects.filter(blog_id=blog_id, reply=None)
            serializer = CommentSerializer(comments, many=True)
            return response.Response(serializer.data)
        return response.Response([])
    
        