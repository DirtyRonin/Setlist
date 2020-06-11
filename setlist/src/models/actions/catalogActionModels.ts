import { ISongFilter, ISong, IBandFilter } from "..";

export interface ISongActionProps {
    song:ISong;
    songCatalogId:string;
}

export interface IFilterSongActionProps {
    Filter:ISongFilter,
    Refresh: boolean,
    SongCatalogId:string
}
export interface IFilterBandActionProps {
    Filter:IBandFilter,
    Refresh: boolean,
    BandCatalogId:string
}

export interface INextLinkActionProps {
    NextLink:string,
    CatalogId:string
}

