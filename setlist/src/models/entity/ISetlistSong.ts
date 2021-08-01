import { ISong } from ".";

export interface ISetlistSong{
    Id: string;
    BandSongId: string;
    SongId: string;
    SetlistId: string;
    Song : ISong
}