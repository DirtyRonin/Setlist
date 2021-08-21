import React, { useEffect } from "react";
import { Router, Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import styled from "styled-components";
import { CatalogTypes, IModalSong, IModalBandSong, DisplayIn, Catalog, IModal, ModalTypes, IComponentOrder, IBand, ISong, IBandSongCatalog, IModalSetlist, IBandSong } from "models";


import { SongModalComponent } from "./components/modals/songModal";
import { IModalBand } from "models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";
import { BandSongModalComponent } from "./components/modals/bandSongModal";
import { CatalogModalComponent } from "./components/modals/catalogModal";
import { SetlistModalComponent } from "./components/modals/setlistModal";

import { AppProps } from "store";
import BandCatalogContainer from "./store/containers/catalogs/BandCatalogContainer"
import SongCatalogContainer from "./store/containers/catalogs/SongCatalogContainer"
import BandSongCatalogContainer from "./store/containers/catalogs/BandSongCatalogContainer";
import SetlistCatalogContainer from "./store/containers/catalogs/SetlistCatalogContainer";
import SetlistSongCatalogContainer from "./store/containers/catalogs/SetlistSongCatalogContainer";
import LocationCatalogContainer from "./store/containers/catalogs/LocationCatalogContainer";
import CustomEventCatalogContainer from "./store/containers/catalogs/CustomEventCatalogContainer";

import '@szhsin/react-menu/dist/index.css';


import Loader from "components/common/loader"
import PrivateRoute from "components/common/privateRoute"
import Sidebar from 'components/common/sidebar'
import AddSongToBand from "./components/modals/AddItemTo/band/AddSongToBand";
import AddSongToSetlistModal from "./components/modals/AddItemTo/setlist/AddSongToSetlistModal";
import AddBandSongToSetlistModal from "./components/modals/AddItemTo/setlist/AddBandSongToSetlistModal";

import { Location } from "history"
import ModalWrapper from "components/common/modalWrapper/modalWrapper";

const Login = React.lazy(() => import('components/login'))

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`



export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState: { componentsOrder },

        songModalActionsProvider,
        bandModalActionsProvider,
        bandSongModalActionsProvider,
        setlistModalActionsProvider,
        history,

        popCatalogsOrder,

        userState,
        getUser,


    } = props;

    useEffect(() => {
        getUser(userState.name)
    }, []);

    //only set Switch.location when you want to render a background
    //otherwise pass undefined to render main component

    let background: Location | undefined = history.location.state?.background

    // i used a second switch for the modals
    //this can come in handy if i need to use a path in both switches

    return (<ConnectedRouter history={history} >
        <React.Suspense fallback={<Loader />}>
            <Router history={history}>
                <Route path='/login'>
                    <Login />
                </Route>
                <Wrapper>
                    <Sidebar />
                    <Switch location={background}>
                        <PrivateRoute exact path='/'>
                        </PrivateRoute>
                        <PrivateRoute path='/songs'>
                            <SongCatalogContainer
                                history={history} />
                        </PrivateRoute>
                        <PrivateRoute path='/bands'>
                            <BandCatalogContainer />
                        </PrivateRoute>
                        <PrivateRoute path='/setlist'>
                            <SetlistCatalogContainer />
                        </PrivateRoute>
                        <PrivateRoute path='/location'>
                            <LocationCatalogContainer />
                        </PrivateRoute>
                        <PrivateRoute path='/customevent'>
                            <CustomEventCatalogContainer />
                        </PrivateRoute>
                        <PrivateRoute path='/settings'>
                        </PrivateRoute>
                    </Switch>
                    <Switch>
                        <ModalWrapper history={history} />
                    </Switch>
                </Wrapper>
            </Router>
            {/* <GlobalStyle /> */}
        </React.Suspense>
    </ConnectedRouter >
    )
};