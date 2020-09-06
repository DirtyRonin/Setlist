import { ISongFilter, ISong, IBandFilter, IBand, IBandSong, IBandSongFilter, CatalogType } from "..";

interface IFilterActionPropsBase<T> {
    catalogId: string;
    filter: T
    refresh: boolean,
}

export interface IFilterActionProps extends IFilterActionPropsBase<ISongFilter | IBandFilter | IBandSongFilter> { }
export interface IFilterSongActionProps extends IFilterActionPropsBase<ISongFilter> { }
export interface IFilterBandActionProps extends IFilterActionPropsBase<IBandFilter> { }
export interface IFilterBandSongActionProps extends IFilterActionPropsBase<IBandSongFilter> { }

export interface IEntityActionProps {
    catalogId: string;
    value: ISong | IBand | IBandSong
}
export interface ISongEntityActionProps extends IEntityActionProps {
    value: ISong
}
export interface IBandEntityActionProps extends IEntityActionProps {
    value: IBand
}

export interface IBandSongEntityActionProps extends IEntityActionProps {
    value: IBandSong
}

export interface IStatusCatalogActionProps {
    show: boolean
    catalogType: CatalogType;
    catalogId: string;
}

export interface IStatusSongCatalogActionProps extends IStatusCatalogActionProps { }
export interface IStatusBandCatalogActionProps extends IStatusCatalogActionProps { }

export interface IStatusBandSongCatalogActionProps extends IStatusCatalogActionProps {
    bandId: string
}

export interface INextLinkActionProps {
    catalogId: string;
    nextLink: string,
}

