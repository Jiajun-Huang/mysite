from urllib import response

from django.http import HttpResponse, JsonResponse
from music.jellyfin.jellyfinProvider import JellyfinProvider

jellyfin = JellyfinProvider()


def list_music(request):
    a = jellyfin.list_music()
    data = []
    for s in a:
        data.append({"name": s.name, "id": s.id, "artist": s.artist})
    print(data)
    return JsonResponse(data, safe=False)


def get_lrc(request, id):
    lrc_bytes = jellyfin.get_music_lrc(id)
    return HttpResponse(lrc_bytes, content_type="text/plain; charset=utf-8")


def get_cover(request, id):
    print(id)
    image_bytes = jellyfin.get_music_cover(id)
    return HttpResponse(image_bytes, content_type="image/jpeg")  # Or image/png


def get_stream(request, id):
    audio_bytes = jellyfin.get_music_audio(id)
    return HttpResponse(
        audio_bytes, content_type="audio/mpeg"
    )  # Or audio/flac, audio/wav depending on format
