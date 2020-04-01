import { ISong, CatalogType, ISongCatalog, ISongFilter } from "../../models";
import { SongCatalogBase } from "./songCatalogBase";

export class SongCatalog extends SongCatalogBase implements ISongCatalog {

    private constructor(filter:ISongFilter,toBeUpdated?: boolean, songs?: ISong[]) {
        super(
            `${CatalogType.MainList.toString()}_id`,
            CatalogType.MainList.toString(),
            CatalogType.MainList,
            filter,
            toBeUpdated,
            songs,
        )
    }

    public static Create(filter:ISongFilter,songs?: ISong[]): ISongCatalog {
        return new SongCatalog(filter,false, songs)
    }

    public static CreateAndUpdate(filter:ISongFilter,songs?: ISong[]): ISongCatalog {
        return new SongCatalog(filter,true, songs)
    }
}


// export const CreateSongCatalog = (songs: ISong[] = []): ISongCatalog => new SongCatalog(songs);