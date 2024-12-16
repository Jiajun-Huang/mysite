import os
from argparse import Action

from blogs.filter import *
from blogs.models import *
from blogs.permission import *
from blogs.serializers import *
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes, extend_schema
from minio_storage.storage import MinioMediaStorage
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response


# Create your views here.
class BlogFilterField:
    title = "title"  # is contain
    created_at_begin = "created_at"  # date
    created_at_end = "created_at"  # date

    updated_at_begin = "updated_at"  # date
    updated_at_end = "updated_at"  # date

    likes_begin = "likes"  # number
    likes_end = "likes"  # number

    views_begin = "views"  # number
    views_end = "views"  # number

    deleted = "deleted"  # boolean

    tags = []  # tag pks
    category = "category"  # category pk

    like_order = "likes"  # desc or asc
    view_order = "views"  # desc or asc
    title_order = "title"  # desc or asc


#  get Blog list from parameter
class BlogSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    filter_class = BlogFilter
    permission_classes = (BlogPermission,)

    # only superuser can post and delete
    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            return [IsAdminUser()]
        return [AllowAny()]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="title",
                location=OpenApiParameter.QUERY,
                description="Title contains",
                type=OpenApiTypes.STR,
            ),
            OpenApiParameter(
                name="created_at_begin",
                location=OpenApiParameter.QUERY,
                description="Created at (start date)",
                type=OpenApiTypes.DATE,
            ),
            OpenApiParameter(
                name="created_at_end",
                location=OpenApiParameter.QUERY,
                description="Created at (end date)",
                type=OpenApiTypes.DATE,
            ),
            OpenApiParameter(
                name="updated_at_begin",
                location=OpenApiParameter.QUERY,
                description="Updated at (start date)",
                type=OpenApiTypes.DATE,
            ),
            OpenApiParameter(
                name="updated_at_end",
                location=OpenApiParameter.QUERY,
                description="Updated at (end date)",
                type=OpenApiTypes.DATE,
            ),
            OpenApiParameter(
                name="likes_begin",
                location=OpenApiParameter.QUERY,
                description="Minimum likes",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="likes_end",
                location=OpenApiParameter.QUERY,
                description="Maximum likes",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="views_begin",
                location=OpenApiParameter.QUERY,
                description="Minimum views",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="views_end",
                location=OpenApiParameter.QUERY,
                description="Maximum views",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="deleted",
                location=OpenApiParameter.QUERY,
                description="Deleted",
                type=OpenApiTypes.BOOL,
            ),
            OpenApiParameter(
                name="tags",
                location=OpenApiParameter.QUERY,
                description="Tag IDs",
                type={
                    "type": "array",
                    "minItems": 4,
                    "maxItems": 6,
                    "items": {"type": "number"},
                },
            ),
            OpenApiParameter(
                name="category",
                location=OpenApiParameter.QUERY,
                description="Category ID",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="like_order",
                location=OpenApiParameter.QUERY,
                description="Order by likes",
                type=OpenApiTypes.STR,
                enum=["asc", "desc"],
            ),
            OpenApiParameter(
                name="view_order",
                location=OpenApiParameter.QUERY,
                description="Order by views",
                type=OpenApiTypes.STR,
                enum=["asc", "desc"],
            ),
            OpenApiParameter(
                name="title_order",
                location=OpenApiParameter.QUERY,
                description="Order by title",
                type=OpenApiTypes.STR,
                enum=["asc", "desc"],
            ),
        ]
    )
    def list(self, request):
        # declare request parameter using a class
        # can add contidion such as deleted=False, title pattern search, order by created_at etc.
        # Title filter
        filter_fields = BlogFilterField()
        filters = {}
        if filter_fields.title in request.query_params:
            filters["title__icontains"] = request.query_params[filter_fields.title]

        # Created at filters
        if filter_fields.created_at_begin in request.query_params:
            filters["created_at__gte"] = request.query_params[
                filter_fields.created_at_begin
            ]
        if filter_fields.created_at_end in request.query_params:
            filters["created_at__lte"] = request.query_params[
                filter_fields.created_at_end
            ]

        # Updated at filters
        if filter_fields.updated_at_begin in request.query_params:
            filters["updated_at__gte"] = request.query_params[
                filter_fields.updated_at_begin
            ]
        if filter_fields.updated_at_end in request.query_params:
            filters["updated_at__lte"] = request.query_params[
                filter_fields.updated_at_end
            ]

        # Likes filters
        if filter_fields.likes_begin in request.query_params:
            filters["likes__gte"] = request.query_params[filter_fields.likes_begin]
        if filter_fields.likes_end in request.query_params:
            filters["likes__lte"] = request.query_params[filter_fields.likes_end]

        # Views filters
        if filter_fields.views_begin in request.query_params:
            filters["views__gte"] = request.query_params[filter_fields.views_begin]
        if filter_fields.views_end in request.query_params:
            filters["views__lte"] = request.query_params[filter_fields.views_end]

        # Deleted filter
        if filter_fields.deleted in request.query_params:
            filters["deleted"] = request.query_params[filter_fields.deleted]

        # Tags filter
        tag_ids = request.query_params.getlist("tags")
        if tag_ids:
            filters["tags__in"] = tag_ids

        # Category filter
        if filter_fields.category in request.query_params:
            filters["category"] = request.query_params[filter_fields.category]
        queryset = Blog.objects.filter(deleted=False, **filters)

        # Order by
        ordering = []
        if filter_fields.like_order in request.query_params:
            ordering.append(
                f"{'' if request.query_params[filter_fields.like_order] == 'asc' else '-'}likes"
            )
        if filter_fields.view_order in request.query_params:
            ordering.append(
                f"{'' if request.query_params[filter_fields.view_order] == 'asc' else '-'}views"
            )
        if filter_fields.title_order in request.query_params:
            ordering.append(
                f"{'' if request.query_params[filter_fields.title_order] == 'asc' else '-'}title"
            )

        if ordering:
            queryset = queryset.order_by(*ordering)

        serializer = BlogDataSerializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(request=BlogUploadSerializer)
    def create(self, request):
        serializer = BlogUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    # increase view count
    @action(detail=False, methods=["get"], url_path="view/(?P<pk>[^/.]+)")
    def view(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        blog.views += 1
        blog.save()
        return Response(status=204)

    # increase like count do not change update time
    @action(detail=False, methods=["get"], url_path="like/(?P<pk>[^/.]+)")
    def like(self, request, pk):
        blog = get_object_or_404(Blog, pk=pk)
        blog.likes += 1
        blog.save()
        return Response(status=204)

    # get blog detail using uri field
    @action(detail=False, methods=["get"], url_path="uri/(?P<uri>[^/.]+)")
    def get_by_uri(self, request, uri=None):
        blog = get_object_or_404(Blog, uri=uri)

        if blog.deleted:
            return Response(status=404)
        else:
            return Response(BlogDetailSerializer(blog).data)
        
    @action(detail=False, methods=["get"], url_path="file/(?P<pk>[^/.]+)")
    def get_blog_text_file(self, request, pk):
        # retrieve blog md from storage
        blog = get_object_or_404(Blog, pk=pk)
        file = MinioMediaStorage().open(blog.files.name).read()
        return HttpResponse(file, content_type="text/plain")
    
    # get blog from uri and get image from storage
   
    @action(detail=False, methods=["get"], url_path="image/(?P<uri>[^/.]+)")
    def get_blog_image_file(self, request, uri):
        # Get the `path` query parameter
        path = request.query_params.get("path")
        # Get the image from the storage
        path = get_object_or_404(Blog, uri=uri).files.name

        path = os.path.dirname(path)
        filename = request.query_params.get("url")
        print(f"{path}/{filename}")
        
        # if path is not found return 404
        try:
            file = MinioMediaStorage().open(f"{path}/{filename}").read()
        except Exception as e:
            print(e)
            return Response(status=404)

        return HttpResponse(file, content_type="image/jpeg")
        
        


class CategorySet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilter
    permission_classes = (CategoryPermission,)

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
    permission_classes = (TagPermission,)

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
