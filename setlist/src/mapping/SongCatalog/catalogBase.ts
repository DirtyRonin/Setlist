import { CatalogTypes, MetaProps, ICatalog } from "../../models";

export abstract class CatalogBase<TValues, SFilter, ROptions> implements ICatalog<TValues, SFilter, ROptions> {
    readonly Id: string;
    readonly Title: string;
    readonly Values: TValues[];
    readonly CatalogType: CatalogTypes;
    readonly Filter: SFilter;
    readonly Refresh: boolean;
    readonly Meta: MetaProps;
    readonly CatalogOptions: ROptions;

    constructor(id: string, title: string, catalogType: CatalogTypes, filter: SFilter, oData: MetaProps, catalogOptions: ROptions, refresh: boolean = false, songs: TValues[] =  []) {
        this.Id = id;
        this.Values = songs
        this.Title = title
        this.CatalogType = catalogType
        this.Filter = filter
        this.Refresh = refresh
        this.Meta = oData
        this.CatalogOptions = catalogOptions
    }

}

