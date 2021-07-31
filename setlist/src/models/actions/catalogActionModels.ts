import { ISongFilter, ISong, IBandFilter, IBand, IBandSong, IBandSongFilter,  CatalogTypes, DisplayIn, ODataProps, ISetlistFilter } from "..";
import { ISetlist } from "../entity";

interface IFilterActionPropsBase<T> {
    catalogId: string;
    filter: T
    refresh: boolean,
}

export interface IFilterActionProps extends IFilterActionPropsBase<ISongFilter | IBandFilter | IBandSongFilter | ISetlistFilter> { }
export interface IFilterSongActionProps extends IFilterActionPropsBase<ISongFilter> { }
export interface IFilterBandActionProps extends IFilterActionPropsBase<IBandFilter> { }
export interface IFilterBandSongActionProps extends IFilterActionPropsBase<IBandSongFilter> { }
export interface IFilterSetlistActionProps extends IFilterActionPropsBase<ISetlistFilter> { }

export interface IEntityActionProps {
    catalogId: string;
    value: ISong | IBand | IBandSong | ISetlist
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
export interface ISetlistEntityActionProps extends IEntityActionProps {
    value: ISetlist
}

export interface IStatusCatalogActionProps {
    show: boolean
    catalogType: CatalogTypes;
    catalogId: string;
    displayIn: DisplayIn;
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
export interface IFilterSetlistActionResult extends IFilterActionResultBase<ISetlist> { }




