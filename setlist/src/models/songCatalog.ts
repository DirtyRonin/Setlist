import { ISong } from ".";

export interface IBandSummary{
    Id: string;
    Title: string;
}

export interface ISongCatalog {
    Id: string;
    Title: string;
    Songs: ISong[];
    SonglistType: SongCatalogType;
}

export interface IBandCatalog extends ISongCatalog { }
export interface ISetCatalog extends ISongCatalog {
    BandId:string;
 }

export enum SongCatalogType {
    MainList = "Song Catalog",
    BandList = "Band Catalog",
    SetList = "Set Catalog",
}
