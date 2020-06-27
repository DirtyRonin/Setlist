import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import styled from "styled-components";
import { ISongCatalog, CatalogType, IBandCatalog, IModal, ISong, IModalSong } from "./models";
import SongCatalogComponent from "./components/songCatalog";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import BandCatalogComponent from "./components/bandCatalog";
import { IModalBand } from "./models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;

export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState,
        songModalActionsProvider,
        bandModalActionsProvider,
        fetchBandCatalog,
        fetchSongCatalog,

        fetchSongCatalogNextLink,
        fetchBandCatalogNextLink,

        createEmptySongCatalog,
        createEmptyBandCatalog,
        newBandSongCatalog,

        setCatalogState,
        setModal,
        showBandSongsCatalog,
    } = props;

    useEffect(() => {
        const newState = createEmptySongCatalog(catalogState);
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

        return catalogState.catalogsOrder.map(songListId => {
            const catalog = catalogState.catalogs[songListId];
            if (catalog.CatalogType === CatalogType.Song) {
                return (
                    <SongCatalogComponent
                        fetchSongCatalog={fetchSongCatalog}
                        fetchSongCatalogNextLink={fetchSongCatalogNextLink}
                        setSongModal={setModal}
                        key={catalog.Id}
                        songlist={catalog as ISongCatalog}
                        showModal={catalogState.modal.show}
                    />
                );
            }
            if (catalog.CatalogType === CatalogType.Band) {
                return (
                    <BandCatalogComponent
                        fetchBandCatalog={fetchBandCatalog}
                        fetchCatalogNextLink = {fetchBandCatalogNextLink}
                        key={catalog.Id}
                        bandlist={catalog as IBandCatalog}
                        showModal={catalogState.modal.show}
                        showBandSongsCatalog = {showBandSongsCatalog}
                        setModal={setModal}
                    />
                );
            }
            return (<div></div>)
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
            {catalogState.modal.catalogType === CatalogType.Song &&  <SongModalComponent
                modal={catalogState.modal as IModalSong}
                setSongModal={setModal}
                executeSongModalAction={songModalActionsProvider[catalogState.modal.type]}
            />}
            {catalogState.modal.catalogType === CatalogType.Band &&  <BandModalComponent
                modal={catalogState.modal as IModalBand}
                setModal={setModal}
                executeBandModalAction={bandModalActionsProvider[catalogState.modal.type]}
            />}
           
        </div>
    );
};


