import { IBandSongResource, IBandUserResource } from ".";

export interface IBandResource {
    Id: string;
    Title: string;
    BandSongs?: IBandSongResource[]
    BandUsers?: IBandUserResource[]
}