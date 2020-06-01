import { ISongFilter, ISong } from "..";

export interface ISongActionProps {
    song:ISong;
    songCatalogId:string;
}

export interface IFilterSongActionProps {
    Filter:ISongFilter,
    Refresh: boolean,
    SongCatalogId:string
}

export interface INextLinkActionProps {
    NextLink:string,
    CatalogId:string
}

