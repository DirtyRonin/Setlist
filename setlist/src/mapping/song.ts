import { ISong } from "../models";
import { GUID_EMPTY } from "../Util";
import { ISongResource } from "../resources";

export class Song {

    Id: string;
    Title: string;
    Artist: string;
    Key: string;

    constructor(title: string, artist: string, key: string, id: string = GUID_EMPTY) {
        this.Title = title
        this.Artist = artist
        this.Key = key
        this.Id = id;
    }

    public static Create(title: string, artist: string, key: string, id?: string): ISong {
        const song = new Song(title, artist, key, id)
        const { Title, Artist, Key, Id } = song

        return { Title, Artist, Key, Id } as ISong
    }

    public static ToResource(song: ISong): ISongResource {
        const {Title, Artist, Key, Id} = song;
        return { Title, Artist, Key, Id } as ISongResource
    }

    public static FromResource(resource: ISongResource): ISong {
        const {Title, Artist, Key, Id} = resource;
        return Song.Create(Title, Artist, Key, Id)
    }
}