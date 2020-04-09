import { CatalogType, ODataProps, ICatalog, ISongCatalogOptions } from "../../models";

export abstract class CatalogBase<TValues,SFilter,ROptions> implements ICatalog<TValues,SFilter,ROptions> {
    readonly Id: string;
    readonly Title: string;
    readonly Values: TValues[];
    readonly CatalogType: CatalogType;
    readonly Filter: SFilter;
    readonly Refresh: boolean;
    readonly OData:ODataProps;
    readonly CatalogOptions:ROptions;

    constructor(id: string, title: string, songlistType: CatalogType, filter: SFilter,oData: ODataProps, catalogOptions:ROptions, refresh: boolean = false, songs: TValues[] = [], ) {
        this.Id = id;
        this.Values = songs
        this.Title = title
        this.CatalogType = songlistType
        this.Filter = filter
        this.Refresh = refresh
        this.OData = oData
        this.CatalogOptions=catalogOptions
    }

}