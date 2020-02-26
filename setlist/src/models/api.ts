import { IBandSong, ISetSong } from "./song";

export interface IApiBandlist {
    id: string;
    title: string;
    bandsongs: IBandSongRef[];
    setlists: IApiSetList[];
}

export interface IApiSetList {
    id: string;
    title: string;
    setsongs: ISetSongRef[];
}

export interface IBandSongRef {
    songId:string
}
export interface ISetSongRef {
    songId:string
}