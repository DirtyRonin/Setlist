import { ISong } from "../models";
import { GUID_EMPTY } from "../Util";
import { ISongResource } from "../resource";

export class Song {

    Id: string;
    Title: string;
    Artist: string;
    OriginalKey: string;
    Evergreen: boolean;
    // PlayTime: string;
    Genre: string;
    Comment: string;

    constructor(title: string, artist: string, originalKey: string, evergreen: boolean, genre: string, comment: string, id: string = GUID_EMPTY) {
        this.Title = title
        this.Artist = artist
        this.OriginalKey = originalKey
        this.Evergreen = evergreen
        this.Genre = genre
        this.Comment = comment
        this.Id = id;
    }

    public static Create(title: string, artist: string, originalKey: string, evergreen: boolean, genre: string, comment: string, id?: string): ISong {
        const song = new Song(title, artist, originalKey, evergreen, genre, comment, id)
        const { Title, Artist, OriginalKey: Key, Id } = song

        return { Title, Artist, OriginalKey: Key, Id } as ISong
    }

    public static ToResource(song: ISong): ISongResource {
        const { Title, Artist, OriginalKey, Evergreen, Genre, Comment, Id } = song;
        return { Title, Artist, OriginalKey, Evergreen, Genre, Comment, Id } as ISongResource
    }

    public static FromResource(resource: ISongResource): ISong {
        const { Title, Artist, OriginalKey, Evergreen, Genre, Comment, Id } = resource;
        return Song.Create(Title, Artist, OriginalKey, Evergreen, Genre, Comment, Id)
    }
}