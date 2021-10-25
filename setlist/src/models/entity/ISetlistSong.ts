import { ISong } from ".";

export interface ISetlistSong {
    bandSongId: number;
    songId: number;
    setlistId: number;
    song : ISong
}