import { IBandSong, ISetlistSong } from "models";

export interface ISongResource {
    id: string;
    artist: string;
    title: string;
    originalKey: string;
    evergreen: boolean;
    nineties:boolean;
    // PlayTime: string;
    genre: string;
    comment: string;
    bandSongs:IBandSong[]
    setlistSongs:ISetlistSong[]
}