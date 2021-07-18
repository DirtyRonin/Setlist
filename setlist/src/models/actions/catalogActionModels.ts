import { ISongFilter, ISong, IBandFilter, IBand, IBandSong, IBandSongFilter,  CatalogTypes, DisplayIn, NodeTypes, ODataProps } from "..";

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
    catalogType: CatalogTypes;
    catalogId: string;
    displayIn: DisplayIn;
    nodeType: NodeTypes
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

export interface IFilterActionResultBase<T> {
    Values: Map<string, T>;
    OData: ODataProps;
}

export interface IFilterSongActionResult extends IFilterActionResultBase<ISong> { }
export interface IFilterBandActionResult extends IFilterActionResultBase<IBand> { }
export interface IFilterBandSongActionResult extends IFilterActionResultBase<IBandSong> { }




