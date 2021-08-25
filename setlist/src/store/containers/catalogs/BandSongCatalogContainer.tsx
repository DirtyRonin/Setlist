import * as React from 'react';
import { connect } from "react-redux";
import { History } from "history";

import { RootState } from 'store';

import * as bandSongCatalogActions from 'store/actions/catalogActions/bandSongCatalogActions';
import ModalActions from 'store/actions/modalActions';

import { IBandSongCatalog, IFilterBandSongActionProps, IModalActionsProps, INextLinkActionProps } from 'models';
import BandSongCatalogComponent from 'components/catalogs/bandSongCatalog';

interface IConnectedDispatch {
    setBandSongFilter(props: IFilterBandSongActionProps): void
    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
    fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props:IModalActionsProps):void
}

export interface IProps {
    history: History
}

interface IState extends IProps {
    bandSongCatalog: IBandSongCatalog;
}

export type BandSongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState => {
   
    return {
        bandSongCatalog: state.bandSongCatalogReducers.bandSongCatalog,
        history:props.history
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setBandSongFilter: (props: IFilterBandSongActionProps) => dispatch(bandSongCatalogActions.setBandSongFilter(props)),
    fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch(bandSongCatalogActions.fetchBandSongCatalog.request(props)),
    fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(bandSongCatalogActions.fetchBandSongCatalogNextLink.request(props)),
    setModal:(props:IModalActionsProps) => dispatch(ModalActions.setModal(props))
})

const BandCatalog = (props: BandSongCatalogProps) => (
    <div>
        <BandSongCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);
