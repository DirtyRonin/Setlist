import { ISong, CatalogType, ISongCatalog, ISongFilter, ODataProps, ISongCatalogOptions } from "../../models";
import { CatalogBase } from "./songCatalogBase";

export class SongCatalog extends CatalogBase<ISong, ISongFilter, ISongCatalogOptions> implements ISongCatalog {

    private constructor(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions, refresh?: boolean, songs?: Map<string, ISong>) {
        super(
            `${CatalogType.Song.toString()}_id`,
            CatalogType.Song.toString(),
            CatalogType.Song,
            filter,
            oData,
            options,
            refresh,
            songs,
        )
    }

    public static Create(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions, songs?: Map<string, ISong>): ISongCatalog {
        return new SongCatalog(filter, oData, options, false, songs)
    }

    public static CreateAndUpdate(filter: ISongFilter, oData: ODataProps, options: ISongCatalogOptions, songs?: Map<string, ISong>): ISongCatalog {
        return new SongCatalog(filter, oData, options, true, songs)
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

    public static CatalogId: string = `${CatalogType.Song.toString()}_id`
}


// export const CreateSongCatalog = (songs: ISong[] = []): ISongCatalog => new SongCatalog(songs);