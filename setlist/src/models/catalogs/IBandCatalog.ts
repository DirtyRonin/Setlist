import { ICatalog } from "./ICatalog";
import { IBand } from "..";

export interface IBandFilter {
    Query: string;
    SongId?: number
    UserId?: number

}

export interface IBandCatalogOptions { }

export interface IBandCatalog extends ICatalog<IBand, IBandFilter, IBandCatalogOptions> { }