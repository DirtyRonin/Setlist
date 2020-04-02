import { ISong, IBandSong } from ".";

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

export interface ODataProps{
    Context:string
    Count:number
    NextLink:string
}

export interface ICatalog<TValues,SFilter>{
    CatalogType: CatalogType;
    Filter:SFilter
    Id: string;
    Title: string;
    Refresh: boolean;
    Values:TValues[];
    OData:ODataProps
}

export interface ISongCatalog extends ICatalog<ISong,ISongFilter> {
    // Values: ISong[];
    
    // Filter: ISongFilter
}

export interface IBandCatalog extends ICatalog<IBandSong,ISongFilter> { }
export interface ISetCatalog extends ISongCatalog {
    BandId:string;
 }

 export type Catalogs = ISongCatalog | IBandCatalog | ISetCatalog

export enum CatalogType {
    Song = "Song Catalog",
    Band = "Band Catalog",
    Set = "Set Catalog",
}
