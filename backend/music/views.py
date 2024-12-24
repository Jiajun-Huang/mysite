import json

import music.musicapi as musicapi
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse

qq_cookie = ""

wyy_cookie = "NMTID=00OrB1W5Chca5uc4E5zoY8fAmqsZoUAAAGT974q1Q; _ntes_nnid=eb58bddf0c6d8271a3f1c4c58e6cb5ab,1735028257285; _ntes_nuid=eb58bddf0c6d8271a3f1c4c58e6cb5ab; WEVNSM=1.0.0; WNMCID=ljdrjy.1735028258624.01.0; WM_NI=ZxEwLE9H5jQJ9vr1QKglqpIyF0DaH%2BMOXY9P6epDgsFXsebvNiCSpm9D%2Bwbu4XNJUMt%2Flivp6IlnKMijBavOeu%2BH4nFLe0a7duE8mbTXbtqXbOKAlCIlXpyhOwsfhWusUDc%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb2f46faba7888cf75d828e8fa3c14a929e8e86c750edace19bae3c90a8a6b2cf2af0fea7c3b92a9aa88b98cf4ffb98fb8bd442fbaabed2d441a5b4bf91cc7386f08c82cb218f9198babc5cf6bbc0a5e6798688bd86e17e8eb78db4f367fb9ce598e17ff88882abd847b8f1a48af57cf697a48fca47abb68e82f545a7abe5a9b7668694abd1e43da8ab8bd9f06a9888ae95f454a29185a2ef498bb49891fc648da9bd87eb5db7ad9ba5e237e2a3; WM_TID=fuIn67dTFndFBBFBUUKWG%2Btq3r0PgiAa; __snaker__id=uPuYzp2Lt25zF5lW; gdxidpyhxdE=jEKzyLKoyKx72hylURaTTiS2%2FQRf%2FHgp6RtI3PExDlTBdmicNgjpBfyD1ejLvYAZ5nbKlDOaSIcYc1JlOefAIaw8jBjcHRkAvlT0MhoNOvEGPZeVJca0%2FTHgn46%2FM7eUOBScVH7otwSzgTKC4xGHIqVpRnVib2z2P8jLQ%2BgVpuSZxum3%3A1735029162970; sDeviceId=YD-qwHiU%2BwaYnpFAkFUREOCH7tvj%2Fw0Z%2FRs; ntes_utid=tid._.sBFQVvT35vFER1UEEQbDTq4uiq11YqVg._.0; MUSIC_U=000AB35CEEDEF8D00E68F889D72C769318FC8CFB7399781DAE89323DB7880BB84B8F1CA1FE53232FC3DF394B634063FC8919CB6AFD212DA9D13C469165B13A2F47F88082ED691034159D57821199AD88D9C92B25A370F5E478E4FEC0EB683D12A72178C884964D82962E833CA0D1E2078F70F1588315648AA6B2A5DB9DAB3912C6A894F6E4E9F62F961339D9E04DB26066EBDD82B4186C7203898376788EF0F2E28B65126D2F3AFAE2007D9A9423DDC83AC088D5C777818B7646D17AD04E03F13AB582F2C4B25D8E059DD7B3DF75A4E5022C154C9A52242695BF56CECD0F8F9B970C7CB324D744E7FE3A39AD5D64B0BEDBD12C2ECC43F571E96B494DFAEC1BF17728F4EE0311E50FA816C662D162C579ADDE902D5CC92953C46AE0A525669352D1419B0B301B87613A31217040886B4AE6F04DA1B6908B6F4DA967DB95BAB64007FFCF7A937B98BAFF2E7DC46C8AFFD188F3183FE67BF5ED13207E12F40BAD6D32; __csrf=d16b836faeb9f32759f603a0ba54b689; ntes_kaola_ad=1; JSESSIONID-WYYY=O%5CPUnxQ1QFYZdV2DzTbTba4PFsrshvoA4nTYtvabkE%2FSen8xW%2FwT%2FVFteA%2F0J%2Ba4brnlun91rHKI%2FPAEXkTu6mOHq8sZYHWA3C%2Fez3Q7Nnpsw%2FyswXKF7Thj%2BVh%2FZaP16W44svwowdzTICaM598Dq04zJY%2FUpCvmDOzAiDebwbOgTDtk%3A1735030503543; _iuqxldmzr_=33; playerid=94825387"


def get_callback_url(request):
    protocol = request.headers.get("X-Forwarded-Proto", request.scheme) or request.scheme
    host = request.headers.get("X-Forwarded-Host") or request.headers.get("Host")
    
    if not host:
        host = "localhost:8000"
    host = host + "/api"
    HOST = protocol + '://' + host + '/'
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
