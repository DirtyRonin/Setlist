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

export interface ODataProps{
    Context:string
    Count:number
    NextLink:string
}

export enum CatalogType {
    Song = "Song Catalog",
    Band = "Band Catalog",
    Set = "Set Catalog",
}