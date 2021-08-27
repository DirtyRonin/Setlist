import * as React from 'react';
import { connect } from "react-redux";
import { History } from 'history';

import { RootState } from 'store';
import LocationCatalogComponent from 'components/catalogs/locationCatalog';
import { IFilterLocationActionProps, ILocationCatalog, IModalActionsProps, INextLinkActionProps } from 'models';

import ModalActions from 'store/actions/modalActions';
import * as LocationAction from 'store/actions/catalogActions/locationCatalogActions';

interface IConnectedDispatch {
    setLocationFilter(props: IFilterLocationActionProps): void
    fetchLocationCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props: IModalActionsProps): void
    fetchLocationCatalog: (props: IFilterLocationActionProps) => void
}

interface IProps {
    history: History
}

interface IState extends IProps {
    locationCatalog: ILocationCatalog;
}

export type LocationCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState => ({
    locationCatalog: state.locationCatalogReducers.locationCatalog,
    history: props.history
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setLocationFilter: (props: IFilterLocationActionProps) => dispatch(LocationAction.setLocationFilter(props)),
    fetchLocationCatalogNextLink: (props: INextLinkActionProps) => dispatch(LocationAction.fetchLocationCatalogNextLink.request(props)),
    setModal: (props: IModalActionsProps) => dispatch(ModalActions.setModal(props)),
    fetchLocationCatalog: (props: IFilterLocationActionProps) => dispatch(LocationAction.fetchLocationCatalog.request(props)),
})

const LocationCatalog = (props: LocationCatalogProps) => (
    <div>
        <LocationCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(LocationCatalog);