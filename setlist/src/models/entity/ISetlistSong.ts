import { ISong } from ".";

export interface ISetlistSong {
    id: number
    bandSongId: number;
    songId: number;
    setlistId: number;
    order: number;
    song: ISong
}