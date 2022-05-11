import { IBandSong, ISetlistSong, ISong } from "../models";
import { GUID_EMPTY } from "../utils";
import { ISongResource } from "resource";

export class Song implements ISong {

    id: number;
    title: string;
    artist: string;
    originalKey: string;
    evergreen: boolean;
    nineties: boolean;
    // PlayTime: string;
    genre: string;
    comment: string;
    bandSongs: IBandSong[];
    setlistSongs: ISetlistSong[];

    constructor({ title, artist, originalKey, evergreen, nineties, genre, comment, id = GUID_EMPTY, bandSongs = [], setlistSongs = [] }
        : { title: string; artist: string; originalKey: string; evergreen: boolean; nineties: boolean; genre: string; comment: string; id?: number; bandSongs?: IBandSong[]; setlistSongs?: ISetlistSong[] }) {
        this.title = title
        this.artist = artist
        this.originalKey = originalKey
        this.evergreen = evergreen
        this.nineties = nineties
        this.genre = genre
        this.comment = comment
        this.id = id;
        this.bandSongs = bandSongs
        this.setlistSongs = setlistSongs
    }

    public static Create({ title, artist, originalKey, evergreen, nineties, genre, comment, id, bandSongs, setlistSongs }: { title: string; artist: string; originalKey: string; evergreen: boolean | number; nineties: boolean | number; genre: string; comment: string; id?: number; bandSongs?: IBandSong[]; setlistSongs?: ISetlistSong[]; }): ISong {
        return new Song({ title, artist, originalKey, evergreen: this.convertToBoolean(evergreen), nineties: this.convertToBoolean(nineties), genre, comment, id, bandSongs, setlistSongs })
    }

    private static convertToBoolean = (value: boolean | number): boolean =>
        typeof value === 'boolean' ? value : !!value

    public static ToResource({ title, artist, originalKey, evergreen, nineties, genre, comment, id }: { title: string; artist: string; originalKey: string; evergreen: boolean; nineties: boolean; genre: string; comment: string; id?: number; bandSongs?: IBandSong[]; setlistSongs?: ISetlistSong[]; }): ISongResource {
        return { title, artist, originalKey, evergreen: +evergreen, nineties: +nineties, genre, comment, id }
    }
    public static FromResource({ title, artist, originalKey, evergreen, nineties, genre, comment, id, bandSongs = [], setlistSongs = [] }: { title: string; artist: string; originalKey: string; evergreen: number; nineties: number; genre: string; comment: string; id: number; bandSongs?: IBandSong[]; setlistSongs?: ISetlistSong[]; }): ISong {
        return { title, artist, originalKey, evergreen: this.convertToBoolean(evergreen), nineties: this.convertToBoolean(nineties), genre, comment, id, bandSongs, setlistSongs }
    }

    public static CreateEmpty(): ISong {
        return Song.Create(
            { title: "", artist: "", originalKey: "", evergreen: false, nineties: false, genre: "no genre", comment: "no comment" })
    }


}