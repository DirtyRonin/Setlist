import React, { useEffect } from "react";
import { Router, Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import styled from "styled-components";

import { AppProps } from "store";
const BandCatalogContainer = React.lazy(() => import('store/containers/catalogs/BandCatalogContainer'))
const SongCatalogContainer = React.lazy(() => import('store/containers/catalogs/SongCatalogContainer'))
const SetlistCatalogContainer = React.lazy(() => import('store/containers/catalogs/SetlistCatalogContainer'))
const LocationCatalogContainer = React.lazy(() => import('store/containers/catalogs/LocationCatalogContainer'))
const CustomEventCatalogContainer = React.lazy(() => import('store/containers/catalogs/CustomEventCatalogContainer'))
const BandSongCatalogComponent = React.lazy(() => import('store/containers/catalogs/BandSongCatalogContainer'))
const ModalWrapper = React.lazy(() => import('components/common/modalWrapper/modalWrapper'))

import '@szhsin/react-menu/dist/index.css';


import Loader from "components/common/loader"
import PrivateRoute from "components/common/privateRoute"

const Login = React.lazy(() => import('components/login'))
const Sidebar = React.lazy(() => import('components/common/sidebar'))

const Wrapper = styled.div`
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
`



export const App = (props: AppProps): JSX.Element => {

    const {
        location,
        history,
        userState,
        modalState: { showModal },

        getUser,
    } = props;

    useEffect(() => {
        getUser(userState.name)
    }, []);

    //only set Switch.location when you want to render a background
    //otherwise pass undefined to render main component

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
                    <Switch location={location.state?.background}>
                        <PrivateRoute exact path='/'>
                        </PrivateRoute>
                        <PrivateRoute path='/songs'>
                            <SongCatalogContainer
                                history={history} />
                        </PrivateRoute>
                        <PrivateRoute path='/bands'>
                            <BandCatalogContainer
                                history={history} />
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
                        <PrivateRoute path="/bandSongAsCatalog">
                            <BandSongCatalogComponent
                                history={history}
                            />
                        </PrivateRoute>
                        <PrivateRoute path='/settings'>
                        </PrivateRoute>
                    </Switch>
                    {showModal && <Switch>
                        <ModalWrapper history={history} />
                    </Switch>}
                </Wrapper>
            </Router>
            {/* <GlobalStyle /> */}
        </React.Suspense>
    </ConnectedRouter >
    )
};