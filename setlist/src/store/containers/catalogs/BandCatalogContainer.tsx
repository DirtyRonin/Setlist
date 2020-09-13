import * as React from 'react';
import { connect } from "react-redux";
import BandCatalogComponent from '../../../components/catalogs/bandCatalog';

import { RootState } from '../..';
import { IFilterBandActionProps, INextLinkActionProps, IModal, IBandCatalog, Catalog, IComponentOrderActionProps, IContainerProps, IEntityActionProps, ISong, IBandSongEntityActionProps, IStatusBandSongCatalogActionProps } from '../../../models';
import * as Action from '../../actions/catalogActions/bandCatalogActions';
import * as Common from '../../actions/commonActions';
import * as bandSongAction from '../../actions/bandSongCatalogActions'


interface IConnectedDispatch {
    initBandCatalog(): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void
    openBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    setModal(props: IModal): void
    addToBandSongsAction:(props: IBandSongEntityActionProps) => void
}

interface IState extends IOwnBandCatalogProps {
    bandlist: IBandCatalog;
    showModal: boolean;
    openedCatalogs: string[];
}

export type BandCatalogProps = IConnectedDispatch & IState

export interface IOwnBandCatalogProps{
    bandCatalogId:string
    ownNodeProps? : {
        songCatalogId:string
        song:ISong
    }
}

const mapStateToProps = (state: RootState, containerProps: IOwnBandCatalogProps): IState =>
    ({
        bandlist: state.bandCatalogReducers.bandState.bandCatalog,
        showModal: state.catalogReducers.catalogState.modal.show,
        openedCatalogs: state.catalogReducers.catalogState.catalogsOrder,
        bandCatalogId: containerProps.bandCatalogId,
        ownNodeProps:containerProps.ownNodeProps,
    });

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    initBandCatalog: () => dispatch(Action.openBandsCatalog_New.request()),
    fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    setModal: (props: IModal) => dispatch(Common.setModal(props)),
    addToBandSongsAction:(props:IBandSongEntityActionProps) => dispatch(bandSongAction.addBandSongToCatalog.request(props)),
    openBandSongsCatalog:(props: IStatusBandSongCatalogActionProps) => dispatch(bandSongAction.openBandSongsCatalog.request(props)),

})

const BandCatalog = (props: BandCatalogProps) => (
    <div>
        <BandCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);

