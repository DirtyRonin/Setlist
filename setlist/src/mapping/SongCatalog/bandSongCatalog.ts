import { CatalogBase } from "./catalogBase";
import { IBandSong, IBandSongFilter, IBandSongCatalogOptions, IBandSongCatalog, ODataProps, CatalogTypes, NodeTypes } from "../../models";
import { FilterBandSongActionProps } from "../actionsProps";

export class BandSongCatalog extends CatalogBase<IBandSong, IBandSongFilter, IBandSongCatalogOptions> implements IBandSongCatalog {

    BandId: string;

    private constructor(bandId: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, nodeType: NodeTypes = NodeTypes.Initial, refresh?: boolean, values?: Map<string, IBandSong>) {
        super(
            BandSongCatalog.GetCatalogId(bandId),
            CatalogTypes["BandSong Catalog"].toString(),
            CatalogTypes["BandSong Catalog"],
            filter,
            oData,
            options,
            nodeType,
            refresh,
            values
        )
        this.BandId = bandId

    }

    private static Default = (
        bandId: string,
        refresh: boolean,
        options: IBandSongCatalogOptions = {},
        nodeType: NodeTypes = NodeTypes.Initial
    ): BandSongCatalog =>
        new BandSongCatalog(
            bandId,
            FilterBandSongActionProps.Default(bandId).filter,
            { NextLink: "", Count: 0, Context: "" },
            options,
            nodeType,
            refresh,
            new Map<string, IBandSong>()
        )


    public static Create = (bandId: string): IBandSongCatalog => BandSongCatalog.Default(bandId, false)

    public static CreateAndUpdate = (bandId: string, nodeType?: NodeTypes, options?: IBandSongCatalogOptions): IBandSongCatalog =>
        BandSongCatalog.Default(bandId, true, options, nodeType)

    // public static AddValues(catalog: IBandSongCatalog, addValues: IBandSong[]): IBandSongCatalog {
    //     const currentCatalog = { ...catalog };
    //     addValues.forEach(value => currentCatalog.Values.set(value.Id, value))

    //     return currentCatalog
    // }

    // public static UpdateOData(catalog: IBandSongCatalog, oData: ODataProps): IBandSongCatalog {
    //     const newCatalog = { ...catalog, OData: oData }
    //     return newCatalog;
    // }

    // public static UpdateFilter(catalog: IBandSongCatalog, filter: IBandSongFilter): IBandSongCatalog {
    //     const newCatalog = { ...catalog, Filter: filter }
    //     return newCatalog;
    // }

    public static GetCatalogId = (bandId: string): string => `${CatalogTypes["BandSong Catalog"].toString()}_${bandId}`

}