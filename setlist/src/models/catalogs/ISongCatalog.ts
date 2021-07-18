import { ICatalog } from "./ICatalog";
import { ISong } from "..";

export interface ISongFilter {
    Title: string;
    Artist: string;
    Evergreen: boolean;
    Nineties: boolean;
    Genre: string;
}

export interface ISongCatalogOptions {
    ShowAddSong: boolean
}

export interface ISongCatalog extends ICatalog<ISong, ISongFilter, ISongCatalogOptions> { }
