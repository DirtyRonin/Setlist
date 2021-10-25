import { ICatalog } from "./ICatalog";
import { IBandSong, ISongFilter } from "..";

export interface IBandSongFilter extends ISongFilter {
    bandId: number;
}

export interface IBandSongCatalogOptions{ }

export interface IBandSongCatalog extends ICatalog<IBandSong,IBandSongFilter,IBandSongCatalogOptions> { 
    bandId: number;
}