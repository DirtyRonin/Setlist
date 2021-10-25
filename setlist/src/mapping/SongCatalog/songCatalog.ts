import { FilterSongActionProps } from "..";
import { ISong, CatalogTypes, ISongCatalog, ISongFilter, MetaProps, ISongCatalogOptions } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SongCatalog extends CatalogBase<ISong, ISongFilter, ISongCatalogOptions> implements ISongCatalog {

    private constructor({ filter, oData, options, refresh, songs = [] }: { filter: ISongFilter; oData: MetaProps; options: ISongCatalogOptions; refresh?: boolean; songs?: ISong[] }) {
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
            { filter: FilterSongActionProps.Default({}).filter, oData: { NextLink: "", Count: 0 }, options, refresh, songs: [] }        )

    public static Create = (): ISongCatalog => SongCatalog.Default(false)

        //deprecated ? 
        public static CreateAndUpdate = (options?: ISongCatalogOptions,): ISongCatalog =>
        SongCatalog.Default(true, options)

    public static CatalogId: string = `${CatalogTypes["Song Catalog"].toString()}_id`
}
