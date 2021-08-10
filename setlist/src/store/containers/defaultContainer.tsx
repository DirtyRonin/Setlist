
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action from '../actions';
import { IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps, IEntityActionProps, IStatusBandSongCatalogActionProps, IFilterBandSongActionProps, bandSongModalActions, IStatusSongCatalogActionProps, IStatusBandCatalogActionProps, Catalog, IComponentOrderActionProps, ISongEntityActionProps, IUser, setlistModalActions, ISetlistEntityActionProps, IBandSongEntityActionProps } from '../../models';
import { bandModalActions } from '../../models/modals/modelBand';


interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void

    pushCatalogsOrder(props: IComponentOrderActionProps): void
    popCatalogsOrder(): void

    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void

    fetchSongCatalogNextLink(props: INextLinkActionProps): void
    fetchBandCatalogNextLink(props: INextLinkActionProps): void
    fetchBandSongCatalogNextLink(props: INextLinkActionProps): void

    openSongsCatalog(): void
    closeSongsCatalog(): void

    openBandsCatalog(): void
    closeBandsCatalog(): void
    refreshBandsCatalog():void

    openBandSongsCatalog(bandId: string): void
    closeBandSongsCatalog(): void

    openSetlistCatalog(): void
    closeSetlistCatalog(): void

    openSetlistSongCatalog(): void
    closeSetlistSongCatalog(): void

    openLocationCatalog(): void
    closeLocationCatalog(): void

    openCustomEventCatalog(): void
    closeCustomEventCatalog(): void

    setModal(props: IModal): void
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
    bandSongModalActionsProvider: bandSongModalActions
    setlistModalActionsProvider: setlistModalActions

    getUser(props: string): void
}

interface IStateProps {
    catalogState: ICatalogState;
    userState: IUser
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState): IStateProps =>
({
    catalogState: state.catalogReducers.catalogState,
    userState: state.userReducers.user
} as IStateProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        setCatalogState: (catalogState: ICatalogState) => dispatch(Action.setCatalogState(catalogState)),

        pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Action.pushComponentOrder.request(props)),
        popCatalogsOrder: () => dispatch(Action.popComponentOrder.request()),

        fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch(Action.fetchBandSongCatalog.request(props)),
        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),

        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
        fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandSongCatalogNextLink.request(props)),

        openSongsCatalog: () => dispatch(Action.openSongCatalog()),
        closeSongsCatalog: () => dispatch(Action.closeSongCatalog()),

        openBandsCatalog: () => dispatch(Action.openBandsCatalog()),
        closeBandsCatalog: () => dispatch(Action.closeBandsCatalog()),
        refreshBandsCatalog: () => dispatch(Action.refreshBandsCatalog()),
        

        openBandSongsCatalog: (bandId: string) => dispatch(Action.openBandSongsCatalog(bandId)),
        closeBandSongsCatalog: () => dispatch(Action.closeBandSongsCatalog()),

        openSetlistCatalog: () => dispatch(Action.openSetlistsCatalog()),
        closeSetlistCatalog: () => dispatch(Action.closeSetlistsCatalog()),

        openSetlistSongCatalog: () => dispatch(Action.openSetlistSongCatalog()),
        closeSetlistSongCatalog: () => dispatch(Action.closeSetlistSongCatalog()),

        openLocationCatalog: () => dispatch(Action.openLocationCatalog()),
        closeLocationCatalog: () => dispatch(Action.closeLocationCatalog()),

        openCustomEventCatalog: () => dispatch(Action.openCustomEventCatalog()),
        closeCustomEventCatalog: () => dispatch(Action.closeCustomEventCatalog()),

        setModal: (props: IModal) => dispatch(Action.setModal(props)),
        songModalActionsProvider: {
            None: () => { },
            New: (props: ISongEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
            Edit: (props: ISongEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
            Remove: (props: ISongEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
            Add: () => { },
            Read: () => dispatch(Action.readSongInCatalog()),
            ShowCatalog: () => { }
        },
        bandModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
            Read: () => dispatch(Action.readBandInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },
        bandSongModalActionsProvider: {
            None: () => { },
            New: () => { } /*dispatch(Action.addBandSongToCatalog.request(props))*/,
            Edit: (props: IBandSongEntityActionProps) => dispatch(Action.addBandSongToCatalog.request(props)),
            Remove: (props: IBandSongEntityActionProps) => { },
            Read: () => dispatch(Action.readBandSongInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },
        setlistModalActionsProvider: {
            None: () => { },
            New: (props: ISetlistEntityActionProps) => dispatch(Action.addSetListToCatalog.request(props)),
            Edit: (props: ISetlistEntityActionProps) => { },
            Remove: (props: ISetlistEntityActionProps) => { },
            Read: () => dispatch(Action.readSetlistInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },

        getUser: (props: string) => dispatch(Action.getUser.request(props)),
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);