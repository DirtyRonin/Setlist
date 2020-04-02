import { ISongFilter, ISong } from "..";

export interface INewSongActionProps {
    song:ISong;
    songCatalogId:string;
}

export interface IFilterSongActionProps {
    Filter:ISongFilter,
    Refresh: boolean
}

