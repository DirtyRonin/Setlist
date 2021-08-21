
import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';

import { RootState, ICatalogState } from '../reducers';
import { App } from '../../App';
import * as Action from '../actions';
import { songModalActions, IEntityActionProps, bandSongModalActions, ISongEntityActionProps, IUser, setlistModalActions, ISetlistEntityActionProps, IBandSongEntityActionProps } from '../../models';
import { bandModalActions } from '../../models/modals/modelBand';

import {IModelState} from "store/reducers/modalReducers"


interface IAppConnectedDispatch {

    popCatalogsOrder(): void
    getUser(props: string): void


    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
    bandSongModalActionsProvider: bandSongModalActions
    setlistModalActionsProvider: setlistModalActions

}
interface IProps {
    history: History
}

interface IStateProps extends IProps {
    catalogState: ICatalogState;
    userState: IUser;
    modalState: IModelState
}



export type AppProps = IStateProps & IAppConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps => {
    return ({
        catalogState: state.catalogReducers.catalogState,
        userState: state.userReducers.user,
        // i need modalstate here so the whole component will be updated - otherwise, only the modal withou the background will be rendered
        modalState:state.modalReducers.modalState,
        history: props.history
    } as IStateProps)
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IAppConnectedDispatch => {
    return {

        popCatalogsOrder: () => dispatch(Action.popComponentOrder.request()),

        songModalActionsProvider: {
            None: () => { },
            New: (props: ISongEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
            Edit: (props: ISongEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
            Remove: (props: ISongEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
            Add: () => { },
            Read: () => dispatch(Action.readSongInCatalog()),
            ShowCatalog: () => { }
        },
        bandModalActionsProvider: {
            None: () => { },
            New: (props: IEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
            Edit: (props: IEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
            Remove: (props: IEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
            Read: () => dispatch(Action.readBandInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },
        bandSongModalActionsProvider: {
            None: () => { },
            New: () => { } /*dispatch(Action.addBandSongToCatalog.request(props))*/,
            Edit: (props: IBandSongEntityActionProps) => dispatch(Action.addBandSongToCatalog.request(props)),
            Remove: (props: IBandSongEntityActionProps) => { },
            Read: () => dispatch(Action.readBandSongInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },
        setlistModalActionsProvider: {
            None: () => { },
            New: (props: ISetlistEntityActionProps) => dispatch(Action.addSetListToCatalog.request(props)),
            Edit: (props: ISetlistEntityActionProps) => { },
            Remove: (props: ISetlistEntityActionProps) => { },
            Read: () => dispatch(Action.readSetlistInCatalog()),
            Add: () => { },
            ShowCatalog: () => { }
        },

        getUser: (props: string) => dispatch(Action.getUser.request(props)),
    };
};



const DefaultApp = (props: AppProps) => (
    <div>
        <App {...props} />
    </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(DefaultApp);