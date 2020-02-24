export interface ISong{
    id: string;
    title: string;
    artist: string;
    mode: string;
}

export interface IMainSong extends ISong { }
export interface IBandSong extends IMainSong { }
export interface ISetSong extends IBandSong { }
