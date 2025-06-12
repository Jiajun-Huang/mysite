import music.views as views
from django.urls import path

urlpatterns = [
    # path('kugou/<str:id>/', views_save.kugou_url, name='kugou_url'),
    # path('kugou/lrc/<str:song_id>.lrc/', views_save.kugou_lrc, name='kugou_lrc'),
    # path('wyy/<str:song_id>/', views_save.wyy_url, name='wyy_url'),
    # path('wyy/lrc/<str:song_id>.lrc/', views_save.wyy_lrc, name='wyy_lrc'),
    # path('qqmusic/<str:song_id>/', views_save.qqmusic_url, name='qqmusic_url'),
    # path('qqmusic/lrc/<str:song_id>.lrc/', views_save.qqmusic_lrc, name='qqmusic_lrc'),
    # path('kuwo/<str:song_id>/', views_save.kuwo_url, name='kuwo_url'),
    # path('kuwo/lrc/<str:song_id>.lrc/', views_save.kuwo_lrc, name='kuwo_lrc'),
    # path('kuwo/random_music_list/', views_save.kuwo_random_list, name='kuwo_random_list'),
    # path('music/songlist/', views_save.music_songlist, name='music_songlist'),
    path("songlist/", views.list_music),
    path("audio/<str:id>/", views.get_stream, name="songlist"),
    path("cover/<str:id>/", views.get_cover),
    path("lrc/<str:id>/", views.get_lrc),
]
