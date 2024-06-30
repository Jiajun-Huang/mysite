# from dj_rest_auth.registration.views import RegisterView
# from .serializers import CustomRegisterSerializer
import urllib.parse

from allauth.socialaccount.providers.github import views as github_views
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView, SocialLoginView
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
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
    


def custom_oauth2_login(request, *args, **kwargs):
    # Call the original oauth2_login view
    response = github_views.oauth2_login(request, *args, **kwargs)
    
    # make request to github
    url = response.headers['Location']

    # send the url to the frontend as a 200 response
    print(url)
    header = {"url": url}
    
    # http response with the 
    return HttpResponse(url, headers=header)
    




def github_callback(request):
    params = urllib.parse.urlencode(request.GET)
    return redirect(f'http://localhost:3000/callback/github/?{params}')