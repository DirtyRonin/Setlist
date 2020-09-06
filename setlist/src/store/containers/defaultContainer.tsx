
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action from '../actions';
import { createEmptySongCatalog, createEmptyBandCatalog } from '../../service';
import { IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps, IEntityActionProps, IStatusBandSongCatalogActionProps, IFilterBandSongActionProps, bandSongModalActions, IStatusSongCatalogActionProps, IStatusBandCatalogActionProps, ICatalog, Catalog } from '../../models';
import { bandModalActions } from '../../models/modals/modelBand';
import { StateType } from 'typesafe-actions';

import catalogsReducer from "../reducers/catalogReducers"

interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void

    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void

    fetchSongCatalogNextLink(props: INextLinkActionProps): void
    fetchBandCatalogNextLink(props: INextLinkActionProps): void
    fetchBandSongCatalogNextLink(props: INextLinkActionProps): void

    openSongsCatalog(props: IStatusSongCatalogActionProps): void
    closeSongsCatalog(props: IStatusSongCatalogActionProps): void

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

        fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch(Action.fetchBandSongCatalog.request(props)),
        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),

        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
        fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandSongCatalogNextLink.request(props)),

        openSongsCatalog: (props: IStatusSongCatalogActionProps) => dispatch(Action.openSongsCatalog.request(props)),
        closeSongsCatalog: (props: IStatusSongCatalogActionProps) => dispatch(Action.closeSongsCatalog.request(props)),

        openBandsCatalog: (props: IStatusBandCatalogActionProps) => dispatch(Action.openBandsCatalog.request(props)),
        closeBandsCatalog: (props: IStatusBandCatalogActionProps) => dispatch(Action.closeBandsCatalog.request(props)),

        openBandSongsCatalog: (props: IStatusBandSongCatalogActionProps) => dispatch(Action.openBandSongsCatalog.request(props)),
        closeBandSongsCatalog: (props: IStatusBandSongCatalogActionProps) => dispatch(Action.closeBandSongsCatalog.request(props)),

        setModal: (props: IModal) => dispatch(Action.setModal(props)),
        songModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
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
            New: (props: IEntityActionProps) => { } /*dispatch(Action.addBandSongToCatalog.request(props))*/,
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