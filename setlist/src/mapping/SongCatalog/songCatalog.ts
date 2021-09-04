import { FilterSongActionProps } from "..";
import { ISong, CatalogTypes, ISongCatalog, ISongFilter, ODataProps, ISongCatalogOptions } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SongCatalog extends CatalogBase<ISong, ISongFilter, ISongCatalogOptions> implements ISongCatalog {

    private constructor(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions, refresh?: boolean, songs: Map<string, ISong> = new Map<string, ISong>()) {
        super(
            SongCatalog.CatalogId,
            CatalogTypes["Song Catalog"].toString(),
            CatalogTypes["Song Catalog"],
            filter,
            oData,
            options,
            refresh,
            songs,
        )
    }

    private static Default = (
        refresh: boolean,
        options: ISongCatalogOptions = { ShowAddSong: false },
    ): SongCatalog =>
        new SongCatalog(
            FilterSongActionProps.Default().filter,
            { NextLink: "", Count: 0, Context: "" },
            options,
            refresh,
            new Map<string, ISong>()
        )

    public static Create = (): ISongCatalog => SongCatalog.Default(false)

    public static CreateAndUpdate = (options?: ISongCatalogOptions,): ISongCatalog =>
        SongCatalog.Default(true, options)

    public static CatalogId: string = `${CatalogTypes["Song Catalog"].toString()}_id`
}
