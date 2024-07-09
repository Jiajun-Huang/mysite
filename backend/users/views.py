# from dj_rest_auth.registration.views import RegisterView
# from .serializers import CustomRegisterSerializer
import urllib.parse

from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView, SocialLoginView
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes, extend_schema
from minio_storage.storage import MinioMediaStorage
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import Profile
from .serializers import UserProfileSerializer


# https://michaeldel.github.io/posts/django-rest-auth-social-tutorial/
class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
    # github_callback = "http://localhost:8080/api/auth/callback/github/"
    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        print("callback_url")

        return "http://localhost:8080/api/auth/callback/github/"
    


def custom_oauth2_login(request, *args, **kwargs):
    # Call the original oauth2_login view
    # print(str(request))
    # get request url
    
    response = github_views.oauth2_login(request, *args, **kwargs)
    
    # make request to github
    url = response.headers['Location']

    # send the url to the frontend as a 200 response
    print(url)
    header = {"url": url}
    
    # http response with the 
    return HttpResponse(url, headers=header)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    storage = MinioMediaStorage()


    # get the user avatar
    @extend_schema(
            parameters=[OpenApiParameter(name='user', location=OpenApiParameter.QUERY, description="User ID", type=OpenApiTypes.INT)]
        )
    @action(detail=False, methods=['GET'])
    def avatar(self, request):
        user_id = request.query_params.get('user')
        social_account = SocialAccount.objects.filter(user_id=user_id).first()
        if social_account:
            return HttpResponseRedirect(social_account.get_avatar_url())

        try:
            profile = Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            return HttpResponse(status=404)
        
        if profile.avatar:
            with self.storage.open(profile.avatar.name) as f:
                return HttpResponse(f.read(), content_type='image/jpeg')
        
        return HttpResponse(status=404)


def github_callback(request):
    params = urllib.parse.urlencode(request.GET)
    return redirect(f'http://localhost:3000/callback/github/?{params}')