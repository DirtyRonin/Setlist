import React from "react"
import { connect } from 'react-redux'
import { History } from 'history';

import { IModelState, RootState } from 'store'
import PrivateRoute from "components/common/privateRoute"
import { bandModalActions, bandSongModalActions, customEventModalActions, IBandEntityActionProps, IBandSongEntityActionProps, ICustomEventEntityActionProps, IFilterCustomEventActionProps, ILocationCatalog, ILocationEntityActionProps, ISetlistEntityActionProps, ISetlistSongEntityActionProps, ISnackbarActionProps, ISongEntityActionProps, IUser, locationModalActions, setlistModalActions, setlistSongModalActions, songModalActions } from "models"
import * as Action from 'store/actions';
import AddBandSongToSetlistModal from "components/modals/AddItemTo/setlist/AddBandSongToSetlistModal";
import { IUserInfo } from "store/auth/types";

const AddSongToBandComponent = React.lazy(() => import("components/modals/AddItemTo/band/AddSongToBand"))
const AddSongToSetlistModalComponent = React.lazy(() => import("components/modals/AddItemTo/setlist/AddSongToSetlistModal"))
const SetlistSongModalComponent = React.lazy(() => import('components/modals/setlistSongModal'))
const AddBandSongFromSongsComponent = React.lazy(() => import("components/modals/AddItemTo/band/AddBandSongFromSongs"))
const AddSetlistSongFromSongsComponent = React.lazy(() => import("components/modals/AddItemTo/setlist/AddSetlistSongFromSongs"))

const SongModalTemplate = React.lazy(() => import("components/modals/songModalTemplate"))
const BandSongModalTemplate = React.lazy(() => import('components/modals/bandSongModalTemplate'))
const LocationModalTemplate = React.lazy(() => import('components/modals/locationModalTemplate'))
const CustomEventModalTemplate = React.lazy(() => import('components/modals/customEventModalTemplate'))
const BandModalTemplate = React.lazy(() => import('components/modals/BandModalTemplate'))
const SetlistModalTemplate = React.lazy(() => import('components/modals/setlistModalTemplate'))
const SetlistEditorModal = React.lazy(() => import('components/setlistEditor'))

const SetlistSongCatalog = React.lazy(() => import('store/containers/catalogs/SetlistSongCatalogContainer'))

const ModalTemplate = React.lazy(() => import('components/common/Wrapper/modalTemplate'))

