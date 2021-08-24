import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';

import { History } from 'history';

import SongCatalogComponent from '../../../components/catalogs/songCatalog';
import { IFilterSongActionProps, INextLinkActionProps, IModal, ISongCatalog, IComponentOrderActionProps, IModalActionsProps } from 'models';

import * as Action from '../../actions/catalogActions/songCatalogActions';
import * as Common from '../../actions/commonActions';
import ModalActions from 'store/actions/modalActions';


interface IConnectedDispatch {
    setSongFilter(props: IFilterSongActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void
    setModal(props:IModalActionsProps):void
}

interface IProps {
    history: History
}

interface IState extends IProps {
    showModal: boolean;
    songCatalog: ISongCatalog;
    
}

export type SongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState => {

    return {
        showModal: state.modalReducers.modalState.showModal,
        songCatalog: state.songCatalogReducers.songCatalog,
        history:props.history
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    setSongFilter: (props: IFilterSongActionProps) => dispatch(Action.setSongFilter(props)),
    setModal:(props:IModalActionsProps) => dispatch(ModalActions.setModal(props))
})

const SongCatalog = (props: SongCatalogProps) => {
    return (
        <div>
            {SongCatalogComponent(props)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCatalog);