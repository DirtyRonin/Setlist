import { ISongResource } from ".";

export interface ISetlistSongResource {
    Id: string;
    BandSongId?: string;
    SongId: string;
    SetlistId: string;
    Song : ISongResource
}