const ModalWrapper = ({
    modalState,
    history,
    userState,
    songModalActionsProvider,
    bandModalActionsProvider,
    bandSongModalActionsProvider,
    setlistModalActionsProvider,
    setlistSongModalActionsProvider,
    locationModalActionsProvider,
    customEventModalActionsProvider,
    pushToSnackbar
}: ModalWrapperProps) => {

    const query = history.location.search ?? ''
    const handleClose = () => history.goBack()

    return <div>
        <PrivateRoute path="/songModal">
            <ModalTemplate handleCloseModal={handleClose} title='Song'>
                <SongModalTemplate
                    songModalActionsProvider={songModalActionsProvider}
                    handleClose={handleClose}
                    query={query}
                    user={userState}
                    pushToSnackbar={pushToSnackbar}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/AddSongToBand">
            <ModalTemplate handleCloseModal={handleClose} title='Add to Setlist'>
                <AddSongToBandComponent
                    handleClose={handleClose}
                    pushToSnackbar={pushToSnackbar}
                    history={history}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/AddSongToSetlist">
            <ModalTemplate handleCloseModal={handleClose} title='Add to Setlist'>
                <AddSongToSetlistModalComponent
                    pushToSnackbar={pushToSnackbar}
                    handleClose={handleClose}
                    history={history}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/bandModal">
            <ModalTemplate handleCloseModal={handleClose} title='Band'>
                <BandModalTemplate
                    bandModalActionsProvider={bandModalActionsProvider}
                    handleClose={handleClose}
                    query={query}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/bandSongModal">
            <ModalTemplate handleCloseModal={handleClose} title='Band Song'>
                <BandSongModalTemplate
                    query={query}
                    bandSongModalActionsProvider={bandSongModalActionsProvider}
                    handleClose={handleClose}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/AddBandSongToSetlist">
            <ModalTemplate handleCloseModal={handleClose} title='Add Band Song to Setlist'>
                <AddBandSongToSetlistModal
                    pushToSnackbar={pushToSnackbar}
                    handleClose={handleClose}
                    history={history}
                />
            </ModalTemplate>
        </PrivateRoute>
        <PrivateRoute path="/AddSetlistSongFromSongs">
            <ModalTemplate handleCloseModal={handleClose} title='Add Songs to Setlist'>
                <AddSetlistSongFromSongsComponent
                    pushToSnackbar={pushToSnackbar}
                    handleClose={handleClose}
                    history={history}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/AddBandSongFromSongs">
            <ModalTemplate handleCloseModal={handleClose} title='Add Band Song from Songs'>
                <AddBandSongFromSongsComponent
                    pushToSnackbar={pushToSnackbar}
                    handleClose={handleClose}
                    history={history}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/setlistModal">
            <ModalTemplate handleCloseModal={handleClose} title='Setlist'>
                <SetlistModalTemplate
                    query={query}
                    setlistModalActionsProvider={setlistModalActionsProvider}
                    handleClose={handleClose}

                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/setlistSongModal">
            <ModalTemplate handleCloseModal={handleClose} title='Setlist Songs'>
                <SetlistSongModalComponent
                    query={query}
                    setlistSongModalActionsProvider={setlistSongModalActionsProvider}
                    handleClose={handleClose}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/locationModal">
            <ModalTemplate handleCloseModal={handleClose} title='Location'>
                <LocationModalTemplate
                    locationModalActionsProvider={locationModalActionsProvider}
                    handleClose={handleClose}
                    query={query}
                />
            </ModalTemplate>
        </PrivateRoute>

        <PrivateRoute path="/customEventModal">
            <ModalTemplate handleCloseModal={handleClose} title='Custom Event'>
                <CustomEventModalTemplate
                    customEventModalActionsProvider={customEventModalActionsProvider}
                    handleClose={handleClose}
                    query={query}
                    user={userState}
                    pushToSnackbar={pushToSnackbar}
                />
            </ModalTemplate>
        </PrivateRoute>
        <PrivateRoute path="/setlistEditorModal">
            <ModalTemplate handleCloseModal={handleClose} title='Setlist Editor'>
                <SetlistEditorModal
                    // customEventModalActionsProvider={customEventModalActionsProvider}
                    handleClose={handleClose}
                    query={query}
                    pushToSnackbar={pushToSnackbar}
                />
            </ModalTemplate>
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
    customEventModalActionsProvider: customEventModalActions
    pushToSnackbar: (props: ISnackbarActionProps) => void
}

interface IProps {
    history: History
}

interface IStateProps extends IProps {
    modalState: IModelState;
    userState: IUserInfo
    locationCatalog: ILocationCatalog
}

export type ModalWrapperProps = IStateProps & IConnectedDispatch;

const mapStateToProps = (state: RootState, props: IProps): IStateProps =>
({
    modalState: state.modalReducers.modalState,
    history: props.history,
    userState: { name: state.auth.name, isAdmin: state.auth.isAdmin },
    locationCatalog: state.locationCatalogReducers.locationCatalog
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
        New: (props: ISetlistEntityActionProps) => dispatch(Action.addSetlistToCatalog.request(props)),
        Edit: (props: ISetlistEntityActionProps) => dispatch(Action.editSetlistInCatalog.request(props)),
        Remove: (props: ISetlistEntityActionProps) => dispatch(Action.deleteSetlistInCatalog.request(props)),
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
    },
    customEventModalActionsProvider: {
        None: () => { },
        New: (props: ICustomEventEntityActionProps) => dispatch(Action.addCustomEventToCatalog.request(props)),
        Edit: (props: ICustomEventEntityActionProps) => dispatch(Action.editCustomEventInCatalog.request(props)),
        Remove: (props: ICustomEventEntityActionProps) => dispatch(Action.deleteCustomEventInCatalog.request(props)),
        Read: () => { },
        Add: () => { },
        ShowCatalog: () => { }
    },
    pushToSnackbar: (props: ISnackbarActionProps) => dispatch(Action.pushToSnackbar(props))
})

const DefaultWrapper = (props: ModalWrapperProps) =>
    ModalWrapper(props)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultWrapper)
