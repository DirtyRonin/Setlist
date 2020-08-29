import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import styled from "styled-components";
import { ISongCatalog, CatalogType, IBandCatalog, IModal, ISong, IModalSong, IBandSongCatalog } from "./models";
import SongCatalogComponent from "./components/songCatalog";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import BandCatalogComponent from "./components/bandCatalog";
import { IModalBand } from "./models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";
import BandSongCatalogComponent from "./components/bandSongCatalog";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;

export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState,
        catalogState:{modal,catalogs,catalogsOrder},
        songModalActionsProvider,
        bandModalActionsProvider,

        fetchBandSongCatalog,
        fetchBandCatalog,
        fetchSongCatalog,

        fetchSongCatalogNextLink,
        fetchBandCatalogNextLink,
        fetchBandSongCatalogNextLink,

        createEmptySongCatalog,
        createEmptyBandCatalog,

        openBandSongsCatalog: showBandSongsCatalog,
        closeBandSongsCatalog,

        setCatalogState,
        setModal,
    } = props;

    // const {catalogs,catalogsOrder,modal} = catalogState

    useEffect(() => {
        const newState = createEmptySongCatalog({...catalogState});
        const allState = createEmptyBandCatalog(newState);
        setCatalogState(allState)
    }, []);

    const onDragEnd = (result: DropResult): void => {
    };
  
    // const CurrentBandSongIds :string[] = Object.values(catalogState.catalogs).filter(
    //     catalog => catalog.CatalogType === CatalogType.BandSong 
    // ).map(bandSongCatalog => bandSongCatalog.Id)

    const renderSetlists = (): JSX.Element[] => {
        if (!catalogState) {
            return [] as JSX.Element[]
        }

        

        return catalogsOrder.map(songListId => {
            const catalog = catalogs[songListId];
            if (catalog.CatalogType === CatalogType.Song) {
                return (
                    <SongCatalogComponent
                        fetchSongCatalog={fetchSongCatalog}
                        fetchSongCatalogNextLink={fetchSongCatalogNextLink}
                        setSongModal={setModal}
                        key={catalog.Id}
                        songlist={catalog as ISongCatalog}
                        showModal={modal.show}
                    />
                );
            }
            else if (catalog.CatalogType === CatalogType.Band) {
                return (
                    <BandCatalogComponent
                        fetchBandCatalog={fetchBandCatalog}
                        fetchCatalogNextLink = {fetchBandCatalogNextLink}
                        key={catalog.Id}
                        bandlist={catalog as IBandCatalog}
                        showModal={modal.show}
                        openedCatalogs = { catalogsOrder  }
                        showBandSongsCatalog = {showBandSongsCatalog}
                        closeBandSongsCatalog = {closeBandSongsCatalog}
                        setModal={setModal}
                    />
                );
            }else if (catalog.CatalogType === CatalogType.BandSong){
                return (
                    <BandSongCatalogComponent 
                        fetchBandSongCatalog = {fetchBandSongCatalog}
                        fetchBandSongCatalogNextLink = {fetchBandSongCatalogNextLink}
                        key = {catalog.Id}
                        showModal={modal.show}
                        bandSongCatalog = {catalog as IBandSongCatalog}
                        setModal={setModal}
                    />
                )
            }
            
            else{
                return (<div></div>)
            }
            
        });
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <AppContainer data-testid="DragDropContext">
                        <DragDropContext onDragEnd={onDragEnd}>{renderSetlists()}</DragDropContext>
                    </AppContainer>
                </Row>
                <Row>
                    <Col >

                    </Col>
                </Row>
            </Container>
            {modal.catalogType === CatalogType.Song &&  <SongModalComponent
                modal={modal as IModalSong}
                setSongModal={setModal}
                executeSongModalAction={songModalActionsProvider[modal.type]}
            />}
            {modal.catalogType === CatalogType.Band &&  <BandModalComponent
                modal={modal as IModalBand}
                setModal={setModal}
                executeBandModalAction={bandModalActionsProvider[modal.type]}
            />}
           
        </div>
    );
};


