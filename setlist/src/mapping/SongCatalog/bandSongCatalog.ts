import { CatalogBase } from "./catalogBase";
import { IBandSong, IBandSongFilter, IBandSongCatalogOptions, IBandSongCatalog, ODataProps, CatalogType } from "../../models";

export class BandSongCatalog extends CatalogBase<IBandSong, IBandSongFilter, IBandSongCatalogOptions> implements IBandSongCatalog {

    private constructor(catalogId: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, refresh?: boolean, values?: Map<string, IBandSong>) {
        super(
            `${CatalogType.BandSong.toString()}_${catalogId}`,
            CatalogType.BandSong.toString(),
            CatalogType.BandSong,
            filter,
            oData,
            options,
            refresh,
            values,
        )
    }

    public static Create(catalogId: string,filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, values?: Map<string, IBandSong>): IBandSongCatalog {
        return new BandSongCatalog(catalogId,filter, oData, options, false, values)
    }

    public static CreateAndUpdate(catalogId: string,filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, values?: Map<string, IBandSong>): IBandSongCatalog {
        return new BandSongCatalog(catalogId,filter, oData, options, true, values)
    }

    public static AddValues(catalog: IBandSongCatalog, addValues: IBandSong[]): IBandSongCatalog {
        const currentCatalog = { ...catalog };
        addValues.forEach(value => currentCatalog.Values.set(value.Id, value))

        return currentCatalog
    }

    public static UpdateOData(catalog: IBandSongCatalog, oData: ODataProps): IBandSongCatalog {
        const newCatalog = { ...catalog, OData: oData }
        return newCatalog;
    }

    public static UpdateFilter(catalog: IBandSongCatalog, filter: IBandSongFilter): IBandSongCatalog {
        const newCatalog = { ...catalog, Filter: filter }
        return newCatalog;
    }

    public CatalogId: string = `${CatalogType.BandSong.toString()}_${this.Id}`
}