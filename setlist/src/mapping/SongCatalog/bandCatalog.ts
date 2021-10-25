import { CatalogTypes, IBandCatalog, IBand, MetaProps, IBandFilter, IBandCatalogOptions } from "../../models";
import { FilterBandActionProps } from "../actionsProps";
import { CatalogBase } from "./catalogBase";

export class BandCatalog extends CatalogBase<IBand, IBandFilter, IBandCatalogOptions> implements IBandCatalog {
    private constructor(filter: IBandFilter, oData: MetaProps, options: IBandCatalogOptions, refresh?: boolean, bands?: IBand[]) {
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
            FilterBandActionProps.Default({}).filter,
            { NextLink: "", Count: 0 },
            options,
            refresh,
            []
        )

    public static Create = (): IBandCatalog => BandCatalog.Default(false)


    //deprecated ? 
    public static CreateAndUpdate = (options?: IBandCatalogOptions): IBandCatalog =>
        BandCatalog.Default(true, options)

    public static AddValues = (bandCatalog: IBandCatalog, addBands: IBand[]): IBandCatalog => (
        { ...bandCatalog, Values: bandCatalog.Values.concat(addBands) })



    public static UpdateOData(bandCatalog: IBandCatalog, oData: MetaProps): IBandCatalog {
        return { ...bandCatalog, Meta: oData }
    }

    public static UpdateFilter(bandCatalog: IBandCatalog, filter: IBandFilter): IBandCatalog {
        return { ...bandCatalog, Filter: filter }
    }

    public static CatalogId: string = `${CatalogTypes["Band Catalog"].toString()}_id`
}