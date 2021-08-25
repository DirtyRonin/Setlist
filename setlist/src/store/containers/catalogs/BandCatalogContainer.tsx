import * as React from 'react';
import { connect } from "react-redux";
import {History} from 'history'

import BandCatalogComponent from '../../../components/catalogs/bandCatalog';

import { RootState } from '../..';
import { IFilterBandActionProps, INextLinkActionProps, IModal, IBandCatalog, IComponentOrderActionProps, ISong, IBandSongEntityActionProps, IStatusBandSongCatalogActionProps, IComponentOrder, IModalActionsProps } from '../../../models';
import * as Action from '../../actions/catalogActions/bandCatalogActions';
import * as Common from '../../actions/commonActions';
import * as bandSongAction from '../../actions/catalogActions/bandSongCatalogActions'
import ModalActions from 'store/actions/modalActions';


interface IConnectedDispatch {
    setModal(props: IModalActionsProps): void

    setBandFilter(props: IFilterBandActionProps): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void

    setBandIdForBandSong(props:string) : void
}

interface IProps {
    history: History
}

interface IState extends IProps {
    bandcatalog: IBandCatalog;
    showModal: boolean;
}

export type BandCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState =>
({
    bandcatalog: state.bandCatalogReducers.bandCatalog,
    showModal: state.catalogReducers.catalogState.modal.show,
    history: props.history
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    setBandFilter: (props: IFilterBandActionProps) => dispatch(Action.setBandFilter(props)),

    
    setModal: (props: IModalActionsProps) => dispatch(ModalActions.setModal(props)),
    setBandIdForBandSong:(props:string) => dispatch(bandSongAction.setBandIdForBandSong(props))
})

const BandCatalog = (props: BandCatalogProps) => (
    <div>
        <BandCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);

