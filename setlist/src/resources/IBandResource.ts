import { IBandSongResource } from ".";

export interface IBandResource {
    Id: string;
    Title: string;
    BandSongs?: IBandSongResource[]
}