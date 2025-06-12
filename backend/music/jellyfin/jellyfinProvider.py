from attr import dataclass
from openapi_client import *
from openapi_client.models import lyric_dto


@dataclass()
class MusicInfo:
    # audio_url:str
    # lrc_url:str
    # cover_url:str
    name: str
    artist: str
    id: str


LRC_FORMAT = "[{}] {}\n"
TICK_RATE = 10000000


def ticks_to_lrc_format(ticks: int) -> str:
    if ticks is None:
        return ""
    total_seconds = ticks / TICK_RATE
    minutes = int(total_seconds // 60)
    seconds = int(total_seconds % 60)
    hundredths = int((total_seconds - int(total_seconds)) * 100)
    return f"{minutes:02d}:{seconds:02d}.{hundredths:02d}"


class JellyfinProvider:

    def __init__(self):
        config = Configuration(
            host="http://192.168.1.5:8096",
            api_key={
                "CustomAuthentication": 'Mediabrowser Token="b1eb20cce0cd49bab507ab782adf201e"'
            },
        )

        api_client = ApiClient(configuration=config)
        self.api_client = api_client

        item_api = ItemsApi(api_client=api_client)
        user_api = UserApi(api_client=api_client)
        user_item_api = UserLibraryApi(api_client=api_client)

        result = user_api.get_current_user()

        user_id = result.id
        server_id = result.server_id

        all_folder = item_api.get_items().items
        music_folder = None
        for folder in all_folder:
            if folder.name == "Music":
                music_folder = folder

        self.music_folder = item_api.get_items(parent_id=music_folder.id).items

        return

    def list_music(self):
        ret: list[MusicInfo] = []
        for item in self.music_folder:
            i = MusicInfo(name=item.name, artist=item.artists, id=item.id)
            ret.append(i)

        return ret

    def get_music_audio(self, id):
        audio_api = AudioApi(self.api_client)
        b = audio_api.get_audio_stream(item_id=id, static=True, container="mp3")
        return b

    def get_music_lrc(self, id):
        lyric = LyricsApi(api_client=self.api_client).get_lyrics(item_id=id)
        ret = ""

        for line in lyric.lyrics:
            line = LRC_FORMAT.format(ticks_to_lrc_format(line.start), line.text)
            ret += line
        return ret

    def get_music_cover(self, id):
        try:
            cover = ImageApi(api_client=self.api_client).get_item_image(
                item_id=id, image_type=ImageType.PRIMARY
            )
        except Exception:
            return b""

        return cover


if __name__ == "__main__":
    j = JellyfinProvider()

    musics = j.list_music()

    for m in musics:
        s = j.get_music_audio(m.id)

        l = j.get_music_lrc(m.id)

        i = j.get_music_cover(m.id)
