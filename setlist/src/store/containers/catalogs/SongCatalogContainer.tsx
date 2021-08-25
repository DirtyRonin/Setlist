import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from 'store';

import { History } from 'history';

import SongCatalogComponent from 'components/catalogs/songCatalog';
import { IFilterSongActionProps, INextLinkActionProps, ISongCatalog, IModalActionsProps } from 'models';

import * as Action from 'store/actions/catalogActions/songCatalogActions';
import ModalActions from 'store/actions/modalActions';


interface IConnectedDispatch {
    setSongFilter(props: IFilterSongActionProps): void
    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props:IModalActionsProps):void
}

interface IProps {
    history: History
}

interface IState extends IProps {
    songCatalog: ISongCatalog;
    
}

export type SongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState => (
    {
        songCatalog: state.songCatalogReducers.songCatalog,
        history:props.history
    }
)

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
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