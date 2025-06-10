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
        Handles both QueryDict and regular dict inputs.
        """
        # Create a mutable copy of the data if it's a QueryDict
        if hasattr(data, 'dict'):
            data = data.dict()

        if 'tags' in data:
            # Handle different tag input formats
            tags_data = data['tags']
            
            # Handle list of strings from form data
            if isinstance(tags_data, list) and len(tags_data) == 1 and isinstance(tags_data[0], str):
                # Split the comma-separated string and convert to integers
                data['tags'] = [int(tag) for tag in tags_data[0].split(',')]
            # Handle already processed list
            elif isinstance(tags_data, list):
                # Convert any string numbers in the list to integers
                data['tags'] = [int(tag) if isinstance(tag, str) else tag for tag in tags_data]
            # Handle single string of comma-separated values
            elif isinstance(tags_data, str):
                data['tags'] = [int(tag.strip()) for tag in tags_data.split(',')]

        if 'category' in data:
            # Handle category conversion
            category_data = data['category']
            if isinstance(category_data, list) and len(category_data) == 1:
                data['category'] = int(category_data[0])
            elif isinstance(category_data, str):
                data['category'] = int(category_data)

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
