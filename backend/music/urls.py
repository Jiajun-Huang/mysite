import music.views as views
from django.urls import path

urlpatterns = [
    path('kugou/<str:song_id>/', views.kugou_url, name='kugou_url'),
    path('kugou/lrc/<str:song_id>.lrc/', views.kugou_lrc, name='kugou_lrc'),
    path('wyy/<str:song_id>/', views.wyy_url, name='wyy_url'),
    path('wyy/lrc/<str:song_id>.lrc/', views.wyy_lrc, name='wyy_lrc'),
    path('qqmusic/<str:song_id>/', views.qqmusic_url, name='qqmusic_url'),
    path('qqmusic/lrc/<str:song_id>.lrc/', views.qqmusic_lrc, name='qqmusic_lrc'),
    path('kuwo/<str:song_id>/', views.kuwo_url, name='kuwo_url'),
    path('kuwo/lrc/<str:song_id>.lrc/', views.kuwo_lrc, name='kuwo_lrc'),
    path('kuwo/random_music_list/', views.kuwo_random_list, name='kuwo_random_list'),
    path('music/songlist/', views.music_songlist, name='music_songlist'),
]
