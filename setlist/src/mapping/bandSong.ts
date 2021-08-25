import { IBandSong, ISong } from "../models";
import { GUID_EMPTY } from "../utils";
import { IBandSongResource } from "../resource";
import { Song } from ".";

export class BandSong implements IBandSong {
    Popularity: number;
    SongId: string;
    BandId: string;
    Song: ISong;
    Id: string;

    constructor({  popularity, song, id = GUID_EMPTY, songId = GUID_EMPTY, bandId = GUID_EMPTY }: {  popularity: number; song: ISong; id?: string; songId?: string; bandId?: string; },) {
        this.Id = id;
        this.Popularity = popularity;
        this.SongId = songId;
        this.BandId = bandId;
        this.Song = song;
    }

    public static Create({ popularity, song, id, songId, bandId }: { popularity: number; song: ISong; id?: string; songId?: string; bandId?: string; }): IBandSong {
        const bandSong = new BandSong({ popularity, song, id, songId, bandId })
        const {  Id, SongId, Song, BandId, Popularity } = bandSong

        return { Id, SongId, Song, BandId, Popularity } 
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
            {  popularity: 0, song: Song.EmptySong(), id: "", songId: "", bandId: "" })
    }


}