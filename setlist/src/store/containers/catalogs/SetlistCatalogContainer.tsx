import * as React from 'react';
import { connect } from "react-redux";
import SetlistCatalogComponent from '../../../components/catalogs/setlistCatalog';

import { RootState } from '../../reducers';
import { IComponentOrderActionProps, IFilterSetlistActionProps, INextLinkActionProps, ISetlistCatalog } from '../../../models';

import * as Common from '../../actions/commonActions';
import * as SetlistAction from '../../actions/catalogActions/setlistCatalogActions';

interface IConnectedDispatch {
    setSetlistFilter:(props: IFilterSetlistActionProps) => void
    fetchSetlistCatalog: (props: IFilterSetlistActionProps) => void
    fetchSetlistCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder: (props: IComponentOrderActionProps) => void,
}

interface IState {
    setlistCatalog: ISetlistCatalog;
    showModal: boolean;
}

export type SetlistCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState): IState =>
({
    setlistCatalog: state.setlistCatalogReducers.setlistCatalog,
    showModal: state.catalogReducers.catalogState.modal.show
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setSetlistFilter: (props: IFilterSetlistActionProps) => dispatch(SetlistAction.setSetlistFilter(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
    fetchSetlistCatalog:(props: IFilterSetlistActionProps) => dispatch(SetlistAction.fetchSetlistCatalog.request(props)),
    fetchSetlistCatalogNextLink:(props : INextLinkActionProps) => dispatch(SetlistAction.fetchSetlistCatalogNextLink.request(props)),
})

const SetlistCatalog = (props: SetlistCatalogProps) => (
    <div>
        <SetlistCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(SetlistCatalog);