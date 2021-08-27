import React from "react"
import { connect } from 'react-redux'
import { History } from 'history';

import { IModelState, RootState } from 'store'
import PrivateRoute from "components/common/privateRoute"
import {bandModalActions, bandSongModalActions, IBandEntityActionProps, IBandSongEntityActionProps, ILocationEntityActionProps, ISetlistEntityActionProps, ISetlistSongEntityActionProps, ISongEntityActionProps, IUser, locationModalActions, setlistModalActions, setlistSongModalActions, songModalActions } from "models"
import * as Action from 'store/actions';

const SongModalComponent = React.lazy(() => import("components/modals/songModal"))
const AddSongToBandComponent = React.lazy(() => import("components/modals/AddItemTo/band/AddSongToBand"))
const AddSongToSetlistModalComponent = React.lazy(() => import("components/modals/AddItemTo/setlist/AddSongToSetlistModal"))
const BandModalComponent = React.lazy(() => import("components/modals/bandModal"))
const BandSongModalComponent = React.lazy(() => import('components/modals/bandSongModal'))
const SetlistModalComponent = React.lazy(() => import('components/modals/setlistModal'))
const SetlistSongModalComponent = React.lazy(() => import('components/modals/setlistSongModal'))
const LocationModalComponent = React.lazy(() => import('components/modals/locationModal'))

// const ModalTemplate = React.lazy(() => import('components/common/modalWrapper/modalTemplate'))

const ModalWrapper = ({
    modalState,
    history,
    userState,
    songModalActionsProvider,
    bandModalActionsProvider,
    bandSongModalActionsProvider,
    setlistModalActionsProvider,
    setlistSongModalActionsProvider,
    locationModalActionsProvider
}: ModalWrapperProps) => {

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

        <PrivateRoute path="/bandModal">
            <BandModalComponent
                bandModalActionsProvider={bandModalActionsProvider}
                handleCloseModal={handleCloseModal}
                query={query}
            />
        </PrivateRoute>

        {/* die variante als modal bleibt erstmal drinne, falls es dafür nochmal ne verwendung geben sollte (25.08.2021) */}
        {/* <PrivateRoute path="/bandSongAsModal">
            <ModalTemplate
                title={'My Title'}
                handleCloseModal={handleCloseModal}
            >
                <BandSongCatalogComponent
                    history={history}
                />
            </ModalTemplate>

        </PrivateRoute> */}
        <PrivateRoute path="/bandSongModal">
            <BandSongModalComponent
                query={query}
                bandSongModalActionsProvider={bandSongModalActionsProvider}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/setlistModal">
            <SetlistModalComponent
                query={query}
                setlistModalActionsProvider={setlistModalActionsProvider}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/setlistSongModal">
            <SetlistSongModalComponent
                query={query}
                setlistSongModalActionsProvider={setlistSongModalActionsProvider}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        <PrivateRoute path="/locationModal">
            <LocationModalComponent
                query={query}
                locationModalActionsProvider={locationModalActionsProvider}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
    </div>

}



interface IConnectedDispatch {
    songModalActionsProvider: songModalActions
    bandModalActionsProvider: bandModalActions
    bandSongModalActionsProvider: bandSongModalActions
    setlistModalActionsProvider: setlistModalActions
    setlistSongModalActionsProvider: setlistSongModalActions
    locationModalActionsProvider: locationModalActions
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
        Read: () => { },
        ShowCatalog: () => { }
    },
    bandModalActionsProvider: {
        None: () => { },
        New: (props: IBandEntityActionProps) => dispatch(Action.addBandToCatalog.request(props)),
        Edit: (props: IBandEntityActionProps) => dispatch(Action.editBandInCatalog.request(props)),
        Remove: (props: IBandEntityActionProps) => dispatch(Action.deleteBandInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    bandSongModalActionsProvider: {
        None: () => { },
        New: (props: IBandSongEntityActionProps) => dispatch(Action.addBandSongToCatalog.request(props)),
        Edit: (props: IBandSongEntityActionProps) => dispatch(Action.editBandSongInCatalog.request(props)),
        Remove: (props: IBandSongEntityActionProps) => dispatch(Action.deleteBandSongInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    setlistModalActionsProvider: {
        None: () => { },
        New: (props: ISetlistEntityActionProps) => dispatch(Action.addSetListToCatalog.request(props)),
        Edit: (props: ISetlistEntityActionProps) => dispatch(Action.editSetListInCatalog.request(props)),
        Remove: (props: ISetlistEntityActionProps) => dispatch(Action.deleteSetListInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    setlistSongModalActionsProvider: {
        None: () => { },
        New: (props: ISetlistSongEntityActionProps) => dispatch(Action.addSetlistSongToCatalog.request(props)),
        Edit: (props: ISetlistSongEntityActionProps) => dispatch(Action.editSetlistSongInCatalog.request(props)),
        Remove: (props: ISetlistSongEntityActionProps) => dispatch(Action.deleteSetlistSongInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    locationModalActionsProvider: {
        None: () => { },
        New: (props: ILocationEntityActionProps) => dispatch(Action.addLocationToCatalog.request(props)),
        Edit: (props: ILocationEntityActionProps) => dispatch(Action.editLocationInCatalog.request(props)),
        Remove: (props: ILocationEntityActionProps) => dispatch(Action.deleteLocationInCatalog.request(props)),
        Read: () => { },
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
