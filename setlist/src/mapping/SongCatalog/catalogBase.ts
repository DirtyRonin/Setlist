import { CatalogTypes, ODataProps, ICatalog, ISongCatalogOptions, NodeTypes } from "../../models";

export abstract class CatalogBase<TValues, SFilter, ROptions> implements ICatalog<TValues, SFilter, ROptions> {
    readonly Id: string;
    readonly Title: string;
    readonly Values: Map<string, TValues>;
    readonly CatalogType: CatalogTypes;
    readonly Filter: SFilter;
    readonly Refresh: boolean;
    readonly OData: ODataProps;
    readonly CatalogOptions: ROptions;
    readonly NodeType: NodeTypes;

    constructor(id: string, title: string, catalogType: CatalogTypes, filter: SFilter, oData: ODataProps, catalogOptions: ROptions, nodeType: NodeTypes, refresh: boolean = false, songs: Map<string, TValues> = new Map(),) {
        this.Id = id;
        this.Values = songs
        this.Title = title
        this.CatalogType = catalogType
        this.Filter = filter
        this.Refresh = refresh
        this.OData = oData
        this.CatalogOptions = catalogOptions
        this.NodeType = nodeType
    }

}

