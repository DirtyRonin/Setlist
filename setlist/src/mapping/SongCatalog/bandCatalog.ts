import { CatalogTypes, IBandCatalog, IBand, ODataProps, IBandFilter, IBandCatalogOptions } from "../../models";
import { FilterBandActionProps } from "../actionsProps";
import { CatalogBase } from "./catalogBase";

export class BandCatalog extends CatalogBase<IBand, IBandFilter, IBandCatalogOptions> implements IBandCatalog {
    private constructor(filter: IBandFilter, oData: ODataProps, options: IBandCatalogOptions, refresh?: boolean, bands?: Map<string, IBand>) {
        super(
            BandCatalog.CatalogId,
            CatalogTypes["Band Catalog"].toString(),
            CatalogTypes["Band Catalog"],
            filter,
            oData,
            options,
            refresh,
            bands,
        )
    }

    private static Default = (
        refresh: boolean,
        options: IBandCatalogOptions = {},
    ): BandCatalog =>
        new BandCatalog(
            FilterBandActionProps.Default(BandCatalog.CatalogId).filter,
            { NextLink: "", Count: 0, Context: "" },
            options,
            refresh,
            new Map<string, IBand>()
        )

    public static Create = (): IBandCatalog => BandCatalog.Default(false)

    public static CreateAndUpdate = (options?: IBandCatalogOptions): IBandCatalog =>
        BandCatalog.Default(true, options)

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