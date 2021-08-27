import { ISetlistSong, ISongFilter } from "..";
import { ICatalog } from "./ICatalog";

export interface ISetlistSongFilter extends ISongFilter {
    SetlistId:string
}

export interface ISetlistSongCatalogOptions{}

export interface ISetlistSongCatalog extends ICatalog<ISetlistSong,ISetlistSongFilter,ISetlistSongCatalogOptions> { 
    SetlistId:string
}