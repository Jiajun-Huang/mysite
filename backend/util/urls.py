from django.urls import path

from .storage_proxy_views import minio_media_proxy

urlpatterns = [
    path('media/proxy/<str:path>/', minio_media_proxy, name='minio_media_proxy'),
]