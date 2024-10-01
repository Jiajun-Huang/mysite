import datetime
from logging import Filterer
from typing import List

from django.shortcuts import render
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes, extend_schema
from rest_framework import decorators, response, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import *
from .serializers import *

# Create your views here.


class CommentFilter(Filterer):
    class Meta:
        model = Comment
        fields = {
            "content": ["icontains"],
            "created_at": ["gte", "lte"],
            "updated_at": ["gte", "lte"],
            "deleted": ["exact"],
            "blog": ["exact"],
            "user": ["exact"],
        }


class RootCommentType:
    def __init__(self, root_comment: Comment, replies: List[Comment] = []):
        self.root_comment = root_comment
        self.replies = replies

    def __str__(self):
        return f"Root Comment: {self.root_comment}, Replies: {self.replies}"

    def toString(self):
        return f"Root Comment: {self.root_comment}, Replies: {self.replies}"


class CommentPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif request.method == "POST":
            return request.user.is_authenticated
        return request.user.is_admin

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        elif request.method == "PUT":
            return (
                request.user.is_authenticated and request.user == obj.user
            ) or request.user.is_admin
        elif request.method == "DELETE":
            return request.user.is_admin
        return False


class CommentSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    filter_class = CommentFilter
    serializer_class = CommentSerializer
    permission_classes = [CommentPermission]

    def get_serializer_class(self):
        if self.action == "create":
            return CommentCreateRequestSerializer
        return CommentSerializer

    @extend_schema(request=CommentCreateRequestSerializer, responses=CommentSerializer)
    def create(self, request, *args, **kwargs):
        serializers_class = CommentCreateRequestSerializer(data=request.data)
        user = request.user

        if serializers_class.is_valid():
            # get the user from the request auth token
            serializers_class.save(user=user)
            response_serializer = CommentSerializer(serializers_class.instance)
            # return the full data of the created comment
            return response.Response(response_serializer.data, status=201)
        return response.Response(serializers_class.errors, status=400)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="type",
                location=OpenApiParameter.QUERY,
                description="type enum",
                type=OpenApiTypes.INT,
                required=False,
            ),
            OpenApiParameter(
                name="blog",
                location=OpenApiParameter.QUERY,
                description="blog id",
                type=OpenApiTypes.INT,
            ),
        ]
    )
    @action(detail=False, methods=["GET"], url_path="get-comments")
    def get_comments(self, request):
        type = request.query_params.get("type")
        blog = request.query_params.get("blog")

        if type is not None and int(type) != 0:
            comments = Comment.objects.filter(type=type, root=None).order_by(
                "-created_at"
            )
        else:
            comments = Comment.objects.filter(blog=blog, root=None).order_by(
                "-created_at"
            )

        serializer = CommentNestedSerializer(comments, many=True)
        return response.Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                location=OpenApiParameter.QUERY,
                description="comment id",
                type=OpenApiTypes.INT,
            )
        ]
    )
    @action(detail=False, methods=["GET"], url_path="get-comment")
    def get_comment(self, request):
        comment_id = request.query_params.get("id")
        comment = Comment.objects.get(id=comment_id)
        serializer = CommentNestedSerializer(comment)
        return response.Response(serializer.data)
