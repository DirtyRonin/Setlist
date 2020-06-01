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

export interface ISongCatalogOptions{
    ShowAddSong:boolean
}

export interface ICatalog<TValue,SFilter,ROptions>{
    CatalogType: CatalogType;
    Filter:SFilter
    Id: string;
    Title: string;
    Refresh: boolean;
    Values:Map<string,TValue>;
    OData:ODataProps;
    CatalogOptions: ROptions;
}

export interface ISongCatalog extends ICatalog<ISong,ISongFilter,ISongCatalogOptions> {
    // Values: ISong[];
    
    // Filter: ISongFilter
}

export interface IBandCatalog extends ICatalog<IBandSong,ISongFilter,ISongCatalogOptions> { }
export interface ISetCatalog extends ISongCatalog {
    BandId:string;
 }

 export type Catalogs = ISongCatalog | IBandCatalog | ISetCatalog

export enum CatalogType {
    Song = "Song Catalog",
    Band = "Band Catalog",
    Set = "Set Catalog",
}
