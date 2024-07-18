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
    path('auth/github/callback/', github_callback, name='github_callback'),
    path('', include(router.urls)),
    # path('accounts/', include('allauth.urls')),
]