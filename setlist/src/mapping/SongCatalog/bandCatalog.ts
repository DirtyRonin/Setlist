import { CatalogType, IBandCatalog, IBand, IBandSong, ISongFilter, ODataProps } from "../../models";
import { CatalogBase } from "./songCatalogBase";

export class BandCatalog extends CatalogBase<IBandSong,ISongFilter> implements IBandCatalog {
    private constructor(filter: ISongFilter, band: IBand, oData: ODataProps, refresh?: boolean, bandSongs?: IBandSong[]) {
        super(
            band.Id,
            band.Title,
            CatalogType.Band,
            filter,
            oData,
            refresh,
            bandSongs,
        )
    }

    public static Create(filter: ISongFilter, band: IBand, oData: ODataProps): IBandCatalog {
        return new BandCatalog(filter, band,oData, false, band.BandSongs )
    }
    

    public static CreateAndUpdate(filter: ISongFilter, band: IBand, oData: ODataProps): IBandCatalog {
        return new BandCatalog(filter, band,oData, true, band.BandSongs)
    }
}