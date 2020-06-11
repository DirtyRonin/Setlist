import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import styled from "styled-components";
import { ISongCatalog, CatalogType, IBandCatalog } from "./models";
import SongCatalogComponent from "./components/songCatalog";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import BandCatalogComponent from "./components/bandCatalog";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;

export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState,
        songModalActionsProvider,
        fetchBandCatalog,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        createEmptySongCatalog,
        createEmptyBandCatalog,
        setCatalogState,
        setSongModal
    } = props;



    useEffect(() => {
        const newState = createEmptySongCatalog(catalogState);
        const allState = createEmptyBandCatalog(newState);
        setCatalogState(allState)
    }, []);

    const onDragEnd = (result: DropResult): void => {
    };
  


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
                        setSongModal={setSongModal}
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
                        key={catalog.Id}
                        bandlist={catalog as IBandCatalog}
                        showModal={catalogState.modal.show}
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
            <SongModalComponent
                modal={catalogState.modal}
                setSongModal={setSongModal}
                executeSongModalAction={songModalActionsProvider[catalogState.modal.type]}
            />
        </div>
    );
};


