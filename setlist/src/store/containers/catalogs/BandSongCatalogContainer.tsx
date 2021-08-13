import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';

import * as bandSongCatalogActions from '../../actions/catalogActions/bandSongCatalogActions';
import * as Common from '../../actions/commonActions';

import { IBandSongCatalog, IComponentOrderActionProps, IFilterBandSongActionProps, INextLinkActionProps } from '../../../models';
import BandSongCatalogComponent from '../../../components/catalogs/bandSongCatalog';

interface IConnectedDispatch {
    setBandSongFilter(props: IFilterBandSongActionProps): void
    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
    fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}

export interface IAdditionalBandCatalogProps {
    // selectedNode: undefined
    bandId?: string
}

interface IState extends IAdditionalBandCatalogProps {
    showModal: boolean;
    bandSongCatalog: IBandSongCatalog;
}

export type BandSongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState , additionalBandCatalogProps: IAdditionalBandCatalogProps): IState => {
     const { bandId } = additionalBandCatalogProps

    return {
        showModal: state.catalogReducers.catalogState.modal.show,
        bandSongCatalog: state.bandSongCatalogReducers.bandSongCatalog,
        bandId
        /* catalogId: catalogId */
    }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setBandSongFilter: (props: IFilterBandSongActionProps) => dispatch(bandSongCatalogActions.setBandSongFilter(props)),
    fetchBandSongCatalog: (props: IFilterBandSongActionProps) => dispatch(bandSongCatalogActions.fetchBandSongCatalog.request(props)),
    fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(bandSongCatalogActions.fetchBandSongCatalogNextLink.request(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
})

const BandCatalog = (props: BandSongCatalogProps) => (
    <div>
        <BandSongCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);
