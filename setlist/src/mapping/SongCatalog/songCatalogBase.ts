import { CatalogType, ODataProps, ICatalog } from "../../models";

export abstract class CatalogBase<TValues,SFilter> implements ICatalog<TValues,SFilter> {
    readonly Id: string;
    readonly Title: string;
    readonly Values: TValues[];
    readonly CatalogType: CatalogType;
    readonly Filter: SFilter;
    readonly Refresh: boolean;
    readonly OData:ODataProps

    constructor(id: string, title: string, songlistType: CatalogType, filter: SFilter,oData: ODataProps,refresh: boolean = false, songs: TValues[] = [], ) {
        this.Id = id;
        this.Values = songs
        this.Title = title
        this.CatalogType = songlistType
        this.Filter = filter
        this.Refresh = refresh
        this.OData = oData
    }

}