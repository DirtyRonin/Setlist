import { ISong } from ".";

export interface IBandSummary{
    id: number;
    title: string;
}

export interface ISonglist {
    id: string;
    title: string;
    songs: ISong[];
    songlistType: SonglistType;
}

export interface IMainlist extends ISonglist { }
export interface IBandlist extends ISonglist { }
export interface ISet extends ISonglist {
    bandId:string;
 }

export enum SonglistType {
    MainList = "Main List",
    BandList = "Band List",
    SetList = "Set List",
}
