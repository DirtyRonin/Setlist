import { IBandSong, ISetlistSong, ISong } from "../models";
import { GUID_EMPTY } from "../utils";

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

    public static Create({ title, artist, originalKey, evergreen, nineties, genre, comment, id, bandSongs, setlistSongs }: { title: string; artist: string; originalKey: string; evergreen: boolean; nineties: boolean; genre: string; comment: string; id?: number; bandSongs?: IBandSong[]; setlistSongs?: ISetlistSong[]; }): ISong {
        return new Song({ title, artist, originalKey, evergreen, nineties, genre, comment, id, bandSongs, setlistSongs })
    }

    // public static ToResource(song: ISong): ISongResource {
    //     const { title: Title, artist: Artist, originalKey: OriginalKey, evergreen: Evergreen, nineties: Nineties, genre: Genre, comment: Comment, id: Id } = song;
    //     return { title: Title, artist: Artist, originalKey: OriginalKey, evergreen: Evergreen, nineties: Nineties, genre: Genre, comment: Comment, id: Id } as ISongResource
    // }

    // public static FromResource(resource: ISongResource): ISong {
    //     const { title: Title, artist: Artist, originalKey: OriginalKey, evergreen: Evergreen, nineties: Nineties, genre: Genre, comment: Comment, id: Id, bandSongs: BandSongs,setlistSongs: SetlistSongs } = resource;
    //     return Song.Create({ title: Title, artist: Artist, originalKey: OriginalKey, evergreen: Evergreen, nineties: Nineties, genre: Genre, comment: Comment, id: Id, bandSongs: BandSongs,setlistSongs:SetlistSongs })
    // }

    public static CreateEmpty(): ISong {
        return Song.Create(
            { title: "", artist: "", originalKey: "", evergreen: false, nineties: false, genre: "no genre", comment: "no comment" })
    }
}