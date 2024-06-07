from argparse import Action

from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from blogs.filter import *
from blogs.models import *
from blogs.serializers import *

# Create your views here.
class BlogFilterField():
    title = 'title' # is contain
    created_at_begin = 'created_at' # date
    created_at_end = 'created_at' # date 
    
    updated_at_begin = 'updated_at' # date 
    updated_at_end = 'updated_at' # date

    likes_begin = 'likes' # number
    likes_end = 'likes' # number 
 
    views_begin = 'views' # number
    views_end = 'views' # number
 
    deleted = 'deleted' # boolean

    tags = [] # tag pks
    category = 'category' # category pk

    like_order = 'likes'# desc or asc
    view_order = 'views' # desc or asc
    title_order = 'title' # desc or asc


#  get Blog list from parameter 
class BlogSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    filter_class = BlogFilter
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('title', openapi.IN_QUERY, description="Title contains", type=openapi.TYPE_STRING),
            openapi.Parameter('created_at_begin', openapi.IN_QUERY, description="Created at (start date)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
            openapi.Parameter('created_at_end', openapi.IN_QUERY, description="Created at (end date)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
            openapi.Parameter('updated_at_begin', openapi.IN_QUERY, description="Updated at (start date)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
            openapi.Parameter('updated_at_end', openapi.IN_QUERY, description="Updated at (end date)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
            openapi.Parameter('likes_begin', openapi.IN_QUERY, description="Minimum likes", type=openapi.TYPE_INTEGER),
            openapi.Parameter('likes_end', openapi.IN_QUERY, description="Maximum likes", type=openapi.TYPE_INTEGER),
            openapi.Parameter('views_begin', openapi.IN_QUERY, description="Minimum views", type=openapi.TYPE_INTEGER),
            openapi.Parameter('views_end', openapi.IN_QUERY, description="Maximum views", type=openapi.TYPE_INTEGER),
            openapi.Parameter('deleted', openapi.IN_QUERY, description="Deleted", type=openapi.TYPE_BOOLEAN),
            openapi.Parameter('tags', openapi.IN_QUERY, description="Tag IDs", type=openapi.TYPE_ARRAY, items=openapi.Items(type=openapi.TYPE_INTEGER)),
            openapi.Parameter('category', openapi.IN_QUERY, description="Category ID", type=openapi.TYPE_INTEGER),
            openapi.Parameter('like_order', openapi.IN_QUERY, description="Order by likes", type=openapi.TYPE_STRING, enum=["asc", "desc"]),
            openapi.Parameter('view_order', openapi.IN_QUERY, description="Order by views", type=openapi.TYPE_STRING, enum=["asc", "desc"]),
            openapi.Parameter('title_order', openapi.IN_QUERY, description="Order by title", type=openapi.TYPE_STRING, enum=["asc", "desc"]),
        ]
    )
    def list(self, request):
        # declare request parameter using a class
        # can add contidion such as deleted=False, title pattern search, order by created_at etc.
         # Title filter
        filter_fields = BlogFilterField()
        filters = {}
        print(request.query_params)
        if filter_fields.title in request.query_params:
            filters['title__icontains'] = request.query_params[filter_fields.title]

        # Created at filters
        if filter_fields.created_at_begin in request.query_params:
            filters['created_at__gte'] = request.query_params[filter_fields.created_at_begin]
        if filter_fields.created_at_end in request.query_params:
            filters['created_at__lte'] = request.query_params[filter_fields.created_at_end]

        # Updated at filters
        if filter_fields.updated_at_begin in request.query_params:
            filters['updated_at__gte'] = request.query_params[filter_fields.updated_at_begin]
        if filter_fields.updated_at_end in request.query_params:
            filters['updated_at__lte'] = request.query_params[filter_fields.updated_at_end]

        # Likes filters
        if filter_fields.likes_begin in request.query_params:
            filters['likes__gte'] = request.query_params[filter_fields.likes_begin]
        if filter_fields.likes_end in request.query_params:
            filters['likes__lte'] = request.query_params[filter_fields.likes_end]

        # Views filters
        if filter_fields.views_begin in request.query_params:
            filters['views__gte'] = request.query_params[filter_fields.views_begin]
        if filter_fields.views_end in request.query_params:
            filters['views__lte'] = request.query_params[filter_fields.views_end]

        # Deleted filter
        if filter_fields.deleted in request.query_params:
            filters['deleted'] = request.query_params[filter_fields.deleted]

        # Tags filter
        tag_ids = request.query_params.getlist('tags')
        if tag_ids:
            filters['tags__in'] = tag_ids

        # Category filter
        if filter_fields.category in request.query_params:
            filters['category'] = request.query_params[filter_fields.category]
        print(filters)
        queryset = Blog.objects.filter(deleted=False, **filters)

        # Order by
        ordering = []
        if filter_fields.like_order in request.query_params:
            ordering.append(f"{'' if request.query_params[filter_fields.like_order] == 'asc' else '-'}likes")
        if filter_fields.view_order in request.query_params:
            ordering.append(f"{'' if request.query_params[filter_fields.view_order] == 'asc' else '-'}views")
        if filter_fields.title_order in request.query_params:
            ordering.append(f"{'' if request.query_params[filter_fields.title_order] == 'asc' else '-'}title")

        if ordering:
            queryset = queryset.order_by(*ordering)
        
        queryset = Blog.objects.filter(deleted=False, **filters)
        print(queryset)
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)
    

    def create(self, request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        blog.deleted = True
        blog.save()
        return Response(status=204)
    
    # update blog information given
    def update(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        serializer = BlogSerializer(blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    # increase view count
    def view(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        blog.views += 1
        blog.save()
        return Response(status=204)
    
    # increase like count do not change update time
    def like(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        blog.likes += 1
        blog.save()
        return Response(status=204)
    

        

class CategorySet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilter
    
    def list(self, request):
        queryset = Category.objects.filter(deleted=False)
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        category.deleted = True
        category.save()
        return Response(status=204)
    
    def update(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class TagSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_class = TagFilter
    
    def list(self, request):
        queryset = Tag.objects.filter(deleted=False)
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        tag = get_object_or_404(Tag, pk=pk)
        tag.deleted = True
        tag.save()
        return Response(status=204)
    
    def update(self, request, pk):
        tag = get_object_or_404(Tag, pk=pk)
        serializer = TagSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
