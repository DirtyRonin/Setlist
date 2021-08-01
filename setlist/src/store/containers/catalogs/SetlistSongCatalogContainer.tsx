import * as React from 'react';
import { connect } from "react-redux";
import { RootState } from '../..';
import SetlistSongCatalogComponent from '../../../components/catalogs/setlistSongCatalog';

import { IComponentOrderActionProps, IFilterSetlistSongActionProps, ISetlistSongCatalog } from '../../../models';

import * as Common from '../../actions/commonActions';
import * as SetlistSongAction from '../../actions/catalogActions/setlistSongCatalogActions';

interface IConnectedDispatch {
    setSetlistSongFilter:(props : IFilterSetlistSongActionProps) => void
    fetchSetlistSongCatalog: (props: IFilterSetlistSongActionProps) => void
    // fetchSetlistCatalogNextLink: (props: INextLinkActionProps) => void
    pushCatalogsOrder: (props: IComponentOrderActionProps) => void
}

interface IState {
    setlistSongCatalog: ISetlistSongCatalog;
    showModal: boolean;
}

export type SetlistSongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState): IState =>
({
     setlistSongCatalog: state.setlistSongCatalogReducers.setlistSongCatalog,
    showModal: state.catalogReducers.catalogState.modal.show
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    fetchSetlistSongCatalog:(props: IFilterSetlistSongActionProps) => dispatch(SetlistSongAction.fetchSetlistSongCatalog.request(props)),
    setSetlistSongFilter: (props: IFilterSetlistSongActionProps) => dispatch(SetlistSongAction.setSetlistSongFilter(props)),
    pushCatalogsOrder: (props: IComponentOrderActionProps) => dispatch(Common.pushComponentOrder.request(props)),
})

const SetlistSongCatalog = (props: SetlistSongCatalogProps) => (
    <div>
        <SetlistSongCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(SetlistSongCatalog);