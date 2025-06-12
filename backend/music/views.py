from urllib import response

from django.http import HttpResponse, JsonResponse
from music.jellyfin.jellyfinProvider import JellyfinProvider

jellyfin = JellyfinProvider()


def list_music(request):
    a = jellyfin.list_music()
    data = []
    for s in a:
        data.append({"name": s.name, "id": s.id})
    print(data)
    return JsonResponse(data, safe=False)


def get_lrc(request):
    return jellyfin.get_music_lrc(request.id)


def get_cover(request):
    return jellyfin.get_music_cover(request.id)


def get_stream(request):
    return jellyfin.get_music_audio(request.id)
