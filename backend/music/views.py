import json

import music.musicapi as musicapi
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

qq_cookie = ""

wyy_cookie = ""


def get_callback_url(request):
    protocol = request.scheme
    HOST = protocol + '://' + request.headers.get('X-Forwarded-Host') + '/'
    return HOST

def set_no_cache(res):
    print("sdfsdfsdfsdf")
    try:
        response = HttpResponseRedirect(res, status=301)
    except:
        print(res)
        response = HttpResponse(json.dumps(res), content_type='application/json; charset=utf-8')
        return response

    response['Cache-Control'] = "no-cache, no-store, must-revalidate"
    response['Expires'] = "0"
    response['Pragma'] = "no-cache"
    response['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8"
    return response


def kugou_url(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_kugou(song_id, HOST)
    ret = music_api.get_kugou_url(song_id)
    return set_no_cache(ret)


def kugou_lrc(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_kugou(song_id, HOST)
    ret = music_api.get_kugou_lrc(song_id)
    return HttpResponse(ret, content_type='text/plain; charset=utf-8')


def wyy_url(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_wyy('')
    music_api.MusicApi_set_cookie(wyy_cookie)
    ret = music_api.get_wyy_url(song_id)
    return set_no_cache(ret)


def wyy_lrc(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_wyy('')
    music_api.MusicApi_set_cookie(wyy_cookie)
    ret = music_api.get_wyy_lrc(song_id)
    return HttpResponse(ret, content_type='text/plain; charset=utf-8')


def qqmusic_url(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_qq('')
    music_api.MusicApi_set_cookie(qq_cookie)
    ret = music_api.get_qq_url(song_id)
    return set_no_cache(ret)


def qqmusic_lrc(request, song_id):
    HOST = get_callback_url(request)
    music_api = musicapi.MusicApi_qq('')
    music_api.MusicApi_set_cookie(qq_cookie)
    ret = music_api.get_qq_lrc(song_id)
    return HttpResponse(ret, content_type='text/plain; charset=utf-8')


def kuwo_url(request, song_id):
    HOST = request.get_host()
    music_api = musicapi.MusicApi_kuwo('')
    ret = music_api.get_kuwo_url(song_id)
    return set_no_cache(ret)


def kuwo_lrc(request, song_id):
    HOST = request.get_host()
    music_api = musicapi.MusicApi_kuwo('')
    ret = music_api.get_kuwo_lrc(song_id)
    return HttpResponse(ret, content_type='text/plain; charset=utf-8')


def kuwo_random_list(request):
    HOST = request.get_host()

    music_api = musicapi.MusicApi_kuwo('', HOST)
    ret = music_api.random_music_list
    return JsonResponse(ret, safe=False)


def music_songlist(request):
    server = request.GET.get('server', '')
    t_id = request.GET.get('id', '')
    protocol = request.scheme
    HOST = protocol + '://' + request.headers.get('X-Forwarded-Host') + '/' + "api/"
    print(request.headers)
    music_info = musicapi.MusicApi_kuwo(t_id)
    music_info.HOST = HOST
    if server and t_id:
        if server == 'kugou':
            resp = music_info.get_kugou_list
        elif server == 'wyy':
            music_info.MusicApi_set_cookie(wyy_cookie)
            resp = music_info.get_wyy_list
        elif server == 'qqmusic':
            music_info.MusicApi_set_cookie(qq_cookie)
            resp = music_info.get_qq_list
        elif server == 'kuwo':
            resp = music_info.get_kuwo_list
        else:
            resp = {'msg': '暂不支持此平台'}
    else:
        resp = {'msg': server}
    
    return JsonResponse(resp, json_dumps_params={'ensure_ascii': False}, safe=False)
