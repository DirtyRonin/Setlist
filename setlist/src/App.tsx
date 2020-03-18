import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import { ISong, ISongCatalog, SongCatalogType, IBandCatalog, IBandSummary, ISetCatalog } from "./models";
import MainListComponent from "./components/mainList";
import BandListComponent from "./components/bandList";
import CreateSetlist from "./components/createSetlistForm";

import { RemoveSongFromSonglists } from "./service";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<IAppState>;
    ReadBandsSummaryAsync(): Promise<HashTable<IBandSummary>>;

    CreateSongAsync(song: ISong): Promise<ISong>;
    DeleteSongAsync(songId: string): Promise<ISong>;
    CreateBandAsync: (band: IBandCatalog) => Promise<IBandCatalog>;
    DeleteBandAsync(bandId: string): Promise<void>;
    AddSongsToBandAsync(bandId: string, songIds: string[]): Promise<void>;
    RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;

    AddSetlistToBandAsync: (setlist: ISetCatalog) => Promise<ISetCatalog>;
}

export interface IAppState {
    songLists: HashTable<ISongCatalog>;
    songListOrder: string[];
    availableBandlists: HashTable<IBandSummary>;
}

const AppContainer = styled.div`
    display: flex;
`;

const App = (props: IAppProps): JSX.Element => {
    const [songLists, setSongLists] = useState({} as HashTable<ISongCatalog>);
    const [songListOrder, setSongListOrder] = useState([] as string[]);
    const [availableBandlists, setAvailableBandlists] = useState({} as HashTable<IBandSummary>);

    const {
        CreateSongAsync,
        DeleteSongAsync,
        InitialStateRequest,
        ReadBandsSummaryAsync,
        CreateBandAsync,
        DeleteBandAsync,
        AddSongsToBandAsync,
        RemoveSongsFromBandAsync,
        AddSetlistToBandAsync
    } = props;

    useEffect(() => {
        InitialStateRequest().then(result => {
            setSongLists(result.songLists);
            setSongListOrder(result.songListOrder);
            setAvailableBandlists(result.availableBandlists)
        });
    }, []);

    // useEffect(() => {
    //     ReadBandsSummaryAsync().then(result => setAvailableBandlists(result));
    // });

    const AddSongToMainListState = (songListId: string, newSong: ISong) => {
        const currentSongList = songLists[songListId];
        const newSongs = Array.from(currentSongList.Songs);
        newSongs.push(newSong);

        const newSongList: ISongCatalog = {
            ...currentSongList,
            Songs: newSongs
        };

        const newSetlists: HashTable<ISongCatalog> = {
            ...songLists,
            [songListId]: newSongList
        };

        setSongLists(newSetlists);
    };

    const RemoveSongFromMainListState = (songListId: string, songId: string): void => {
        const newBandlists = RemoveSongFromSonglists({ ...songLists }, songId);

        const newStateSetlists = {
            ...newBandlists
        };

        setSongLists(newStateSetlists);
    };

    const AddBandToState = (bandlist: IBandCatalog): void => {
        if (!songLists[bandlist.Id]) {
            const newSongLists = {
                ...songLists,
                [bandlist.Id]: bandlist
            };

            setSongLists(newSongLists);

            AddToSonglistOrder(bandlist.Id);
        } else {
            console.log("Band Already Exists In State");
        }
    };

    const RemoveBandFromState = (bandId: string) => {
        if (songLists[bandId]) {
            RemoveFromSonglistOrder(bandId);

            const songListIds = Object.keys(songLists);
            const index = songListIds.indexOf(bandId);
            songListIds.splice(index, 1);

            const newSonglists: HashTable<ISongCatalog> = songListIds.reduce((prev: HashTable<any>, current: string) => {
                prev[current] = songLists[current];
                return prev;
            }, {} as HashTable<any>);

            setSongLists(newSonglists);
        } else {
            console.log("Band Is Not In State");
        }
    };

    const AddToSonglistOrder = (songlistId: string) => {
        const newSonglistOrder = Array.from(songListOrder);
        newSonglistOrder.push(songlistId);

        setSongListOrder(newSonglistOrder);
    };

    const RemoveFromSonglistOrder = (songlistId: string) => {
        const newSonglistOrder = Array.from(songListOrder);
        const index = newSonglistOrder.indexOf(songlistId);

        newSonglistOrder.splice(index, 1);

        setSongListOrder(newSonglistOrder);
    };

    const RemoveBandsongFromState = (bandId: string, songIds: string[]) => {
        const songlist = songLists[bandId];

        const newBandsongs = Array.from(songlist.Songs);

        songIds.forEach(songId => {
            const index = newBandsongs.findIndex(song => song.Id === songId);
            newBandsongs.splice(index, 1);
        });

        const newSonglist = {
            ...songlist,
            Songs: newBandsongs
        } as ISongCatalog;

        const newSonglistState = {
            ...songLists,
            [newSonglist.Id]: newSonglist
        };

        setSongLists(newSonglistState);
    };

    const AddSetlistToState = (setlist: ISetCatalog) => {
        if (!songLists[setlist.Id]) {
            const newSongLists = {
                ...songLists,
                [setlist.Id]: setlist
            };

            setSongLists(newSongLists);

            AddToSonglistOrder(setlist.Id);
        } else {
            console.log("Band Already Exists In State");
        }
    }

    const RemoveSetlistFromState = (setlistId: string) => {
        if (songLists[setlistId]) {
            RemoveFromSonglistOrder(setlistId);

            const songListIds = Object.keys(songLists);
            const index = songListIds.indexOf(setlistId);
            songListIds.splice(index, 1);

            const newSonglists: HashTable<ISongCatalog> = songListIds.reduce((prev: HashTable<any>, current: string) => {
                prev[current] = songLists[current];
                return prev;
            }, {} as HashTable<any>);

            setSongLists(newSonglists);
        } else {
            console.log("Setlist Is Not In State");
        }
    };

    const onDragEnd = (result: DropResult): void => {
        const { destination, source } = result;

        if (destination) {
            if (hasSonglistChanged(destination, source)) {
                const start = songLists[source.droppableId];
                const finish = songLists[destination.droppableId];

                if (finish.SonglistType === SongCatalogType.MainList) {
                    //nothing happens
                } else {
                    const newStartSongIds = Array.from(start.Songs);
                    const draggable = newStartSongIds[source.index];

                    if (start.SonglistType !== SongCatalogType.MainList) {
                        newStartSongIds.splice(source.index, 1);
                    }

                    const newFinishSongIds = Array.from(finish.Songs);

                    if (doesBandlistContainsSongId(finish, draggable.Id) === false) {
                        AddSongsToBandAsync(finish.Id, [draggable.Id.toString()]).then(result => {
                            newFinishSongIds.splice(destination.index, 0, draggable);

                            const newStartSonglist: ISongCatalog = {
                                ...start,
                                Songs: newStartSongIds
                            };

                            const newFinishSonglist: ISongCatalog = {
                                ...finish,
                                Songs: newFinishSongIds
                            };

                            const newStateSonglists: HashTable<ISongCatalog> = {
                                ...songLists,
                                [newStartSonglist.Id]: newStartSonglist,
                                [newFinishSonglist.Id]: newFinishSonglist
                            };

                            setSongLists(newStateSonglists);
                        });
                    }
                }
            } else if (hasPositionInSonglistChanged(destination, source)) {
                const songlist = songLists[source.droppableId];

                const newSongIds = Array.from(songlist.Songs);
                const draggable = newSongIds.splice(source.index, 1);
                newSongIds.splice(destination.index, 0, draggable[0]);

                const newSetlist: ISongCatalog = {
                    ...songlist,
                    Songs: newSongIds
                };

                const newStateSetlists: HashTable<ISongCatalog> = {
                    ...songLists,
                    [newSetlist.Id]: newSetlist
                };

                setSongLists(newStateSetlists);
            } else {
                // no change
            }
        }
    };

    const doesBandlistContainsSongId = (songlist: ISongCatalog, songId: string): boolean =>
        songlist.SonglistType === SongCatalogType.BandList && songlist.Songs.filter(song => song.Id === songId).length > 0;

    const hasSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlists = (): JSX.Element[] => {
        return songListOrder.map(songListId => {
            const songList = songLists[songListId];
            if (songList.SonglistType === SongCatalogType.MainList) {
                return (
                    <MainListComponent
                        CreateSongAsync={CreateSongAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromMainListState={RemoveSongFromMainListState}
                        AddSongToMainListState={AddSongToMainListState}
                        key={songList.Id}
                        songlist={songList as ISongCatalog}
                    />
                );
            } else if (songList.SonglistType === SongCatalogType.BandList) {
                return (
                    <BandListComponent
                        key={songList.Id}
                        songlist={songList as IBandCatalog}
                        RemoveSongsFromBandAsync={RemoveSongsFromBandAsync}
                        RemoveBandsongFromState={RemoveBandsongFromState}
                        DeleteBandAsync={DeleteBandAsync}
                        RemoveBandFromState={RemoveBandFromState}
                    />
                );
            } else {
                return (
                    <SetlistComponent
                        key={songList.Id}
                        setlist={songList as ISetCatalog}
                    />
                );
            }
        });
    };

    const IsBandListNeeded = () =>
        Object.values(songLists).filter(songList => songList.SonglistType === SongCatalogType.BandList).length === 0;

    return (
        <Container>
            <Row>
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
            </Row>
            <Row>
                <AppContainer data-testid="DragDropContext">
                    <DragDropContext onDragEnd={onDragEnd}>{renderSetlists()}</DragDropContext>
                </AppContainer>
            </Row>
        </Container>
    );
};

export default App;
