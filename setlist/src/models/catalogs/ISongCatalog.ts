import { ICatalog } from "./ICatalog";
import { ISong } from "..";

export interface ISongFilter {
    Query: string;
    Evergreen: boolean;
    Nineties: boolean;
}

export interface ISongCatalogOptions {
    ShowAddSong: boolean
}

export interface ISongCatalog extends ICatalog<ISong, ISongFilter, ISongCatalogOptions> { }
