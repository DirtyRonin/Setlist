export interface ISong{
    Id: string;
    Title: string;
    Artist: string;
    OriginalKey: string;
    Evergreen: boolean;
    Nineties:boolean;
    // PlayTime: string;
    Genre: string;
    Comment: string;
   }

export interface IBandSong extends ISong {
    Popularity : number
 }
export interface ISetSong extends IBandSong { }
