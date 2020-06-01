import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Form, Button, FormControlProps } from "react-bootstrap";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { HashTable } from "./Util/HashTable";
import { ISong, ISongCatalog, CatalogType, IBandCatalog, IBandSummary, ISetCatalog, IFilterSongActionProps, ISongActionProps, IModal, defaultModal, ModalTypes } from "./models";
import SongCatalogComponent from "./components/songCatalog";
import BandListComponent from "./components/bandList";
import CreateSetlist from "./components/createSetlistForm";

import { RemoveSongFromSonglists } from "./service";

import { AppProps, addSongToCatalog } from "./store";
import { FilterSongActionProps, Song } from "./mapping";
import { CreateSongNodeHtmlAttributesConfiguration } from "./Configuration";
import { SongModalComponent } from "./components/modals/songModal";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;

export const App = (props: AppProps): JSX.Element => {
    // const [songLists, setSongLists] = useState({} as HashTable<ISongCatalog>);
    // const [songListOrder, setSongListOrder] = useState([] as string[]);
    // const [availableBandlists, setAvailableBandlists] = useState({} as HashTable<IBandSummary>);

    const {
        catalogState,
        // setCatalogState: initialState,
        songModalActionsProvider,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        createEmptySongCatalog,
        setCatalogState,
        setSongModal
        // DeleteSongAsync,
        // InitialStateRequest,
        // ReadBandsSummaryAsync,
        // CreateBandAsync,
        // DeleteBandAsync,
        // AddSongsToBandAsync,
        // RemoveSongsFromBandAsync,
        // AddSetlistToBandAsync
    } = props;

    const songDef = CreateSongNodeHtmlAttributesConfiguration;


    useEffect(() => {

        const newState = createEmptySongCatalog();
        setCatalogState(newState)

        // initialState()

        // InitialStateRequest().then(result => {
        //     setSongLists(result.songLists);
        //     setSongListOrder(result.songListOrder);
        //     setAvailableBandlists(result.availableBandlists)
        // });
    }, []);

    // useEffect(() => {
    //     ReadBandsSummaryAsync().then(result => setAvailableBandlists(result));
    // });

    // const AddSongToMainListState = (songListId: string, newSong: ISong) => {
    //     const currentSongList = songLists[songListId];
    //     const newSongs = Array.from(currentSongList.Songs);
    //     newSongs.push(newSong);

    //     const newSongList: ISongCatalog = {
    //         ...currentSongList,
    //         Songs: newSongs
    //     };

    //     const newSetlists: HashTable<ISongCatalog> = {
    //         ...songLists,
    //         [songListId]: newSongList
    //     };

    //     setSongLists(newSetlists);
    // };

    // const RemoveSongFromMainListState = (songListId: string, songId: string): void => {
    //     const newBandlists = RemoveSongFromSonglists({ ...songLists }, songId);

    //     const newStateSetlists = {
    //         ...newBandlists
    //     };

    //     setSongLists(newStateSetlists);
    // };

    // const AddBandToState = (bandlist: IBandCatalog): void => {
    //     if (!songLists[bandlist.Id]) {
    //         const newSongLists = {
    //             ...songLists,
    //             [bandlist.Id]: bandlist
    //         };

    //         setSongLists(newSongLists);

    //         AddToSonglistOrder(bandlist.Id);
    //     } else {
    //         console.log("Band Already Exists In State");
    //     }
    // };

    // const RemoveBandFromState = (bandId: string) => {
    //     if (songLists[bandId]) {
    //         RemoveFromSonglistOrder(bandId);

    //         const songListIds = Object.keys(songLists);
    //         const index = songListIds.indexOf(bandId);
    //         songListIds.splice(index, 1);

    //         const newSonglists: HashTable<ISongCatalog> = songListIds.reduce((prev: HashTable<any>, current: string) => {
    //             prev[current] = songLists[current];
    //             return prev;
    //         }, {} as HashTable<any>);

    //         setSongLists(newSonglists);
    //     } else {
    //         console.log("Band Is Not In State");
    //     }
    // };

    // const AddToSonglistOrder = (songlistId: string) => {
    //     const newSonglistOrder = Array.from(songListOrder);
    //     newSonglistOrder.push(songlistId);

    //     setSongListOrder(newSonglistOrder);
    // };

    // const RemoveFromSonglistOrder = (songlistId: string) => {
    //     const newSonglistOrder = Array.from(songListOrder);
    //     const index = newSonglistOrder.indexOf(songlistId);

    //     newSonglistOrder.splice(index, 1);

    //     setSongListOrder(newSonglistOrder);
    // };

    // const RemoveBandsongFromState = (bandId: string, songIds: string[]) => {
    //     const songlist = songLists[bandId];

    //     const newBandsongs = Array.from(songlist.Songs);

    //     songIds.forEach(songId => {
    //         const index = newBandsongs.findIndex(song => song.Id === songId);
    //         newBandsongs.splice(index, 1);
    //     });

    //     const newSonglist = {
    //         ...songlist,
    //         Songs: newBandsongs
    //     } as ISongCatalog;

    //     const newSonglistState = {
    //         ...songLists,
    //         [newSonglist.Id]: newSonglist
    //     };

    //     setSongLists(newSonglistState);
    // };

    // const AddSetlistToState = (setlist: ISetCatalog) => {
    //     if (!songLists[setlist.Id]) {
    //         const newSongLists = {
    //             ...songLists,
    //             [setlist.Id]: setlist
    //         };

    //         setSongLists(newSongLists);

    //         AddToSonglistOrder(setlist.Id);
    //     } else {
    //         console.log("Band Already Exists In State");
    //     }
    // }

    // const RemoveSetlistFromState = (setlistId: string) => {
    //     if (songLists[setlistId]) {
    //         RemoveFromSonglistOrder(setlistId);

    //         const songListIds = Object.keys(songLists);
    //         const index = songListIds.indexOf(setlistId);
    //         songListIds.splice(index, 1);

    //         const newSonglists: HashTable<ISongCatalog> = songListIds.reduce((prev: HashTable<any>, current: string) => {
    //             prev[current] = songLists[current];
    //             return prev;
    //         }, {} as HashTable<any>);

    //         setSongLists(newSonglists);
    //     } else {
    //         console.log("Setlist Is Not In State");
    //     }
    // };

    const onDragEnd = (result: DropResult): void => {
        const { destination, source } = result;

        if (destination) {
            // if (hasSonglistChanged(destination, source)) {
            //     const start = songLists[source.droppableId];
            //     const finish = songLists[destination.droppableId];

            //     if (finish.SonglistType === SongCatalogType.MainList) {
            //         //nothing happens
            //     } else {
            //         const newStartSongIds = Array.from(start.Songs);
            //         const draggable = newStartSongIds[source.index];

            //         if (start.SonglistType !== SongCatalogType.MainList) {
            //             newStartSongIds.splice(source.index, 1);
            //         }

            //         const newFinishSongIds = Array.from(finish.Songs);

            //         if (doesBandlistContainsSongId(finish, draggable.Id) === false) {
            //             // AddSongsToBandAsync(finish.Id, [draggable.Id.toString()]).then(result => {
            //             //     newFinishSongIds.splice(destination.index, 0, draggable);

            //             //     const newStartSonglist: ISongCatalog = {
            //             //         ...start,
            //             //         Songs: newStartSongIds
            //             //     };

            //             //     const newFinishSonglist: ISongCatalog = {
            //             //         ...finish,
            //             //         Songs: newFinishSongIds
            //             //     };

            //             //     const newStateSonglists: HashTable<ISongCatalog> = {
            //             //         ...songLists,
            //             //         [newStartSonglist.Id]: newStartSonglist,
            //             //         [newFinishSonglist.Id]: newFinishSonglist
            //             //     };

            //             //     setSongLists(newStateSonglists);
            //             // });
            //         }
            //     }
            // } else if (hasPositionInSonglistChanged(destination, source)) {
            //     const songlist = songLists[source.droppableId];

            //     const newSongIds = Array.from(songlist.Songs);
            //     const draggable = newSongIds.splice(source.index, 1);
            //     newSongIds.splice(destination.index, 0, draggable[0]);

            //     const newSetlist: ISongCatalog = {
            //         ...songlist,
            //         Songs: newSongIds
            //     };

            //     const newStateSetlists: HashTable<ISongCatalog> = {
            //         ...songLists,
            //         [newSetlist.Id]: newSetlist
            //     };

            //     setSongLists(newStateSetlists);
            // } else {
            //     // no change
            // }
        }
    };

    // const doesBandlistContainsSongId = (songlist: ISongCatalog, songId: string): boolean =>
    //     songlist.CatalogType === CatalogType.Band && songlist.Values.filter(song => song.Id === songId).length > 0;

    const hasSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlists = (): JSX.Element[] => {
        if (!catalogState) {
            return [] as JSX.Element[]
        }

        return catalogState.catalogsOrder.map(songListId => {
            const songList = catalogState.catalogs[songListId];
            if (songList.CatalogType === CatalogType.Song) {
                return (
                    <SongCatalogComponent
                        fetchSongCatalog={fetchSongCatalog}
                        fetchSongCatalogNextLink={fetchSongCatalogNextLink}
                        setSongModal={setSongModal}
                        // DeleteSongAsync={DeleteSongAsync}
                        // RemoveSongFromMainListState={RemoveSongFromMainListState}
                        // AddSongToMainListState={AddSongToMainListState}
                        key={songList.Id}
                        songlist={songList as ISongCatalog}
                        showModal={catalogState.modal.show}
                    />
                );
            }
            // else if (songList.SonglistType === SongCatalogType.BandList) {
            //     return (
            //         <BandListComponent
            //             key={songList.Id}
            //             songlist={songList as IBandCatalog}
            //             RemoveSongsFromBandAsync={RemoveSongsFromBandAsync}
            //             RemoveBandsongFromState={RemoveBandsongFromState}
            //             DeleteBandAsync={DeleteBandAsync}
            //             RemoveBandFromState={RemoveBandFromState}
            //         />
            //     );
            // } else {
            //     return (
            //         <SetlistComponent
            //             key={songList.Id}
            //             setlist={songList as ISetCatalog}
            //         />
            //     );
            // }
            return (<div></div>)
        });
    };

    const handleCloseModal = () => {
        setSongModal(defaultModal);
    }

    const IsBandListNeeded = () =>
        Object.values(catalogState!.catalogs).filter(songList => songList.CatalogType === CatalogType.Band).length === 0;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song = {
            ...Song.EmptySong(),
            Artist: elements[songDef.Artist.ControlId].value,
            Title: elements[songDef.Title.ControlId].value,
            Genre: elements[songDef.Genre.ControlId].value
        } as ISong

        if (catalogState.modal.catalogId) {
            songModalActionsProvider[catalogState.modal.type](
                { song, songCatalogId: catalogState.modal.catalogId } as ISongActionProps
            )
        }

    };

    return (
        <div>
            <Container fluid>
                {/* <Row>
                <Col md="8">
                    <CreateSetlist
                        IsBandListNeeded={IsBandListNeeded()}
                        BandsSummary={availableBandlists}
                        CreateBandAsync={CreateBandAsync}
                        AddBandToState={AddBandToState}
                        AddSetlistToBandAsync={AddSetlistToBandAsync}
                        AddSetlistToState={AddSetlistToState}
                    />
                </Col>
                <Col md="2" />
                <Col md="2" />
            </Row> */}
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

            {/* <Modal show={catalogState.modal.show} onHide={handleCloseModal}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Song</Modal.Title>
                    </Modal.Header>


                    <Form onSubmit={hanldeOnAddSongClick} method="GET">
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                                    <Form.Label>{songDef.Title.Label}</Form.Label>
                                    <Form.Control type="text" value={catalogState.modal.song.Title} placeholder={songDef.Title.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                                    <Form.Label>{songDef.Artist.Label}</Form.Label>
                                    <Form.Control type="text" value={catalogState.modal.song.Artist} placeholder={songDef.Artist.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Genre.ControlId}>
                                    <Form.Label>{songDef.Genre.Label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Genre.Placeholder}></Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button variant="primary" type="submit" >Add Song to Main List</Button>
                        </Modal.Footer>
                    </Form>



                </Modal.Dialog>
            </Modal> */}
        </div>
    );
};


