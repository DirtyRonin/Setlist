import { FilterSongActionProps } from "..";
import { ISong, CatalogTypes, ISongCatalog, ISongFilter, ODataProps, ISongCatalogOptions, NodeTypes } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SongCatalog extends CatalogBase<ISong, ISongFilter, ISongCatalogOptions> implements ISongCatalog {

    private constructor(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions, nodeType: NodeTypes = NodeTypes.Initial, refresh?: boolean, songs: Map<string, ISong> = new Map<string, ISong>()) {
        super(
            SongCatalog.CatalogId,
            CatalogTypes["Song Catalog"].toString(),
            CatalogTypes["Song Catalog"],
            filter,
            oData,
            options,
            nodeType,
            refresh,
            songs,
        )
    }

    private static Default = (
        refresh: boolean,
        options: ISongCatalogOptions = { ShowAddSong: false },
        nodeType: NodeTypes = NodeTypes.Initial
    ): SongCatalog =>
        new SongCatalog(
            FilterSongActionProps.Default(SongCatalog.CatalogId).filter,
            { NextLink: "", Count: 0, Context: "" },
            options,
            nodeType,
            refresh,
            new Map<string, ISong>()
        )

    public static Create = (): ISongCatalog => SongCatalog.Default(false)

    public static CreateAndUpdate(options?: ISongCatalogOptions, nodeType?: NodeTypes): ISongCatalog {
        return SongCatalog.Default(true,options,nodeType)
    }

    public static CatalogId: string = `${CatalogTypes["Song Catalog"].toString()}_id`
}
