import { ISong, CatalogType, ISongCatalog, ISongFilter, ODataProps } from "../../models";
import { CatalogBase } from "./songCatalogBase";

export class SongCatalog extends CatalogBase<ISong,ISongFilter> implements ISongCatalog {

    private constructor(filter: ISongFilter, oData: ODataProps, refresh?: boolean, songs?: ISong[]) {
        super(
            `${CatalogType.Song.toString()}_id`,
            CatalogType.Song.toString(),
            CatalogType.Song,
            filter,
            oData,
            refresh,
            songs,
        )
    }

    public static Create(filter: ISongFilter, oData: ODataProps, songs?: ISong[]): ISongCatalog {
        return new SongCatalog(filter, oData, false, songs)
    }

    public static CreateAndUpdate(filter: ISongFilter, oData: ODataProps, songs?: ISong[]): ISongCatalog {
        return new SongCatalog(filter, oData, true, songs)
    }
}


// export const CreateSongCatalog = (songs: ISong[] = []): ISongCatalog => new SongCatalog(songs);