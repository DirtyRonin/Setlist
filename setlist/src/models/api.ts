import { IBandSong, ISetSong } from "./song";

export interface IApiBandlist {
    id: number;
    title: string;
    bandsongs: IBandSongRef[];
    setlists: IApiSetList[];
}

export interface IApiSetList {
    id: number;
    title: string;
    bandId:number;
    setsongs: ISetSongRef[];
}

export interface IBandSongRef {
    songId:number
}
export interface ISetSongRef {
    songId:number
}

