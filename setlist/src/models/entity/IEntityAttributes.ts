import { ISong } from ".";

export interface IEntityAttributes {
    Id: string;
    Title: string;
}

export interface ISongAttributes {
    Artist: string;
    OriginalKey: string;
    Evergreen: boolean;
    Nineties: boolean;
    // PlayTime: string;
    Genre: string;
    Comment: string;
}

export interface IBandSongAttributes {
    Popularity: number
    SongId :string
    BandId :string
    Song : ISong
}

