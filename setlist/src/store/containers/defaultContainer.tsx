
import * as React from 'react';
import { connect } from 'react-redux';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import { addSongToCatalog, fetchSongCatalog, setCatalogState, fetchSongCatalogNextLink, setSongModal, editSongInCatalog, deleteSongInCatalog, readSongInCatalog, fetchBandCatalog } from '../actions';
import { createEmptySongCatalog,createEmptyBandCatalog } from '../../service';
import { ISongActionProps, IFilterSongActionProps, INextLinkActionProps, IModal, songModalActions, IFilterBandActionProps } from '../../models';

interface IAppConnectedDispatch {
    setCatalogState(catalogState: ICatalogState): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink(props: INextLinkActionProps): void
    setSongModal(props: IModal): void
    songModalActionsProvider: songModalActions
}

interface IStateProps {
    catalogState: ICatalogState;
    createEmptySongCatalog: (catalogState : ICatalogState) => ICatalogState;
    createEmptyBandCatalog: (catalogState : ICatalogState) => ICatalogState;
}

export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState): IStateProps =>
    ({
        catalogState: state.catalogReducers.catalogState,
        createEmptySongCatalog,
        createEmptyBandCatalog
    } as IStateProps);

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {
        setCatalogState: (catalogState: ICatalogState) => dispatch(setCatalogState(catalogState)),
        fetchBandCatalog:(props: IFilterBandActionProps) => dispatch(fetchBandCatalog.request(props)),
        fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(fetchSongCatalog.request(props)),
        fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(fetchSongCatalogNextLink.request(props)),
        setSongModal:(props:IModal) => dispatch(setSongModal(props)),
        songModalActionsProvider: {
            None: (props: ISongActionProps) => { },
            New: (props: ISongActionProps) => dispatch(addSongToCatalog.request(props)),
            Edit: (props: ISongActionProps) => dispatch(editSongInCatalog.request(props)),
            Remove: (props: ISongActionProps) => dispatch(deleteSongInCatalog.request(props)),
            Read: (props: ISongActionProps) => dispatch(readSongInCatalog()),
        }
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);