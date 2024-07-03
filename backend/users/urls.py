"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from allauth.socialaccount.providers.github import views as github_views
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from users.views import *

router = routers.DefaultRouter()
router.register(r'user', UserProfileViewSet)

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/github/', GitHubLogin.as_view(), name='github_login'),
    path('auth/github/url/', custom_oauth2_login, name='github_url'),
    path('auth/github/callback', github_callback, name='github_callback'),
    path('', include(router.urls)),
    # path('accounts/', include('allauth.urls')),
]