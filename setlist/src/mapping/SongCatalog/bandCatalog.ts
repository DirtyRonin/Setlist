import { CatalogType, IBandCatalog, IBand, IBandSong, ISongFilter, ODataProps, ISongCatalogOptions } from "../../models";
import { CatalogBase } from "./songCatalogBase";

export class BandCatalog extends CatalogBase<IBandSong, ISongFilter, ISongCatalogOptions> implements IBandCatalog {
    private constructor(filter: ISongFilter, band: IBand, oData: ODataProps, options: ISongCatalogOptions, refresh?: boolean, bandSongs?: IBandSong[]) {
        super(
            band.Id,
            band.Title,
            CatalogType.Band,
            filter,
            oData,
            options,
            refresh,
            bandSongs,
        )
    }

    public static Create(filter: ISongFilter, band: IBand, oData: ODataProps, options: ISongCatalogOptions): IBandCatalog {
        return new BandCatalog(filter, band, oData, options, false, band.BandSongs)
    }


    public static CreateAndUpdate(filter: ISongFilter, band: IBand, oData: ODataProps, options: ISongCatalogOptions): IBandCatalog {
        return new BandCatalog(filter, band, oData, options, true, band.BandSongs)
    }
}