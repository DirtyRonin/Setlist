import { IBandSong } from "../entity/bandSong";
import { ICatalog } from "../catalog";

export interface IBandSongFilter {
    Title: string;
    ParentId: string;
}

export interface IBandSongCatalogOptions{}

export interface IBandSongCatalog extends ICatalog<IBandSong,IBandSongFilter,IBandSongCatalogOptions> { }