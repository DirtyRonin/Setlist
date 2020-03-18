import { IBandResource, ISongResource } from ".";

export interface IBandSongResource{
    Id : string
    BandId? :string
    SongId? :string
    Popularity? : number
    Band? : IBandResource
    Song? : ISongResource
}