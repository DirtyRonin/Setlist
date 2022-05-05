import { ISongFilter, ISong, IBandFilter, IBand, IBandSong, IBandSongFilter, CatalogTypes, DisplayIn, MetaProps, ISetlistFilter, ISetlistSongFilter, ILocationFilter, ICustomEventFilter } from "..";
import { ICustomEvent, ILocation, ISetlist, ISetlistSong } from "../entity";

interface IFilterActionPropsBase<T> {
    filter: T
    refresh: boolean,
}

export interface IFilterActionProps extends IFilterActionPropsBase<ISongFilter | IBandFilter | IBandSongFilter | ISetlistFilter | ISetlistSongFilter> { }
export interface IFilterSongActionProps extends IFilterActionPropsBase<ISongFilter> { }
export interface IFilterBandActionProps extends IFilterActionPropsBase<IBandFilter> { }
export interface IFilterBandSongActionProps extends IFilterActionPropsBase<IBandSongFilter> { }
export interface IFilterSetlistActionProps extends IFilterActionPropsBase<ISetlistFilter> { }
export interface IFilterSetlistSongActionProps extends IFilterActionPropsBase<ISetlistSongFilter> { }
export interface IFilterLocationActionProps extends IFilterActionPropsBase<ILocationFilter> { }
export interface IFilterCustomEventActionProps extends IFilterActionPropsBase<ICustomEventFilter> { }

export interface IEntityActionProps {
    value: ISong | IBand | IBandSong | ISetlist | ISetlistSong | ILocation | ICustomEvent
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
export interface ISetlistSongEntityActionProps extends IEntityActionProps {
    value: ISetlistSong
}
export interface ILocationEntityActionProps extends IEntityActionProps {
    value: ILocation
}
export interface ICustomEventEntityActionProps extends IEntityActionProps {
    value: ICustomEvent
}

export interface IStatusCatalogActionProps {
    show: boolean
    catalogType: CatalogTypes;
    displayIn: DisplayIn;
}

export interface IStatusSongCatalogActionProps extends IStatusCatalogActionProps { }
export interface IStatusBandCatalogActionProps extends IStatusCatalogActionProps { }

export interface IStatusBandSongCatalogActionProps extends IStatusCatalogActionProps {
    bandId: number
}

export interface INextLinkActionProps {
    nextLink: string,
}

export interface IFilterActionResultBase<T> {
    Values: T[];
    Meta: MetaProps;
}



export interface ISwapSetlistSongsActionProps {
    // setlistId: number,
    // x: {id:number,order:number},
    // y: {id:number,order:number}
    setlistSong: ISetlistSong
}
export interface ISwapSetlistSongsActionResult {
    setlistSongs: ISetlistSong[]
}

export interface IFilterSongActionResult extends IFilterActionResultBase<ISong> { }
export interface IFilterBandActionResult extends IFilterActionResultBase<IBand> { }
export interface IFilterBandSongActionResult extends IFilterActionResultBase<IBandSong> { }
export interface IFilterSetlistActionResult extends IFilterActionResultBase<ISetlist> { }
export interface IFilterSetlistSongActionResult extends IFilterActionResultBase<ISetlistSong> { }
export interface IFilterLocationActionResult extends IFilterActionResultBase<ILocation> { }
export interface IFilterCustomEventActionResult extends IFilterActionResultBase<ICustomEvent> { }




