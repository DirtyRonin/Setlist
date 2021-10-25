import * as React from 'react';
import { connect } from "react-redux";
import { History } from 'history';

import { RootState } from 'store/reducers';

import SetlistCatalogComponent from 'components/catalogs/setlistCatalog';

import { IFilterSetlistActionProps, IModalActionsProps, INextLinkActionProps, ISetlistCatalog } from 'models';

import * as SetlistAction from 'store/actions/catalogActions/setlistCatalogActions';
import { setSetlistIdForSetlistSong } from 'store/actions/catalogActions/setlistSongCatalogActions';
import ModalActions from 'store/actions/modalActions';

interface IConnectedDispatch {
    setSetlistFilter:(props: IFilterSetlistActionProps) => void
    fetchSetlistCatalog: (props: IFilterSetlistActionProps) => void
    fetchSetlistCatalogNextLink: (props: INextLinkActionProps) => void
    setModal(props:IModalActionsProps):void
    setSetlistIdForSetlistSong:(props:number) => void
}

interface IProps {
    history: History
}

interface IState extends IProps {
    setlistCatalog: ISetlistCatalog;
}

export type SetlistCatalogProps = IConnectedDispatch & IState

const mapStateToProps = (state: RootState, props: IProps): IState =>
({
    setlistCatalog: state.setlistCatalogReducers.setlistCatalog,
    history:props.history
});

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    setSetlistFilter: (props: IFilterSetlistActionProps) => dispatch(SetlistAction.setSetlistFilter(props)),
    fetchSetlistCatalog:(props: IFilterSetlistActionProps) => dispatch(SetlistAction.fetchSetlistCatalog.request(props)),
    fetchSetlistCatalogNextLink:(props : INextLinkActionProps) => dispatch(SetlistAction.fetchSetlistCatalogNextLink.request(props)),
    setModal:(props:IModalActionsProps) => dispatch(ModalActions.setModal(props)),
    setSetlistIdForSetlistSong:(props:number) => dispatch(setSetlistIdForSetlistSong(props))
})

const SetlistCatalog = (props: SetlistCatalogProps) => (
    <div>
        <SetlistCatalogComponent {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(SetlistCatalog);