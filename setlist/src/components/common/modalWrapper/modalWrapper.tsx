import React from "react"
import { connect } from 'react-redux'
import { History } from 'history';

import { IModelState, RootState } from 'store'
import PrivateRoute from "components/common/privateRoute"
import { SongModalComponent } from "components/modals/songModal";
import { defaultModal, IModalSong, ISongEntityActionProps, songModalActions } from "models"
import * as Action from 'store/actions';

const ModalWrapper = (props: ModalWrapperProps) => {
    const {
        modalState,
        history,
        songModalActionsProvider
    } = props

    const path = history.location.pathname
    const modal = modalState.modals.get(path) ?? defaultModal

    return <PrivateRoute path="/modal">
            <SongModalComponent
                modal={(modalState.modals.get(path) ?? defaultModal) as IModalSong}
                executeSongModalAction={songModalActionsProvider[modal.type]}
                history={history}
            />
    </PrivateRoute>

}

interface IConnectedDispatch {
    songModalActionsProvider: songModalActions
}

interface IProps {
    history: History
}

interface IStateProps extends IProps {
    modalState: IModelState;

}

export type ModalWrapperProps = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps => {
    return ({
        modalState: state.modalReducers.modalState,
        history: props.history
    }) as IStateProps
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
    songModalActionsProvider: {
        None: () => { },
        New: (props: ISongEntityActionProps) => dispatch(Action.addSongToCatalog.request(props)),
        Edit: (props: ISongEntityActionProps) => dispatch(Action.editSongInCatalog.request(props)),
        Remove: (props: ISongEntityActionProps) => dispatch(Action.deleteSongInCatalog.request(props)),
        Add: () => { },
        Read: () => dispatch(Action.readSongInCatalog()),
        ShowCatalog: () => { }
    }
})

const DefaultWrapper = (props: ModalWrapperProps) =>
    ModalWrapper(props)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultWrapper)
