import React, { useEffect } from "react";
import { Router, Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Loader from "components/common/loader"
import PrivateRoute from "components/common/privateRoute"
import { ContentWrapper, Wrapper } from "styles";
import { AppProps } from "store";

import '@szhsin/react-menu/dist/index.css';
import DashBoard from "./pages/dashboard";

const BandCatalogContainer = React.lazy(() => import('store/containers/catalogs/BandCatalogContainer'))
const SongCatalogContainer = React.lazy(() => import('store/containers/catalogs/SongCatalogContainer'))
const SetlistCatalogContainer = React.lazy(() => import('store/containers/catalogs/SetlistCatalogContainer'))
const LocationCatalogContainer = React.lazy(() => import('store/containers/catalogs/LocationCatalogContainer'))
const CustomEventCatalogContainer = React.lazy(() => import('store/containers/catalogs/CustomEventCatalogContainer'))
const BandSongCatalogComponent = React.lazy(() => import('store/containers/catalogs/BandSongCatalogContainer'))
const SetlistSongCatalog = React.lazy(() => import('store/containers/catalogs/SetlistSongCatalogContainer'))

const ModalWrapper = React.lazy(() => import('components/common/Wrapper/modalWrapper'))
const Login = React.lazy(() => import('components/login'))
const Sidebar = React.lazy(() => import('components/common/sidebar'))


import MenuAppBar from "components/appBar/appBar";


export const App = (props: AppProps): JSX.Element => {

    const {
        location,
        history,
        userState,
        isLoggedIn,
        modalState: { showModal },
    } = props;

    //only set Switch.location when you want to render a background
    //otherwise pass undefined to render main component

    // i used a second switch for the modals
    //this can come in handy if i need to use a path in both switches

    return (<ConnectedRouter history={history} >
        <React.Suspense fallback={<Loader />}>
            <Router history={history}>
                <MenuAppBar history={history} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Sidebar
                        user={userState}
                        isLoggedIn={isLoggedIn} />
                    <Wrapper >
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Switch location={location.state?.background}>
                            <PrivateRoute exact path='/'>
                                <ContentWrapper>
                                    <CustomEventCatalogContainer
                                        history={history}
                                    />
                                </ContentWrapper>
                            </PrivateRoute>
                            <PrivateRoute exact path='/customEvent_SetlistSongAsCatalog'>
                                <ContentWrapper>
                                    <SetlistSongCatalog
                                        history={history}
                                    />
                                </ContentWrapper>
                            </PrivateRoute>
                            <PrivateRoute path="/setlistSongAsCatalog">
                                <ContentWrapper>
                                    <SetlistCatalogContainer
                                        history={history}
                                    />
                                    <SetlistSongCatalog
                                        history={history}
                                    />
                                </ContentWrapper>
                            </PrivateRoute>

                            {userState.isAdmin && <>
                                <PrivateRoute path='/setlist'>
                                    <ContentWrapper>
                                        <SetlistCatalogContainer
                                            history={history}
                                        />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path='/songs'>
                                    <ContentWrapper>
                                        <SongCatalogContainer
                                            history={history} />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path='/bands'>
                                    <ContentWrapper>
                                        <BandCatalogContainer
                                            history={history} />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path='/location'>
                                    <ContentWrapper>
                                        <LocationCatalogContainer
                                            history={history}
                                        />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path='/dashboard'>
                                    <ContentWrapper>
                                        <DashBoard />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path="/bandSongAsCatalog">
                                    <ContentWrapper>
                                        <BandCatalogContainer
                                            history={history} />
                                        <BandSongCatalogComponent
                                            history={history}
                                        />
                                    </ContentWrapper>
                                </PrivateRoute>
                                <PrivateRoute path='/settings'>
                                    <ContentWrapper>
                                    </ContentWrapper>
                                </PrivateRoute>
                            </>}
                        </Switch>
                        {showModal && <Switch>
                            <ModalWrapper history={history} />
                        </Switch>}

                    </Wrapper>
                </div>
            </Router>

        </React.Suspense>
    </ConnectedRouter >
    )
};