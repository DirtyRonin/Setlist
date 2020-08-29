import { ICatalog } from "./ICatalog";
import { IBandSong, ISongFilter } from "..";

export interface IBandSongFilter extends ISongFilter {
    BandId: string;
}

export interface IBandSongCatalogOptions{ }

export interface IBandSongCatalog extends ICatalog<IBandSong,IBandSongFilter,IBandSongCatalogOptions> { 
    BandId: string;
}