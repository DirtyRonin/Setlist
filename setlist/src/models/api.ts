import { IBandSong, ISetSong } from "./song";

export interface IApiBandlist {
    id: string;
    title: string;
    bandsongs: IBandSong[];
    setlists: IApiSetList[];
}

export interface IApiSetList {
    id: string;
    title: string;
    setsongs: ISetSong[];
}