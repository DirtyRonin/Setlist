import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';
import CustomEventCatalogComponent from '../../../components/catalogs/customEventCatalog';
import { IComponentOrderActionProps, IFilterCustomEventActionProps, ICustomEventCatalog } from '../../../models';

import * as Common from '../../actions/commonActions';
import * as CustomEventAction from '../../actions/catalogActions/customEventCatalogActions';

interface IConnectedDispatch {
    pushCatalogsOrder: (props: IComponentOrderActionProps) => void,
    fetchCustomEventCatalog: (props: IFilterCustomEventActionProps) => void
}

interface IState {
    customEventCatalog: ICustomEventCatalog;
    showModal: boolean;
}

export type CustomEventCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState) : IState => ({
    showModal:state.catalogReducers.catalogState.modal.show,
    customEventCatalog: state.customEventCatalogReducers.customEventCatalog
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    fetchCustomEventCatalog: (props: IFilterCustomEventActionProps) => dispatch(CustomEventAction.fetchCustomEventCatalog.request(props)),
})

const CustomEventCatalog = (props: CustomEventCatalogProps) => (
    <div>
        <CustomEventCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(CustomEventCatalog);