from django_filters.rest_framework import FilterSet
import django_filters
from blogs.models import *

class BlogFilter(FilterSet):
    tags = django_filters.CharFilter(method='filter_tags')

    class Meta:
        model = Blog
        fields = {
            'title': ['icontains'],
            'created_at': ['gte', 'lte'],
            'updated_at': ['gte', 'lte'],
            'likes': ['gte', 'lte'],
            'views': ['gte', 'lte'],
            'deleted': ['exact'],
            'category' : ['exact'],
        }

    def filter_tags(self, queryset, name, value):
        tag_names = value.split(',')
        return queryset.filter()
# Compare this snippet from blogs/urls.py:

class TagFilter(FilterSet):
    class Meta:
        model = Tag
        fields = {
            'name': ['icontains'],
            'created_at': ['gte', 'lte'],
            'updated_at': ['gte', 'lte'],
            'deleted': ['exact'],
        }

class CategoryFilter(FilterSet):
    class Meta:
        model = Category
        fields = {
            'name': ['icontains'],
            'created_at': ['gte', 'lte'],
            'updated_at': ['gte', 'lte'],
            'deleted': ['exact'],
        }
