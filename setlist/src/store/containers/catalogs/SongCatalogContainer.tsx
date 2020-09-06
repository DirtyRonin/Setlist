import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';

import SongCatalogComponent from '../../../components/catalogs/songCatalog';
import { IFilterSongActionProps, INextLinkActionProps, IModal, ISongCatalog } from '../../../models';

import * as Action from '../../actions/catalogActions/songCatalogActions';
import * as Common from '../../actions/commonActions';


interface IConnectedDispatch{
    initBandCatalog(): void
    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props: IModal): void
}

interface IState{
    showModal: boolean;
    songlist: ISongCatalog;
}

export type SongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState): IState =>({
    showModal: state.catalogReducers.catalogState.modal.show,
    songlist: state.songCatalogReducers.songCatalog
})

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    initBandCatalog: () => dispatch(Action.openSongCatalog_New.request()),
    fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
    setModal: (props: IModal) => dispatch(Common.setModal(props)),
})

const SongCatalog = (props: SongCatalogProps) => (
    <div>
        <SongCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(SongCatalog);