from soundcloud import SoundCloud

sc = SoundCloud(
    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0"
)

a = sc.get_playlist(playlist_id="2024268717")
print(a)

for track in a.tracks:
    print(track.title)
    print(track.permalink_url)
    print(track.description)
    print(track.duration)
    print(track.created_at)
    print(track.downloadable)
    print("-----")


a = sc.get_track(track_id="971794249")

print(a.title)
print(a.permalink_url)
print(a.description)
print(a.duration)
print(a.created_at)
print(a.updated_at)         

a = sc.get_track_original_download(track_id="971794249")
print(a)
