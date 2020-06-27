import { IBand, IBandSong } from "../models";
import { IBandResource } from "../resource";
import { GUID_EMPTY } from "../Util";
// import { BandSong } from ".";

export class Band implements IBand {

    Id: string;
    Title: string;
    // BandSongs: Map<string, IBandSong>;

    private constructor(title: string, /*bandSongs: Map<string, IBandSong> = new Map(),*/ id: string = GUID_EMPTY) {
        this.Title = title
        this.Id = id;
        // this.BandSongs = bandSongs
    }

    public static Create(title: string, /*bandSongs?: Map<string, IBandSong>,*/ id?: string): IBand {
        return new Band(title, /*bandSongs,*/ id)
    }

    public static ToResource(song: IBand): IBandResource {
        const { Title, /*BandSongs,*/ Id } = song;
        return { Title, /*BandSongs: Array.from(BandSongs.values()),*/ Id } as IBandResource
    }

    // public static ToResource(song: ISong): ISongResource {
    //     const { Title, Artist, OriginalKey, Evergreen,Nineties, Genre, Comment, Id } = song;
    //     return { Title, Artist, OriginalKey, Evergreen,Nineties, Genre, Comment, Id } as ISongResource
    // }


    public static FromResource(resource: IBandResource): IBand {
        const { Title, /*BandSongs,*/ Id } = resource;

        /*const bandSongs = BandSongs?.reduce((map, song) => {
            map.set(song.Id, BandSong.FromResource(song))
            return map
        }, new Map<string, IBandSong>())*/

        return new Band(Title,/* bandSongs,*/ Id)
    }

    public static EmptyBand(): IBand {
        return Band.Create("")
    }
}