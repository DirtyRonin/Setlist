import { CatalogBase } from "./catalogBase";
import { IBandSong, IBandSongFilter, IBandSongCatalogOptions, IBandSongCatalog, ODataProps, CatalogType } from "../../models";

export class BandSongCatalog extends CatalogBase<IBandSong, IBandSongFilter, IBandSongCatalogOptions> implements IBandSongCatalog {

    BandId: string;

    private constructor(bandId: string, title: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, refresh?: boolean, values?: Map<string, IBandSong>) {
        super(
            BandSongCatalog.GetCatalogId(bandId),
            title,
            CatalogType.BandSong,
            filter,
            oData,
            options,
            refresh,
            values
        )
        this.BandId = bandId

    }


    public static Create(bandId: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, values?: Map<string, IBandSong>, title: string = ""): IBandSongCatalog {
        return new BandSongCatalog(bandId, title, filter, oData, options, false, values)
    }

    public static CreateAndUpdate(bandId: string, filter: IBandSongFilter, oData: ODataProps, options: IBandSongCatalogOptions, values?: Map<string, IBandSong>, title: string = ""): IBandSongCatalog {
        return new BandSongCatalog(bandId, title, filter, oData, options, true, values)
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

    public static GetCatalogId(bandId: string): string {
        return `${CatalogType.BandSong.toString()}_${bandId}`
    }
}