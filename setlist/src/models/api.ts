
export interface IApiBandlist {
    Id: string;
    Title: string;
    Bandsongs: IBandSongRef[];
    Setlists: IApiSetList[];
}
export interface IBandSongRef {
    SongId:string
}

export interface IApiSetList {
    Id: string;
    Title: string;
    BandId:number;
    Setsongs: ISetSongRef[];
}

export interface ISetSongRef {
    SongId:string
}

export interface IOdataWrapper<T> {
    Context:string
    Count:number
    NextLink:string
    Values: T[]
}
