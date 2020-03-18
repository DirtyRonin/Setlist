import { SongCatalogType, IBandCatalog, IBand, IBandSong } from "../../models";
import { SongCatalogBase } from "./songCatalogBase";

export class BandCatalog extends SongCatalogBase implements IBandCatalog {
    private constructor(band : IBand, bandSongs?: IBandSong[]) {
        super(
            band.Id,
            band.Title,
            SongCatalogType.BandList,
            bandSongs
        )
    }

    public static Create(band : IBand): IBandCatalog {
        return new BandCatalog(band,band.BandSongs)
    }
}