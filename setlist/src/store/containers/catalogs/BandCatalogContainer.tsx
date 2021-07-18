import * as React from 'react';
import { connect } from "react-redux";
import BandCatalogComponent from '../../../components/catalogs/bandCatalog';

import { RootState } from '../..';
import { IFilterBandActionProps, INextLinkActionProps, IModal, IBandCatalog, IComponentOrderActionProps, ISong, IBandSongEntityActionProps, IStatusBandSongCatalogActionProps, IComponentOrder } from '../../../models';
import * as Action from '../../actions/catalogActions/bandCatalogActions';
import * as Common from '../../actions/commonActions';
import * as bandSongAction from '../../actions/catalogActions/bandSongCatalogActions'


interface IConnectedDispatch {
    setBandFilter(props: IFilterBandActionProps): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void
    openBandSongsCatalog(bandId: string): void
    // setModal(props: IModal): void
    addToBandSongsAction: (props: IBandSongEntityActionProps) => void
}

// export interface IOwnBandCatalogProps{
//     // bandCatalogId:string
//     ownNodeProps? : {
//         songCatalogId:string
//         song:ISong
//     }
// }

export interface IAdditionalBandCatalogProps {
    selectedNode: ISong | undefined
}

interface IState extends IAdditionalBandCatalogProps {
    bandcatalog: IBandCatalog;
    showModal: boolean;
}

export type BandCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, additionalBandCatalogProps: IAdditionalBandCatalogProps): IState =>
({
    bandcatalog: state.bandCatalogReducers.bandCatalog,
    showModal: state.catalogReducers.catalogState.modal.show,
    // bandCatalogId: containerProps.bandCatalogId,
    selectedNode: additionalBandCatalogProps.selectedNode,
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    setBandFilter: (props: IFilterBandActionProps) => dispatch(Action.setBandFilter(props)),

    // setModal: (props: IModal) => dispatch(Common.setModal(props)),
    addToBandSongsAction: (props: IBandSongEntityActionProps) => dispatch(bandSongAction.addBandSongToCatalog.request(props)),
    openBandSongsCatalog: (bandId: string) => dispatch(bandSongAction.openBandSongsCatalog(bandId)),

})

const BandCatalog = (props: BandCatalogProps) => (
    <div>
        <BandCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);

