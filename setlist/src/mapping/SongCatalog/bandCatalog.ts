import { CatalogType, IBandCatalog, IBand, IBandSong, ISongFilter } from "../../models";
import { SongCatalogBase } from "./songCatalogBase";

export class BandCatalog extends SongCatalogBase implements IBandCatalog {
    private constructor(filter:ISongFilter,band : IBand,toBeUpdated?: boolean, bandSongs?: IBandSong[]) {
        super(
            band.Id,
            band.Title,
            CatalogType.BandList,
            filter,
            toBeUpdated,
            bandSongs,
        )
    }

    public static Create(filter:ISongFilter,band : IBand): IBandCatalog {
        return new BandCatalog(filter,band,false,band.BandSongs)
    }

    public static CreateAndUpdate(filter:ISongFilter,band : IBand): IBandCatalog {
        return new BandCatalog(filter,band,true, band.BandSongs)
    }
}