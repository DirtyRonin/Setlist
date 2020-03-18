import { IBandSong, ISong } from "../models";
import { IBandSongResource } from "../resources";
import { GUID_EMPTY } from "../Util";
import { Song } from ".";

export class BandSong {
    readonly Id: string;
    readonly Popularity: number;
    readonly Song: ISong;

    private constructor(song: ISong, popularity: number = 5, id: string = GUID_EMPTY) {
        this.Id = id;
        this.Popularity = popularity;
        this.Song = song;
    }

    public static Create(song: ISong, popularity?: number, id?: string): IBandSong {
        const bandSong = new BandSong(song, popularity, id)
        const { Title, Artist, Key, Id } = bandSong.Song

        return { Title, Artist, Key, Id, Popularity: bandSong.Popularity } as IBandSong
    }

    public static ToResource(bandSong: IBandSong, bandId: string, id?: string): IBandSongResource {
        return { 
            Id: id ? id : GUID_EMPTY, 
            Popularity: bandSong.Popularity, 
            BandId: bandId, 
            SongId: bandSong.Id 
        } as IBandSongResource
    }

    public static FromResource(resource: IBandSongResource): IBandSong {
        const {Popularity,Id} = resource
        const song = Song.FromResource(resource.Song!)
        return BandSong.Create(song,Popularity,Id)
    }
}