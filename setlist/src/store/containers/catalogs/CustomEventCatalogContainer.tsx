import * as React from 'react';
import { connect } from "react-redux";
import { History } from "history";

import { RootState } from 'store';

import CustomEventCatalogComponent from 'components/catalogs/customEventCatalog';
import { IFilterCustomEventActionProps, ICustomEventCatalog, IModalActionsProps, INextLinkActionProps } from 'models';

import ModalActions from 'store/actions/modalActions';
import * as CustomEventAction from 'store/actions/catalogActions/customEventCatalogActions';

interface IConnectedDispatch {
    fetchCustomEventCatalog: (props: IFilterCustomEventActionProps) => void
    fetchCustomEventCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props: IModalActionsProps): void
    setCustomEventFilter(props: IFilterCustomEventActionProps): void
}

export interface IProps {
    history: History
}

interface IState extends IProps {
    customEventCatalog: ICustomEventCatalog;
}

export type CustomEventCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState => ({
    customEventCatalog: state.customEventCatalogReducers.customEventCatalog,
    history: props.history
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchCustomEventCatalog: (props: IFilterCustomEventActionProps) => dispatch(CustomEventAction.fetchCustomEventCatalog.request(props)),
    fetchCustomEventCatalogNextLink: (props: INextLinkActionProps) => dispatch(CustomEventAction.fetchCustomEventCatalogNextLink.request(props)),
    setCustomEventFilter: (props: IFilterCustomEventActionProps) => dispatch(CustomEventAction.setCustomEventFilter(props)),
    setModal: (props: IModalActionsProps) => dispatch(ModalActions.setModal(props))
})

const CustomEventCatalog = (props: CustomEventCatalogProps) => (
    <div>
        <CustomEventCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(CustomEventCatalog);