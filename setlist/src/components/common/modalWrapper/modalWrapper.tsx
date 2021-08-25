import React from "react"
import { connect } from 'react-redux'
import { History } from 'history';

import { IModelState, RootState } from 'store'
import PrivateRoute from "components/common/privateRoute"
import { bandSongModalActions, IBandEntityActionProps, IBandSongEntityActionProps, ISetlistEntityActionProps, ISongEntityActionProps, IUser, setlistModalActions, songModalActions } from "models"
import * as Action from 'store/actions';
import { bandModalActions } from "models/modals/modelBand";

const SongModalComponent = React.lazy(() => import("components/modals/songModal"))
const AddSongToBandComponent = React.lazy(() => import("components/modals/AddItemTo/band/AddSongToBand"))
const AddSongToSetlistModalComponent = React.lazy(() => import("components/modals/AddItemTo/setlist/AddSongToSetlistModal"))
const BandModalComponent = React.lazy(() => import("components/modals/bandModal"))
const BandSongCatalogComponent = React.lazy(() => import('store/containers/catalogs/BandSongCatalogContainer'))
const BandSongModalComponent = React.lazy(() => import('components/modals/bandSongModal'))
const ModalTemplate = React.lazy(() => import('components/common/modalWrapper/modalTemplate'))

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

        <PrivateRoute path="/bandModal">
            <BandModalComponent
                bandModalActionsProvider={bandModalActionsProvider}
                handleCloseModal={handleCloseModal}
                query={query}
            />
        </PrivateRoute>

        <PrivateRoute path="/bandSongAsModal">
            <ModalTemplate
                title={'My Title'}
                handleCloseModal={handleCloseModal}
            >
                <BandSongCatalogComponent
                    history={history}
                />
            </ModalTemplate>

        </PrivateRoute>
        <PrivateRoute path="/bandSongModal">
            <BandSongModalComponent
                query={query}
                bandSongModalActionsProvider={bandSongModalActionsProvider}
                handleCloseModal={handleCloseModal}
            />
        </PrivateRoute>
        {/* <PrivateRoute path="/setlistModal">
            <SetlistModalComponent
                 query={query}
                 bandSongModalActionsProvider={bandSongModalActionsProvider}
                 handleCloseModal={handleCloseModal}
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
        Edit: (props: ISetlistEntityActionProps) => { },
        Remove: (props: ISetlistEntityActionProps) => { },
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
