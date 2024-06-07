# from dj_rest_auth.registration.views import RegisterView
# from .serializers import CustomRegisterSerializer

# def update_avatar(request):
#     if request.method == 'POST':
#         user = request.user
#         user.profile.avatar = request.FILES.get('avatar')
#         user.profile.save()
#         return Response({"message": "Avatar updated successfully"}, status=status.HTTP_200_OK)
#     return Response({"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)
