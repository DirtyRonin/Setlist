import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext } from "react-beautiful-dnd";

import styled from "styled-components";
import { CatalogTypes, IModalSong, IModalBandSong, DisplayIn, Catalog, IModal, ModalTypes, IComponentOrder, IBand, ISong, ICatalog, IBandSongCatalog, IModalSetlist } from "./models";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import { IModalBand } from "./models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";

import { BandSongModalComponent } from "./components/modals/bandSongModal";
import MenuTopComponent from "./components/layout/menuTop";
import BandCatalogContainer from "./store/containers/catalogs/BandCatalogContainer"
import SongCatalogContainer from "./store/containers/catalogs/SongCatalogContainer"
import { CatalogModalComponent } from "./components/modals/catalogModal";
import BandSongCatalogContainer from "./store/containers/catalogs/BandSongCatalogContainer";
import { GUID_EMPTY } from "./Util";
import SetlistCatalogContainer from "./store/containers/catalogs/SetlistCatalogContainer";
import { SetlistModalComponent } from "./components/modals/setlistModal";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;



export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState: { modal, componentsOrder },

        songModalActionsProvider,
        bandModalActionsProvider,
        bandSongModalActionsProvider,
        setlistModalActionsProvider,

        fetchBandSongCatalog,
        fetchBandSongCatalogNextLink,

        closeSongsCatalog,
        openSongsCatalog,

        openBandsCatalog,
        closeBandsCatalog,

        openSetlistCatalog,
        closeSetlistCatalog,

        popCatalogsOrder,
        setModal,

        userState,
        getUser
    } = props;

    useEffect(() => {
        getUser(userState.name)
    }, []);

    const onDragEnd = (): void => { };

    // const IsBandCatalogContainer = (value: any): value is IOwnBandCatalogProps => true

    const IsModal = (value: IModal | Catalog): value is IModal =>
        (value as IModal).catalogInModal !== undefined



    const GetComponent = (value: IModal | Catalog): JSX.Element => {

        if (IsModal(value)) {
            if (value.catalogInModal === CatalogTypes["Song Catalog"]) {
                return <SongCatalogContainer />
            }
            else if (value.catalogInModal === CatalogTypes["Band Catalog"]) {
                return <BandCatalogContainer selectedNode={value.value as ISong} />
            }
            // else if (value.catalogInModal === CatalogTypes["BandSong Catalog"]) {
            //     const bandId = ""
            //     return <BandSongCatalogContainer selectedNode={undefined} bandId={bandId} />
            // }
            else if (value.catalogInModal === CatalogTypes["Setlist Catalog"]) {
                return <SetlistCatalogContainer />
            }
            return <div></div>

        }

        if (!IsModal(value)) {
            if (value.CatalogType === CatalogTypes["Song Catalog"]) {
                return <SongCatalogContainer />
            }
            else if (value.CatalogType === CatalogTypes["Band Catalog"]) {
                return <BandCatalogContainer selectedNode={undefined} />
            }
            else if (value.CatalogType === CatalogTypes["BandSong Catalog"]) {
                const bandId = (value as IBandSongCatalog).BandId
                return <BandSongCatalogContainer selectedNode={undefined}  />
            }
            else if (value.CatalogType === CatalogTypes["Setlist Catalog"]) {
                return <SetlistCatalogContainer />
            }

            return <div></div>

        }



        return <div></div>

    }

    const findLatestComponentOrder = (displayType: DisplayIn): IComponentOrder | undefined =>
        componentsOrder && componentsOrder.length > 0 ?
            componentsOrder.filter(order => order.displayIn === displayType).slice(-1)[0] :
            undefined

    const renderComponents = (): JSX.Element[] => {
        const components: JSX.Element[] = []

        /* open and close catalogs */
        const newestCatalogComponent = findLatestComponentOrder(DisplayIn.Main)
        if (newestCatalogComponent) {
            const catalog = newestCatalogComponent.value as Catalog
            components.push(GetComponent(catalog));

            // if (catalog.CatalogType === CatalogTypes["Song Catalog"]) {
            //     components.push(GetComponent(catalog.CatalogType));
            // }
            // else if (catalog.CatalogType === CatalogTypes["Band Catalog"]) {
            //     components.push(GetComponent({ ownNodeProps: undefined }));
            // }
            // else if (catalog.CatalogType === CatalogTypes["BandSong Catalog"]) {
            //     components.push(
            //         <BandSongCatalogComponent
            //             fetchBandSongCatalog={fetchBandSongCatalog}
            //             fetchBandSongCatalogNextLink={fetchBandSongCatalogNextLink}
            //             key={catalog.Id}
            //             showModal={modal.show}
            //             bandSongCatalog={catalog as IBandSongCatalog}
            //             setModal={setModal}
            //         />
            //     )
            // }
        }

        /* open and close modals */
        if (components.length === 1) {
            const newestModalComponent = findLatestComponentOrder(DisplayIn.Modal)
            if (newestModalComponent) {
                const modal = newestModalComponent.value as IModal

                // if a catalog should be opened in a modal
                if (modal.catalogInModal !== CatalogTypes["None"]) {
                    components.push(
                        <CatalogModalComponent
                            catalog={GetComponent(modal)}
                            modal={modal}
                            popCatalogsOrder={popCatalogsOrder}
                        />
                    )
                }
                // edit, remove or read a node from a catalog

                else if (modal.catalogType === CatalogTypes["Song Catalog"]) {
                    components.push(<SongModalComponent
                        modal={modal as IModalSong}
                        popCatalogsOrder={popCatalogsOrder}
                        executeSongModalAction={songModalActionsProvider[modal.type]}
                    />)
                }

                else if (modal.catalogType === CatalogTypes["Band Catalog"]) {
                    components.push(<BandModalComponent
                        modal={modal as IModalBand}
                        popCatalogsOrder={popCatalogsOrder}
                        executeBandModalAction={bandModalActionsProvider[modal.type]}
                    />)
                }
                else if (modal.catalogType === CatalogTypes["BandSong Catalog"]) {
                    components.push(<BandSongModalComponent
                        modal={modal as IModalBandSong}
                        popCatalogsOrder={popCatalogsOrder}
                        executeBandSongModalAction={bandSongModalActionsProvider[modal.type]}
                    />)
                }
                else if (modal.catalogType === CatalogTypes["Setlist Catalog"]) {
                    components.push(<SetlistModalComponent
                        modal={modal as IModalSetlist}
                        popCatalogsOrder={popCatalogsOrder}
                        executeSetlistModalAction={setlistModalActionsProvider[modal.type]}
                    />)
                }

            }


        }
        return components
    }

    return (
        <div>
            <Container fluid>
                <MenuTopComponent
                    componentsOrder={componentsOrder}

                    openSongsCatalog={openSongsCatalog}
                    closeSongsCatalog={closeSongsCatalog}

                    openBandsCatalog={openBandsCatalog}
                    closeBandsCatalog={closeBandsCatalog}

                    openSetlistCatalog={openSetlistCatalog}
                    closeSetlistCatalog={closeSetlistCatalog}


                />
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <AppContainer data-testid="DragDropContext">
                            <DragDropContext onDragEnd={onDragEnd}>{renderComponents()}</DragDropContext>
                        </AppContainer>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>




        </div>
    );
};