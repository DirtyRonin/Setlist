
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import { addSongToCatalog, fetchSongCatalog, setCatalogState, fetchSongCatalogNextLink, setModal, editSongInCatalog, deleteSongInCatalog, readSongInCatalog, fetchBandCatalog, fetchBandCatalogNextLink, addBandToCatalog, readBandInCatalog, editBandInCatalog, deleteBandInCatalog, openBandSongsCatalog, fetchBandSongCatalog, closeBandSongsCatalog } from '../actions';
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
        setCatalogState: (catalogState: ICatalogState) => dispatch(setCatalogState(catalogState)),

        fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch (fetchBandSongCatalog.request(props)),
        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(fetchSongCatalog.request(props)),

        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(fetchSongCatalogNextLink.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(fetchBandCatalogNextLink.request(props)),

        openBandSongsCatalog:(props : IStatusBandSongCatalogActionProps) => dispatch(openBandSongsCatalog.request(props)),
        closeBandSongsCatalog:(props : IStatusBandSongCatalogActionProps) => dispatch(closeBandSongsCatalog.request(props)),

        setModal: (props: IModal) => dispatch(setModal(props)),
        songModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(addSongToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(editSongInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(deleteSongInCatalog.request(props)),
            Read: () => dispatch(readSongInCatalog()),
        },
        bandModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(deleteBandInCatalog.request(props)),
            Read: () => dispatch(readBandInCatalog()),
        }
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);