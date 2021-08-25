import { ISong } from ".";

export interface IBandSong {
    Id: string;
    Popularity: number
    SongId :string
    BandId :string
    Song : ISong
 }