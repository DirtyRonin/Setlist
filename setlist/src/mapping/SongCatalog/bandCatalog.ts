import { CatalogType, IBandCatalog, IBand, ODataProps, IBandFilter, IBandCatalogOptions } from "../../models";
import { CatalogBase } from "./catalogBase";

export class BandCatalog extends CatalogBase<IBand, IBandFilter, IBandCatalogOptions> implements IBandCatalog {
    private constructor(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, refresh?: boolean, bands?: Map<string, IBand>) {
        super(
            BandCatalog.CatalogId,
            CatalogType.Band.toString(),
            CatalogType.Band,
            filter,
            oData,
            options,
            refresh,
            bands,
        )
    }

    public static Create(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, bands?: Map<string, IBand>): IBandCatalog {
        return new BandCatalog(filter, oData, options, false, bands)
    }

    public static CreateAndUpdate(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, bands?: Map<string, IBand>): IBandCatalog {
        return new BandCatalog(filter, oData, options, true, bands)
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

    public static CatalogId: string = `${CatalogType.Band.toString()}_id`
}