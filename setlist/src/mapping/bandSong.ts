import { IBandSong, ISong } from "../models";
import { GUID_EMPTY } from "../Util";
import { IBandSongResource } from "../resource";
import { Song } from ".";

export class BandSong implements IBandSong {
    Popularity: number;
    SongId: string;
    BandId: string;
    Song: ISong;
    Id: string;
    Title: string;

    constructor({ title, popularity, song, id = GUID_EMPTY, songId = GUID_EMPTY, bandId = GUID_EMPTY }: { title: string; popularity: number; song: ISong; id?: string; songId?: string; bandId?: string; },) {
        this.Title = title
        this.Id = id;
        this.Popularity = popularity;
        this.SongId = songId;
        this.BandId = bandId;
        this.Song = song;
    }

    public static Create({ title, popularity, song, id, songId, bandId }: { title: string; popularity: number; song: ISong; id?: string; songId?: string; bandId?: string; }): IBandSong {
        const bandSong = new BandSong({ title, popularity, song, id, songId, bandId })
        const { Title, Id, SongId, Song, BandId, Popularity } = bandSong

        return { Title, Id, SongId, Song, BandId, Popularity } as IBandSong
    }

    public static ToResource(bandSong: IBandSong): IBandSongResource {
        const { Popularity, Id, SongId, BandId } = bandSong;
        return { Id, BandId, SongId, Popularity } as IBandSongResource
    }

    public static FromResource(resource: IBandSongResource): IBandSong {
        const { Id, BandId, SongId, Song: resourceSong, Popularity } = resource;

        const song = resourceSong !== undefined && resourceSong !== null ? Song.FromResource(resourceSong) : Song.EmptySong()

        return BandSong.Create(
            {
                title: song.Title,
                popularity: Popularity,
                song,
                id: Id,
                songId: SongId,
                bandId: BandId
            }
        )
    }

    public static EmptyBandSong(): IBandSong {
        return BandSong.Create(
            { title: "", popularity: 0, song: Song.EmptySong(), id: "", songId: "", bandId: "" })
    }


}