import { CatalogBase } from "./catalogBase";
import { IBandSong, IBandSongFilter, IBandSongCatalogOptions, IBandSongCatalog, ODataProps, CatalogTypes } from "../../models";
import { FilterBandSongActionProps } from "../actionsProps";

export class BandSongCatalog extends CatalogBase<IBandSong, IBandSongFilter, IBandSongCatalogOptions> implements IBandSongCatalog {

    BandId: string;

    private constructor(bandId: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, refresh?: boolean, values?: Map<string, IBandSong>) {
        super(
            BandSongCatalog.GetCatalogId(bandId),
            CatalogTypes["BandSong Catalog"].toString(),
            CatalogTypes["BandSong Catalog"],
            filter,
            oData,
            options,
            refresh,
            values
        )
        this.BandId = bandId

    }

    private static Default = (
        bandId: string,
        refresh: boolean,
        options: IBandSongCatalogOptions = {},
    ): BandSongCatalog =>
        new BandSongCatalog(
            bandId,
            FilterBandSongActionProps.Default(bandId).filter,
            { NextLink: "", Count: 0, Context: "" },
            options,
            refresh,
            new Map<string, IBandSong>()
        )


    public static Create = (bandId: string): IBandSongCatalog => BandSongCatalog.Default(bandId, false)

    public static CreateAndUpdate = (bandId: string, options?: IBandSongCatalogOptions): IBandSongCatalog =>
        BandSongCatalog.Default(bandId, true, options)

    public static GetCatalogId = (bandId: string): string => `${CatalogTypes["BandSong Catalog"].toString()}_${bandId}`

}