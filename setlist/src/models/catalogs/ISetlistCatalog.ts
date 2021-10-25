import { ISetlist } from "..";
import { ICatalog } from "./ICatalog";

export interface ISetlistFilter {
    Query: string;
    BandSongId?: number
    SongId?: number
}

export interface ISetlistCatalogOptions { }

export interface ISetlistCatalog extends ICatalog<ISetlist, ISetlistFilter, ISetlistCatalogOptions> { }