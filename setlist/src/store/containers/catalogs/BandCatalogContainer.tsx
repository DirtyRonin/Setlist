import * as React from 'react';
import { connect } from "react-redux";
import BandCatalogComponent from '../../../components/catalogs/bandCatalog';

import { RootState } from '../..';
import { IFilterBandActionProps, INextLinkActionProps, IModal, IBandCatalog, Catalog } from '../../../models';
import * as Action from '../../actions/catalogActions/bandCatalogActions';
import * as Common from '../../actions/commonActions';


interface IConnectedDispatch {
    initBandCatalog(): void
    fetchBandCatalog(props: IFilterBandActionProps): void
    fetchBandCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props: IModal): void
}

interface IState {
    bandlist: IBandCatalog;
    showModal: boolean;
    openedCatalogs: string[];
}

export type BandCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState): IState =>
    ({
        bandlist: state.bandCatalogReducers.bandCatalog,
        showModal: state.catalogReducers.catalogState.modal.show,
        openedCatalogs: state.catalogReducers.catalogState.componentsOrder,
    });

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch =>( {
        initBandCatalog: () => dispatch(Action.openBandsCatalog_New.request()),
        fetchBandCatalog: (props: IFilterBandActionProps) => dispatch(Action.fetchBandCatalog.request(props)),
        fetchBandCatalogNextLink: (props: INextLinkActionProps) => dispatch(Action.fetchBandCatalogNextLink.request(props)),
        setModal: (props: IModal) => dispatch(Common.setModal(props))
})

const BandCatalog = (props: BandCatalogProps) => (
    <div>
        <BandCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BandCatalog);

