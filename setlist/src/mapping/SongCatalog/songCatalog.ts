import { ISong, SongCatalogType, ISongCatalog } from "../../models";
import { SongCatalogBase } from "./songCatalogBase";

export class SongCatalog extends SongCatalogBase implements ISongCatalog {

    private constructor(songs?: ISong[]) {
        super(
            `${SongCatalogType.MainList.toString()}_id`,
            SongCatalogType.MainList.toString(),
            SongCatalogType.MainList,
            songs
        )
    }

    public static Create(songs?: ISong[]): ISongCatalog {
        return new SongCatalog(songs)
    }
}


// export const CreateSongCatalog = (songs: ISong[] = []): ISongCatalog => new SongCatalog(songs);