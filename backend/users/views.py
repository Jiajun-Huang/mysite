# from dj_rest_auth.registration.views import RegisterView
# from .serializers import CustomRegisterSerializer
import urllib.parse

from allauth.socialaccount.models import SocialAccount, SocialApp
from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView, SocialLoginView
from django.core.files.storage import default_storage
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
# https://www.freecodecamp.org/news/set-up-github-oauth-on-django-for-user-authentication/

# if you get the code but login fails, you can use this view to get the url 
# https://github.com/iMerica/dj-rest-auth/issues/525

class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client

    # needs to match the callback url in your GitHub app settings
    # gets called after the user logs in with GitHub, needs to match the callback host
    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        call_b = SocialApp.objects.get(provider="github").sites.first()
        return call_b

# will make url for oauth2 login to github with redirect url 
def custom_oauth2_login(request, *args, **kwargs):
    # Call the original oauth2_login view
    if "HTTP_X_FORWARDED_HOST" in request.META:
        request.META["HTTP_HOST"] = request.META["HTTP_X_FORWARDED_HOST"]
    if "HTTP_X_FORWARDED_PROTO" in request.META:
        request.META["wsgi.url_scheme"] = request.META["HTTP_X_FORWARDED_PROTO"]    
        
    response = github_views.oauth2_login(request, *args, **kwargs)

    # make request to github
    url = response.headers["Location"]

    # send the url to the frontend as a 200 response
    header = {"url": url}

    # http response with the
    return HttpResponse(url, headers=header)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    storage = MinioMediaStorage()

    # get the user avatar
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="user",
                location=OpenApiParameter.QUERY,
                description="User ID",
                type=OpenApiTypes.INT,
            )
        ]
    )
    @action(detail=False, methods=["GET"])
    def avatar(self, request):
        user_id = request.query_params.get("user")
        social_account = SocialAccount.objects.filter(user_id=user_id).first()
        if social_account:
            return HttpResponseRedirect(social_account.get_avatar_url())

        try:
            profile = Profile.objects.get(user_id=user_id)
        except Profile.DoesNotExist:
            return HttpResponse(status=404)

        if profile.avatar:
            with self.storage.open(profile.avatar.name) as f:
                return HttpResponse(f.read(), content_type="image/jpeg")

        return HttpResponse(status=404)


# the url path to here needs to match the callback url in your GitHub app settings
# the url it points to is the url of the frontend which will do the login
def github_callback(request):
    params = urllib.parse.urlencode(request.GET)
    protocol = request.headers.get("X-Forwarded-Proto", request.scheme) or request.scheme
    host = request.headers.get("X-Forwarded-Host") or request.headers.get("Host")
    redirect_site = f"{protocol}://{host}/callback/github"
    # redirect_site = "http://localhost:3000/callback/github"
    return redirect(f"{redirect_site}/?{params}")
