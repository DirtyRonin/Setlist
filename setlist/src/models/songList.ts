import { ISong } from ".";

export interface IBandSummary{
    id: string;
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
export interface ISetlist extends ISonglist {
    BandId:string;
 }

export enum SonglistType {
    MainList = "Main List",
    BandList = "Band List",
    SetList = "Set List",
}
