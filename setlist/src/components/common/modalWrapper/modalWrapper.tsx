import React from "react"
import { connect } from 'react-redux'
import { History } from 'history';

import { IModelState, RootState } from 'store'
import PrivateRoute from "components/common/privateRoute"
import { SongModalComponent } from "components/modals/songModal";
import { bandSongModalActions, defaultModal, IBandEntityActionProps, IBandSongEntityActionProps, IModalBandSong, IModalSetlist, IModalSong, ISetlistEntityActionProps, ISongEntityActionProps, IUser, setlistModalActions, songModalActions } from "models"
import * as Action from 'store/actions';
import { bandModalActions, IModalBand } from "models/modals/modelBand";
import { BandModalComponent } from "components/modals/bandModal";
import { BandSongModalComponent } from "components/modals/bandSongModal";
import { SetlistModalComponent } from "components/modals/setlistModal";
import AddSongToBandComponent from "components/modals/AddItemTo/band/AddSongToBand";
import AddSongToSetlistModalComponent from "components/modals/AddItemTo/setlist/AddSongToSetlistModal";

const ModalWrapper = (props: ModalWrapperProps) => {
    const {
        modalState,
        history,
        userState,

        songModalActionsProvider,
        bandModalActionsProvider,
        bandSongModalActionsProvider,
        setlistModalActionsProvider
    } = props

    const query = history.location.search ?? ''

    const handleCloseModal = () => history.goBack()

   

    return <div>
        <PrivateRoute path="/songModal">
            <SongModalComponent
                songModalActionsProvider={songModalActionsProvider}
                handleCloseModal={handleCloseModal}
                query={query}
            />
        </PrivateRoute>
        <PrivateRoute path="/AddSongToBand">
            <AddSongToBandComponent
                userId={userState.id}
                routeQuery={query}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        
        <PrivateRoute path="/AddSongToSetlist">
            <AddSongToSetlistModalComponent
                 routeQuery={query}
                 handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>

        {/* <PrivateRoute path="/bandModal">
            <BandModalComponent
                modal={modal as IModalBand}
                executeBandModalAction={bandModalActionsProvider[modal.type]}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/bandSongModal">
            <BandSongModalComponent
                modal={modal as IModalBandSong}
                executeBandSongModalAction={bandSongModalActionsProvider[modal.type]}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/SetlistModal">
            <SetlistModalComponent
                modal={modal as IModalSetlist}
                executeSetlistModalAction={setlistModalActionsProvider[modal.type]}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/AddSongToBandModal">
            < AddSongToBandComponent
                song={(modal as IModalSong).value}
                userId={userState.id}
            />
        </PrivateRoute> */}
    </div>

}

interface IConnectedDispatch {
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
    bandSongModalActionsProvider: bandSongModalActions
    setlistModalActionsProvider: setlistModalActions
}

interface IProps {
    history: History
}

interface IStateProps extends IProps {
    modalState: IModelState;
    userState: IUser
}

export type ModalWrapperProps = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps =>
({
    modalState: state.modalReducers.modalState,
    history: props.history,
    userState: state.userReducers.user
})


const mapDispatchToProps = (dispatch: React.Dispatch<any>): IConnectedDispatch => ({
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
        New: (props: IBandEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
        Edit: (props: IBandEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
        Remove: (props: IBandEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
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
    }
})

const DefaultWrapper = (props: ModalWrapperProps) =>
    ModalWrapper(props)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultWrapper)
