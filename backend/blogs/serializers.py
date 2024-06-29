from rest_framework import serializers

from .models import *


class BlogUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'description', 'category', 'tags', 'text_file', 'uri']

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['id', 'name', 'created_at', 'updated_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at', 'updated_at']

class TagNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']
class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class BlogSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True)
    category = CategoryNameSerializer()
    class Meta:
        model = Blog
        fields = "__all__"

class BlogDetailSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True)
    category = CategoryNameSerializer()
    text = serializers.CharField()
    class Meta:
        model = Blog
        fields = "__all__"