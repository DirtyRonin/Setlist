
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action  from '../actions';
import { createEmptySongCatalog, createEmptyBandCatalog } from '../../service';
import { IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps, IEntityActionProps, IStatusBandSongCatalogActionProps, IFilterBandSongActionProps } from '../../models';
import { bandModalActions } from '../../models/modals/modelBand';

interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void

    fetchBandSongCatalog(props: IFilterBandSongActionProps): void 
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void

    fetchSongCatalogNextLink(props: INextLinkActionProps): void
    fetchBandCatalogNextLink(props: INextLinkActionProps): void
    fetchBandSongCatalogNextLink(props: INextLinkActionProps): void

    openBandSongsCatalog(props : IStatusBandSongCatalogActionProps): void
    closeBandSongsCatalog(props : IStatusBandSongCatalogActionProps):void
    
    setModal(props: IModal): void
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
}

interface IStateProps {
    catalogState: ICatalogState;
    createEmptySongCatalog: (catalogState: ICatalogState) => ICatalogState;
    createEmptyBandCatalog: (catalogState: ICatalogState) => ICatalogState;
    createEmptyBandSongCatalog: (catalogState: ICatalogState) => ICatalogState;
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState): IStateProps =>
    ({
        catalogState: state.catalogReducers.catalogState,
        createEmptySongCatalog,
        createEmptyBandCatalog,
    } as IStateProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        setCatalogState: (catalogState: ICatalogState) => dispatch(Action.setCatalogState(catalogState)),

        fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch (Action.fetchBandSongCatalog.request(props)),
        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),

        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
        fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandSongCatalogNextLink.request(props)),

        openBandSongsCatalog:(props : IStatusBandSongCatalogActionProps) => dispatch(Action.openBandSongsCatalog.request(props)),
        closeBandSongsCatalog:(props : IStatusBandSongCatalogActionProps) => dispatch(Action.closeBandSongsCatalog.request(props)),

        setModal: (props: IModal) => dispatch(Action.setModal(props)),
        songModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
            Read: () => dispatch(Action.readSongInCatalog()),
        },
        bandModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
            Read: () => dispatch(Action.readBandInCatalog()),
        }
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);