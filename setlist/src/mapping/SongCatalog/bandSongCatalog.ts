import { CatalogBase } from "./catalogBase";
import { IBandSong, IBandSongFilter, IBandSongCatalogOptions, IBandSongCatalog, MetaProps, CatalogTypes } from "../../models";
import { FilterBandSongActionProps } from "../actionsProps";

export class BandSongCatalog extends CatalogBase<IBandSong, IBandSongFilter, IBandSongCatalogOptions> implements IBandSongCatalog {

    bandId: number;

    private constructor(bandId: number, filter: IBandSongFilter, oData: MetaProps, options: IBandSongCatalogOptions, refresh?: boolean, values?: IBandSong[]) {
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
        this.bandId = bandId

    }

    private static Default = (
        bandId: number,
        refresh: boolean,
        options: IBandSongCatalogOptions = {},
    ): BandSongCatalog =>
        new BandSongCatalog(
            bandId,
            FilterBandSongActionProps.Default(bandId).filter,
            { NextLink: "", Count: 0},
            options,
            refresh,
            []
        )


    public static Create = (bandId: number): IBandSongCatalog => BandSongCatalog.Default(bandId, false)

    public static CreateAndUpdate = (bandId: number, options?: IBandSongCatalogOptions): IBandSongCatalog =>
        BandSongCatalog.Default(bandId, true, options)

    public static GetCatalogId = (bandId: number): string => `${CatalogTypes["BandSong Catalog"].toString()}_${bandId}`

}