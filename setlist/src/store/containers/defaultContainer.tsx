
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action from '../actions';
import { IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps, IEntityActionProps, IStatusBandSongCatalogActionProps, IFilterBandSongActionProps, bandSongModalActions, IStatusSongCatalogActionProps, IStatusBandCatalogActionProps, Catalog, IComponentOrderActionProps, ISongEntityActionProps } from '../../models';
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

    openBandsCatalog(props: IStatusBandCatalogActionProps): void
    closeBandsCatalog(props: IStatusBandCatalogActionProps): void

    openBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    closeBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void

    setModal(props: IModal): void
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
    bandSongModalActionsProvider: bandSongModalActions
}

interface IStateProps {
    catalogState: ICatalogState;
    openCatalog: Catalog;
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState): IStateProps =>
    ({
        catalogState: state.catalogReducers.catalogState,
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

        openSongsCatalog: () => dispatch(Action.openSongsCatalog.request()),
        closeSongsCatalog: () => dispatch(Action.closeSongsCatalog.request()),

        openBandsCatalog: (props: IStatusBandCatalogActionProps) => dispatch(Action.openBandsCatalog.request(props)),
        closeBandsCatalog: (props: IStatusBandCatalogActionProps) => dispatch(Action.closeBandsCatalog.request(props)),

        openBandSongsCatalog: (props: IStatusBandSongCatalogActionProps) => dispatch(Action.openBandSongsCatalog.request(props)),
        closeBandSongsCatalog: (props: IStatusBandSongCatalogActionProps) => dispatch(Action.closeBandSongsCatalog.request(props)),

        setModal: (props: IModal) => dispatch(Action.setModal(props)),
        songModalActionsProvider: {
            None: () => { },
            New: (props: ISongEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
            Edit: (props: ISongEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
            Remove: (props: ISongEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
            Add: () => { },
            Read: () => dispatch(Action.readSongInCatalog()),
        },
        bandModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
            Read: () => dispatch(Action.readBandInCatalog()),
            Add: () => { },
        },
        bandSongModalActionsProvider: {
            None: () => { },
            New: () => { } /*dispatch(Action.addBandSongToCatalog.request(props))*/,
            Edit: (props: IEntityActionProps) => dispatch(Action.addBandSongToCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.addBandSongToCatalog.request(props)),
            Read: () => dispatch(Action.readBandSongInCatalog()),
            Add: () => { },
        },
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);