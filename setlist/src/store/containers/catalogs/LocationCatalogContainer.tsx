import * as React from 'react';
import { connect } from "react-redux";

import { RootState } from '../..';
import LocationCatalogComponent from '../../../components/catalogs/locationCatalog';
import { IComponentOrderActionProps, IFilterLocationActionProps, ILocationCatalog } from '../../../models';

import * as Common from '../../actions/commonActions';
import * as LocationAction from '../../actions/catalogActions/locationCatalogActions';

interface IConnectedDispatch {
    pushCatalogsOrder: (props: IComponentOrderActionProps) => void,
    fetchLocationCatalog: (props: IFilterLocationActionProps) => void
}

interface IState {
    locationCatalog: ILocationCatalog;
    showModal: boolean;
}

export type LocationCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState) : IState => ({
    showModal:state.catalogReducers.catalogState.modal.show,
    locationCatalog: state.locationCatalogReducers.locationCatalog
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    fetchLocationCatalog: (props: IFilterLocationActionProps) => dispatch(LocationAction.fetchLocationCatalog.request(props)),
})

const LocationCatalog = (props: LocationCatalogProps) => (
    <div>
        <LocationCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(LocationCatalog);