import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';

import SongCatalogComponent from '../../../components/catalogs/songCatalog';
import { IFilterSongActionProps, INextLinkActionProps, IModal, ISongCatalog, IComponentOrderActionProps } from '../../../models';

import * as Action from '../../actions/catalogActions/songCatalogActions';
import * as Common from '../../actions/commonActions';


interface IConnectedDispatch {
    initBandCatalog(): void
    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void
    popCatalogsOrder(): void
}

export interface IOwnProps { catalogId: string }

interface IState extends IOwnProps{
    showModal: boolean;
    songlist: ISongCatalog;
}

export type SongCatalogProps = IConnectedDispatch & IState



const mapStateToProps = (state: RootState, ownProps: IOwnProps): IState => {
    const { catalogId } = ownProps

    return {
        showModal: state.catalogReducers.catalogState.modal.show,
        songlist: state.songCatalogReducers.songCatalog,
        catalogId: catalogId
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    initBandCatalog: () => dispatch(Action.openSongCatalog_New.request()),
    fetchSongCatalog: (props: IFilterSongActionProps) => dispatch(Action.fetchSongCatalog.request(props)),
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchSongCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    popCatalogsOrder: () => dispatch(Common.popComponentOrder.request()),
})

const SongCatalog = (props: SongCatalogProps) => {
    return (
        <div>
            {SongCatalogComponent(props)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCatalog);