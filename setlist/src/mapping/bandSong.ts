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

    constructor(title: string, popularity: number, song: ISong, id: string = GUID_EMPTY, songId: string = GUID_EMPTY, bandId: string = GUID_EMPTY,) {
        this.Title = title
        this.Id = id;
        this.Popularity = popularity;
        this.SongId = songId;
        this.BandId = bandId;
        this.Song = song;
    }

    public static Create(title: string, popularity: number, song: ISong, id?: string, songId?: string, bandId?: string): IBandSong {
        const bandSong = new BandSong(title, popularity, song, songId, bandId, id)
        const { Title, Id, SongId, Song, BandId, Popularity } = bandSong

        return { Title, Id, SongId, Song, BandId, Popularity } as IBandSong
    }

    public static FromResource(resource: IBandSongResource): IBandSong {
        const { Id, BandId, SongId, Song, Popularity } = resource;
        return BandSong.Create(Song.Title, Popularity, Song, Id, SongId, BandId)
    }

    public static EmptyBandSong(): IBandSong {
        return BandSong.Create(
            "",
            0,
            Song.EmptySong(),
            "",
            "",
            ""
        )
    }


}