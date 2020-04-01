import { ISong } from ".";

export interface IBandSummary{
    Id: string;
    Title: string;
}

export interface ISongFilter {
    Title: string;
    Artist: string;
    Evergreen: boolean;
    Nineties:boolean;
    Genre: string;
}

export interface ICatalog{
    Id: string;
    Title: string;
    ToBeUpdated: boolean;
}

export interface ISongCatalog extends ICatalog {
    Songs: ISong[];
    SonglistType: CatalogType;
    Filter: ISongFilter
}

export interface IBandCatalog extends ISongCatalog { }
export interface ISetCatalog extends ISongCatalog {
    BandId:string;
 }

export enum CatalogType {
    MainList = "Song Catalog",
    BandList = "Band Catalog",
    SetList = "Set Catalog",
}
