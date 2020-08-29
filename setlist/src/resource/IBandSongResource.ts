import { ISongResource } from ".";

export interface IBandSongResource{
    Id : string
    BandId :string
    SongId :string
    Popularity : number
    Song : ISongResource
}