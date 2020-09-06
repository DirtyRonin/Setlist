import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import styled from "styled-components";
import { ISongCatalog, CatalogType, IBandCatalog, IModal, ISong, IModalSong, IBandSongCatalog, IModalBandSong, ModalTypes } from "./models";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import BandCatalogComponent from "./components/catalogs/bandCatalog";
import { IModalBand } from "./models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";

import { BandSongModalComponent } from "./components/modals/bandSongModal";
import SongCatalogComponent from "./components/catalogs/songCatalog";
import BandSongCatalogComponent from "./components/catalogs/bandSongCatalog";
import MenuTopComponent from "./components/layout/menuTop";
import { AddToCatalogModalComponent } from "./components/modals/addToCatalogModal";
import BandCatalogContainer from "./store/containers/catalogs/BandCatalogContainer"
import SongCatalogContainer from "./store/containers/catalogs/SongCatalogContainer"

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;

export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState,
        catalogState: { modal, catalogs, componentsOrder: catalogsOrder },

        songModalActionsProvider,
        bandModalActionsProvider,
        bandSongModalActionsProvider,

        fetchBandSongCatalog,
        fetchBandCatalog,
        fetchSongCatalog,

        fetchSongCatalogNextLink,
        fetchBandCatalogNextLink,
        fetchBandSongCatalogNextLink,

        closeSongsCatalog,
        openSongsCatalog,

        openBandSongsCatalog,
        closeBandSongsCatalog,

        openBandsCatalog,
        closeBandsCatalog,

        setCatalogState,
        setModal,



    } = props;

    // const {catalogs,catalogsOrder,modal} = catalogState

    useEffect(() => {
        //drop down band

        // const newState = createEmptySongCatalog({...catalogState});
        // const allState = createEmptyBandCatalog(newState);
        // setCatalogState(allState)
    }, []);

    const onDragEnd = (result: DropResult): void => {
    };

    // const CurrentBandSongIds :string[] = Object.values(catalogState.catalogs).filter(
    //     catalog => catalog.CatalogType === CatalogType.BandSong 
    // ).map(bandSongCatalog => bandSongCatalog.Id)

    const renderSetlists = (): JSX.Element => {
        if (!catalogsOrder || catalogsOrder.length == 0 ) {
            return <div></div>
        }

        const catalog = catalogs[catalogsOrder.slice(-1)[0]];
        if (catalog.CatalogType === CatalogType.Song) {
            return (
                <SongCatalogContainer />
                //     fetchSongCatalog={fetchSongCatalog}
                //     fetchSongCatalogNextLink={fetchSongCatalogNextLink}
                //     setModal={setModal}
                //     key={catalog.Id}
                //     songlist={catalog as ISongCatalog}
                //     showModal={modal.show}
                // />
            );
        }
        else if (catalog.CatalogType === CatalogType.Band) {
            return (
                <BandCatalogContainer />
            );
        }
        else if (catalog.CatalogType === CatalogType.BandSong) {
            return (
                <BandSongCatalogComponent
                    fetchBandSongCatalog={fetchBandSongCatalog}
                    fetchBandSongCatalogNextLink={fetchBandSongCatalogNextLink}
                    key={catalog.Id}
                    showModal={modal.show}
                    bandSongCatalog={catalog as IBandSongCatalog}
                    setModal={setModal}
                />
            )
        }

        else {
            return (<div></div>)
        }


    };

    return (
        <div>
            <Container fluid>
                <MenuTopComponent
                    catalogsOrder={catalogsOrder}
                    openSongsCatalog={openSongsCatalog}
                    closeSongsCatalog={closeSongsCatalog}
                    openBandsCatalog={openBandsCatalog}
                    closeBandsCatalog={closeBandsCatalog}
                />
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <AppContainer data-testid="DragDropContext">
                            <DragDropContext onDragEnd={onDragEnd}>{renderSetlists()}</DragDropContext>
                        </AppContainer>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>

            {/* {modal.type === ModalTypes.Add && <AddToCatalogModalComponent
                BandCatalogComponent={newFunction(fetchBandCatalog, fetchBandCatalogNextLink, catalog, modal, catalogsOrder, openBandSongsCatalog, closeBandSongsCatalog, setModal)}
                modal={modal as IModalSong}
                setModal={setModal}
                executeSongModalAction={songModalActionsProvider[modal.type]}
            />} */}

            {modal.catalogType === CatalogType.Song && <SongModalComponent
                modal={modal as IModalSong}
                setModal={setModal}
                executeSongModalAction={songModalActionsProvider[modal.type]}
            />}
            {modal.catalogType === CatalogType.Band && <BandModalComponent
                modal={modal as IModalBand}
                setModal={setModal}
                executeBandModalAction={bandModalActionsProvider[modal.type]}
            />}
            {modal.catalogType === CatalogType.BandSong && <BandSongModalComponent
                modal={modal as IModalBandSong}
                setModal={setModal}
                executeBandSongModalAction={bandSongModalActionsProvider[modal.type]}
            />}
        </div>
    );
};


// function newFunction(fetchBandCatalog: (props: import("c:/Projects/Setlist/setlist/src/models/index").IFilterBandActionProps) => void, fetchBandCatalogNextLink: (props: import("c:/Projects/Setlist/setlist/src/models/index").INextLinkActionProps) => void, catalog: import("c:/Projects/Setlist/setlist/src/models/index").Catalog, modal: IModal, catalogsOrder: string[], openBandSongsCatalog: (props: import("c:/Projects/Setlist/setlist/src/models/index").IStatusBandSongCatalogActionProps) => void, closeBandSongsCatalog: (props: import("c:/Projects/Setlist/setlist/src/models/index").IStatusBandSongCatalogActionProps) => void, setModal: (props: IModal) => void): JSX.Element {
//     return <BandCatalogComponent
//         fetchBandCatalog={fetchBandCatalog}
//         fetchCatalogNextLink={fetchBandCatalogNextLink}
//         key={catalog.Id}
//         bandlist={catalog as IBandCatalog}
//         showModal={modal.show}
//         openedCatalogs={catalogsOrder}
//         openBandSongsCatalog={openBandSongsCatalog}
//         closeBandSongsCatalog={closeBandSongsCatalog}
//         setModal={setModal} />;
// }

