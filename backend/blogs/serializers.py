from rest_framework import serializers

from mysite.settings import DEFAULT_FILE_STORAGE

from .models import *


class BlogUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["title", "description", "category", "tags", "uri", "files"]
    
    def to_internal_value(self, data):
        """
        Override to_internal_value to preprocess the 'tags' field and handle it correctly.
        """
        print(data)
        if 'tags' in data:
            # If tags are a string, convert them into a list of integers (primary keys)
            if isinstance(data['tags'], list):
                # If tags are already in a list, convert each item to an integer
                data['tags'] = [int(x) for x in data['tags']]
        if 'category' in data:
            # If category is a string, convert it into an integer (primary key)
            if isinstance(data['category'], str):
                data['category'] = int(data['category'])
        print(data)
        return super().to_internal_value(data)
                

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ["id", "name", "created_at", "updated_at"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "created_at", "updated_at"]


class TagNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class BlogSerializer(serializers.ModelSerializer):
    # tags = TagNameSerializer(many=True)
    # category = CategoryNameSerializer()
    class Meta:
        model = Blog
        fields = "__all__"


class BlogDataSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True)
    category = CategoryNameSerializer()

    class Meta:
        model = Blog
        fields = "__all__"


class BlogDetailSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True)
    category = CategoryNameSerializer()

    class Meta:
        model = Blog
        fields = "__all__"
