import * as React from 'react';
import { connect } from "react-redux";
import { History } from "history";

import { RootState } from 'store';
import SetlistSongCatalogComponent from 'components/catalogs/setlistSongCatalog';

import { IFilterSetlistSongActionProps, IModalActionsProps, INextLinkActionProps, ISetlistSongCatalog } from 'models';

import ModalActions from 'store/actions/modalActions';
import * as SetlistSongAction from 'store/actions/catalogActions/setlistSongCatalogActions';

interface IConnectedDispatch {
    setSetlistSongFilter: (props: IFilterSetlistSongActionProps) => void
    fetchSetlistSongCatalog: (props: IFilterSetlistSongActionProps) => void
    fetchSetlistSongCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props: IModalActionsProps): void
}

export interface IProps {
    history: History
}
interface IState extends IProps {
    setlistSongCatalog: ISetlistSongCatalog;
}

export type SetlistSongCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState,props : IProps): IState =>
({
    setlistSongCatalog: state.setlistSongCatalogReducers.setlistSongCatalog,
    history:props.history
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setSetlistSongFilter: (props: IFilterSetlistSongActionProps) => dispatch(SetlistSongAction.setSetlistSongFilter(props)),
    fetchSetlistSongCatalog: (props: IFilterSetlistSongActionProps) => dispatch(SetlistSongAction.fetchSetlistSongCatalog.request(props)),
    fetchSetlistSongCatalogNextLink: (props: INextLinkActionProps) => dispatch(SetlistSongAction.fetchSetlistSongCatalogNextLink.request(props)),
    setModal:(props:IModalActionsProps) => dispatch(ModalActions.setModal(props))
    
})

const SetlistSongCatalog = (props: SetlistSongCatalogProps) => (
    <div>
        <SetlistSongCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(SetlistSongCatalog);