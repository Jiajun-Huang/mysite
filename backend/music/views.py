import json

import music.musicapi as musicapi
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

qq_cookie = ""

wyy_cookie = "MUSIC_A_T=1464702467470; MUSIC_R_T=1464702604011; NMTID=00OeXfjn2Ajx4jo4kbJtvv9cd4JoxcAAAGT4eV8fg; JSESSIONID-WYYY=yGnspn%2BRg%2BOqRvm%2BhsobXlseJq%2BeCdqVMTiONKH0p1NxkR4jYxyED%2BnJQ6VKXsvuTxmxrYmROinG3vl%2FCae3y4eGXOOqrNmBw7rozxaNGcQNYyIwpnPOe3xi%2BZFQu1R%2BzRu%2B%2FyQmZ04dvrW%2B3UuV12qnHkd4Oe2AyxSWd8%2FhittaBCgn%3A1734663532797; _iuqxldmzr_=32; _ntes_nnid=63f2aa02083e8d31de393d78ac65f814,1734661732818; _ntes_nuid=63f2aa02083e8d31de393d78ac65f814; WM_NI=rTU2BdnCeTh58dkPYS10vIwUj1Sv%2F94u7ax6giIy5WpuvEKI7e0EWW3SP%2BrNgYxXCmmT01snBcNlmWKrcmmNJ6ITRcDaI7qTjoneNCOirnnYpyh0F15He8nrgvUjFMbUam4%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeabf342a887beb8bb7db6968aa3c54a829a9f82c744b3b99896c26b8cb5aab0f12af0fea7c3b92ab28c9bd3c170ae9dabb5eb3ffcbca5b1dc59f3f0baaaf65faaef9d97ae33f8abf982fb3ea5b7879ab85db4abbaa6ca43f5bb00a6d65df18da0ccf146a587b8b9c267af8c00d2f26682bd828df05d89aead8ef0468aea87b5d16988bf87d8f460aab1a286cd498db7be8fed53b4a7a8d1c53bf798abd9ed7aa5aa9b8bc547a28baf8eb737e2a3; WM_TID=IGaZ6J4jXiBFAURFAAODDvgWvCOGwPbr; ntes_utid=tid._.B%252BItRs6AntlAF1QBQEPXHuxSqHOCh1GA._.0; sDeviceId=YD-3fTlAPE8UupFEgEUQAeCHqwGrCbT0xGD; __snaker__id=KF8eIvh15YIBjE8x; gdxidpyhxdE=%2FWeL1t6v%2BuAQh6JqonhDrSmz4zjbpAJ%5CkTlBbjfqOIaWylQYnIOpDHuN5La%2Fq8PGwkJdXDrR15IkE5RuMzDODp%2BqcQZon%5C8L%2FxqpjWl3EIU9B%2F2nK%2BdNIwwvAE1iAXfLKRzbOCWqVU7JyUjd5fS9ZfqYXdJNYyiiO4huubgwb1o6M2Tp%3A1734662640675; WEVNSM=1.0.0; WNMCID=msagfh.1734661751039.01.0; ntes_kaola_ad=1; playerid=39650279; MUSIC_U=002E69884357E181A3EF0477CF91CDA8932444D528745C938025C8B89D3B0B636DD274FAB8B68B8451F502CA0278AA5F3969F7057252E19C1CCA25512EE39F6B3F38D895D13C8FF8311CC2F880F25048868E0BA65AB9A4D62F172808F509F4EF3873EC7DBBC09805F1ADF8C51D6D2279B0A7BBACB4FBAD2AB20DA9BA62A3913FCCD9AC9E3495165B57E099594D134C138271C7687750F2D5B88F8D45C05995D5B6BCC0D0F3C50C0F737F30D503142BC7B73F54ACC405F6F9103E170C0AFA5AC86208469A1E491E81A5956CB245A390EE2F4A4420B1CC22EC46D5CFFC8296997F919EF2E879B1A1EF57CC23B04CCD5D543F74780CD27C1D3006750DEE3FADE5F3B49DF30082705928827752D5A6DC991E847CD70617A6DA5788420BF1AB1CE9F0B5296C0D36317B64A9CDC259093E7FF7E914DCD6070F97666A292AAF11AC7D5F55; __csrf=241603f5ee09191efee5751da937865f"


def get_callback_url(request):
    protocol = request.headers.get("X-Forwarded-Proto", request.scheme) or request.scheme
    host = request.headers.get("X-Forwarded-Host") or request.headers.get("Host")
    
    if not host:
        host = "localhost:8000"
    host = host + "/api"
    HOST = protocol + '://' + host
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
    HOST = get_callback_url(request)
    print(HOST )
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
