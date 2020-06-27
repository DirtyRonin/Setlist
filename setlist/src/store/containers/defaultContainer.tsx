
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import { addSongToCatalog, fetchSongCatalog, setCatalogState, fetchSongCatalogNextLink, setModal, editSongInCatalog, deleteSongInCatalog, readSongInCatalog, fetchBandCatalog, fetchBandCatalogNextLink, addBandToCatalog, readBandInCatalog, editBandInCatalog, deleteBandInCatalog, showBandSongsCatalog } from '../actions';
import { createEmptySongCatalog, createEmptyBandCatalog, newBandSongCatalog } from '../../service';
import { ISongEntityActionProps, IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps, IBandEntityActionProps, IEntityActionProps, ICatalog, Catalog } from '../../models';
import { bandModalActions } from '../../models/modals/modelBand';

interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void

    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void

    fetchSongCatalogNextLink(props: INextLinkActionProps): void
    fetchBandCatalogNextLink(props: INextLinkActionProps): void

    showBandSongsCatalog(catalogId: string,show :boolean): void
    
    setModal(props: IModal): void
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
}

interface IStateProps {
    catalogState: ICatalogState;
    createEmptySongCatalog: (catalogState: ICatalogState) => ICatalogState;
    createEmptyBandCatalog: (catalogState: ICatalogState) => ICatalogState;
    newBandSongCatalog: (catalogId : string) => Catalog
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState): IStateProps =>
    ({
        catalogState: state.catalogReducers.catalogState,
        createEmptySongCatalog,
        createEmptyBandCatalog,
        newBandSongCatalog
    } as IStateProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        setCatalogState: (catalogState: ICatalogState) => dispatch(setCatalogState(catalogState)),

        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(fetchSongCatalog.request(props)),

        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(fetchSongCatalogNextLink.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(fetchBandCatalogNextLink.request(props)),

        showBandSongsCatalog:(catalogId: string,show :boolean) => dispatch(showBandSongsCatalog(catalogId,show)),

        setModal: (props: IModal) => dispatch(setModal(props)),
        songModalActionsProvider: {
            None: (props: IEntityActionProps) => { },
            New: (props: IEntityActionProps) => dispatch(addSongToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(editSongInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(deleteSongInCatalog.request(props)),
            Read: (props: IEntityActionProps) => dispatch(readSongInCatalog()),
        },
        bandModalActionsProvider: {
            None: (props: IEntityActionProps) => { },
            New: (props: IEntityActionProps) => dispatch(addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(deleteBandInCatalog.request(props)),
            Read: (props: IEntityActionProps) => dispatch(readBandInCatalog()),
            
        }
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);