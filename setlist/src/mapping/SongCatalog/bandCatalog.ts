import { CatalogTypes, IBandCatalog, IBand, ODataProps, IBandFilter, IBandCatalogOptions, NodeTypes } from "../../models";
import { CatalogBase } from "./catalogBase";

export class BandCatalog extends CatalogBase<IBand, IBandFilter, IBandCatalogOptions> implements IBandCatalog {
    private constructor(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, nodeType: NodeTypes = NodeTypes.Initial, refresh?: boolean, bands?: Map<string, IBand>) {
        super(
            BandCatalog.CatalogId,
            CatalogTypes["Band Catalog"].toString(),
            CatalogTypes["Band Catalog"],
            filter,
            oData,
            options,
            nodeType,
            refresh,
            bands,
        )
    }

    public static Create(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, nodeType: NodeTypes, bands?: Map<string, IBand>): IBandCatalog {
        return new BandCatalog(filter, oData, options, nodeType, false, bands)
    }

    public static CreateAndUpdate(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, nodeType: NodeTypes, bands?: Map<string, IBand>): IBandCatalog {
        return new BandCatalog(filter, oData, options, nodeType, true, bands)
    }

    public static AddValues(bandCatalog: IBandCatalog, addBands: IBand[]): IBandCatalog {
        const currentCatalog = { ...bandCatalog };
        addBands.forEach(newBand => currentCatalog.Values.set(newBand.Id, newBand))

        return currentCatalog
    }

    public static UpdateOData(bandCatalog: IBandCatalog, oData: ODataProps): IBandCatalog {
        return { ...bandCatalog, OData: oData }
    }

    public static UpdateFilter(bandCatalog: IBandCatalog, filter: IBandFilter): IBandCatalog {
        return { ...bandCatalog, Filter: filter }
    }

    public static CatalogId: string = `${CatalogTypes["Band Catalog"].toString()}_id`
}