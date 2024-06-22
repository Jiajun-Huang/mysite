# from dj_rest_auth.registration.views import RegisterView
# from .serializers import CustomRegisterSerializer
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView,SocialConnectView
from django.urls import reverse
# https://michaeldel.github.io/posts/django-rest-auth-social-tutorial/
class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
    @property
    def callback_url(self):
        # use the same callback url as defined in your GitHub app, this url
        # must be absolute:
        return self.request.build_absolute_uri(reverse('github_callback'))

import urllib.parse

from django.shortcuts import redirect

def github_callback(request):
    params = urllib.parse.urlencode(request.GET)
    return redirect(f'https://frontend/auth/github?{params}')