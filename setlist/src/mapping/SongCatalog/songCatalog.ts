import { ISong, CatalogTypes, ISongCatalog, ISongFilter, ODataProps, ISongCatalogOptions, NodeTypes } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SongCatalog extends CatalogBase<ISong, ISongFilter, ISongCatalogOptions> implements ISongCatalog {

    private constructor(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions,nodeType: NodeTypes = NodeTypes.Initial, refresh?: boolean, songs: Map<string, ISong> = new Map<string, ISong>()) {
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

    public static Create(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions,nodeType: NodeTypes, songs: Map<string, ISong> = new Map<string, ISong>()): ISongCatalog {
        return new SongCatalog(filter, oData, options,nodeType, false, songs)
    }

    public static CreateAndUpdate(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions,nodeType: NodeTypes, songs: Map<string, ISong> = new Map<string, ISong>()): ISongCatalog {
        return new SongCatalog(filter, oData, options,nodeType, true, songs)
    }

    public static AddValues(songCatalog: ISongCatalog, addSongs: ISong[]): ISongCatalog {
        const currentCatalog = { ...songCatalog };
        addSongs.forEach(newSong => currentCatalog.Values.set(newSong.Id, newSong))

        return currentCatalog
    }

    public static UpdateOData(songCatalog: ISongCatalog, oData: ODataProps): ISongCatalog {
        const newSongCatalog = { ...songCatalog, OData: oData }
        return newSongCatalog;
    }
    
    public static UpdateFilter(songCatalog: ISongCatalog, filter: ISongFilter): ISongCatalog {
        const newSongCatalog = { ...songCatalog, Filter: filter }
        return newSongCatalog;
    }

    public static CatalogId: string = `${CatalogTypes["Song Catalog"].toString()}_id`
}
