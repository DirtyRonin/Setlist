import { ISetlistSong } from "..";
import { ICatalog } from "./ICatalog";

export interface ISetlistSongFilter {
    Title: string;
}

export interface ISetlistSongCatalogOptions{}

export interface ISetlistSongCatalog extends ICatalog<ISetlistSong,ISetlistSongFilter,ISetlistSongCatalogOptions> { }