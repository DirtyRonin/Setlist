import { ISong } from ".";

export interface IBandSong {
    Id: string;
    Title: string;
    Popularity: number
    SongId :string
    BandId :string
    Song : ISong
 }