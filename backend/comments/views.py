import datetime
from logging import Filterer

from comments.models import *
from django.shortcuts import render

from rest_framework import decorators, response, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

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
class CommentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'blog', 'user', 'reply', 'type']

class CommentSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    filter_class = CommentFilter
    serializer_class = CommentSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return CommentRequestSerializer
        return CommentSerializer



       
    
   
        
        