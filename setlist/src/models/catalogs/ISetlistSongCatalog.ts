import { ISetlistSong, ISongFilter } from "..";
import { ICatalog } from "./ICatalog";

export interface ISetlistSongFilter extends ISongFilter {
    SetlistId: number
}

export interface ISetlistSongCatalogOptions { }

export interface ISetlistSongCatalog extends ICatalog<ISetlistSong, ISetlistSongFilter, ISetlistSongCatalogOptions> {
    SetlistId: number
    totalCount: number
}