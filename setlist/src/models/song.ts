export interface ISong{
    Id: string;
    Title: string;
    Artist: string;
    Key: string;
   }

export interface IBandSong extends ISong {
    Popularity : number
 }
export interface ISetSong extends IBandSong { }
