import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import { ISong, ISonglist, SonglistType, IBandlist, IBandSummary, ISet, IMainlist } from "./models";
import MainListComponent from "./components/mainList";
import BandListComponent from "./components/bandList";
import CreateSetlist from "./components/createSetlistForm";

import { RemoveSongFromSonglists } from "./service";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<IAppState>;
    ReadBandsSummaryAsync(): Promise<HashTable<IBandSummary>>;

    CreateSongAsync(song: ISong): Promise<ISong>;
    DeleteSongAsync(songId: string): Promise<ISong>;
    CreateBandAsync: (band: IBandlist) => Promise<IBandlist>;
    DeleteBandAsync(bandId: string): Promise<void>;
    AddSongsToBandAsync(bandId: string, songIds: string[]): Promise<void>;
    RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;

    AddSetlistToBandAsync: (setlist: ISet) => Promise<ISet>;
}

export interface IAppState {
    songLists: HashTable<ISonglist>;
    songListOrder: string[];
    availableBandlists: HashTable<IBandSummary>;
}

const AppContainer = styled.div`
    display: flex;
`;

const App = (props: IAppProps): JSX.Element => {
    const [songLists, setSongLists] = useState({} as HashTable<ISonglist>);
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
        const newSongs = Array.from(currentSongList.songs);
        newSongs.push(newSong);

        const newSongList = {
            ...currentSongList,
            songs: newSongs
        };

        const newSetlists = {
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

    const AddBandToState = (bandlist: IBandlist): void => {
        if (!songLists[bandlist.id]) {
            const newSongLists = {
                ...songLists,
                [bandlist.id]: bandlist
            };

            setSongLists(newSongLists);

            AddToSonglistOrder(bandlist.id);
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

            const newSonglists: HashTable<ISonglist> = songListIds.reduce((prev: HashTable<any>, current: string) => {
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

    const RemoveBandsongFromState = (bandId: string, songIds: number[]) => {
        const songlist = songLists[bandId];

        const newBandsongs = Array.from(songlist.songs);

        songIds.forEach(songId => {
            const index = newBandsongs.findIndex(song => song.id === songId);
            newBandsongs.splice(index, 1);
        });

        const newSonglist = {
            ...songlist,
            songs: newBandsongs
        } as ISonglist;

        const newSonglistState = {
            ...songLists,
            [newSonglist.id]: newSonglist
        };

        setSongLists(newSonglistState);
    };

    const AddSetlistToState = (setlist : ISet) => {
        if (!songLists[setlist.id]) {
            const newSongLists = {
                ...songLists,
                [setlist.id]: setlist
            };

            setSongLists(newSongLists);

            AddToSonglistOrder(setlist.id);
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

            const newSonglists: HashTable<ISonglist> = songListIds.reduce((prev: HashTable<any>, current: string) => {
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

                if (finish.songlistType === SonglistType.MainList) {
                    //nothing happens
                } else {
                    const newStartSongIds = Array.from(start.songs);
                    const draggable = newStartSongIds[source.index];

                    if (start.songlistType !== SonglistType.MainList) {
                        newStartSongIds.splice(source.index, 1);
                    }

                    const newFinishSongIds = Array.from(finish.songs);

                    if (doesBandlistContainsSongId(finish, draggable.id) === false) {
                        AddSongsToBandAsync(finish.id, [draggable.id.toString()]).then(result => {
                            newFinishSongIds.splice(destination.index, 0, draggable);

                            const newStartSonglist = {
                                ...start,
                                songs: newStartSongIds
                            };

                            const newFinishSonglist = {
                                ...finish,
                                songs: newFinishSongIds
                            };

                            const newStateSonglists = {
                                ...songLists,
                                [newStartSonglist.id]: newStartSonglist,
                                [newFinishSonglist.id]: newFinishSonglist
                            };

                            setSongLists(newStateSonglists);
                        });
                    }
                }
            } else if (hasPositionInSonglistChanged(destination, source)) {
                const songlist = songLists[source.droppableId];

                const newSongIds = Array.from(songlist.songs);
                const draggable = newSongIds.splice(source.index, 1);
                newSongIds.splice(destination.index, 0, draggable[0]);

                const newSetlist = {
                    ...songlist,
                    songs: newSongIds
                };

                const newStateSetlists = {
                    ...songLists,
                    [newSetlist.id]: newSetlist
                };

                setSongLists(newStateSetlists);
            } else {
                // no change
            }
        }
    };

    const doesBandlistContainsSongId = (songlist: ISonglist, songId: number): boolean =>
        songlist.songlistType === SonglistType.BandList && songlist.songs.filter(song => song.id === songId).length > 0;

    const hasSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlists = (): JSX.Element[] => {
        return songListOrder.map(songListId => {
            const songList = songLists[songListId];
            if (songList.songlistType === SonglistType.MainList) {
                return (
                    <MainListComponent
                        CreateSongAsync={CreateSongAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromMainListState={RemoveSongFromMainListState}
                        AddSongToMainListState={AddSongToMainListState}
                        key={songList.id}
                        songlist={songList as IMainlist}
                    />
                );
            } else if (songList.songlistType === SonglistType.BandList) {
                return (
                    <BandListComponent
                        key={songList.id}
                        songlist={songList as IBandlist}
                        RemoveSongsFromBandAsync={RemoveSongsFromBandAsync}
                        RemoveBandsongFromState={RemoveBandsongFromState}
                        DeleteBandAsync={DeleteBandAsync}
                        RemoveBandFromState={RemoveBandFromState}
                    />
                );
            } else {
                return (
                    <SetlistComponent
                        key={songList.id}
                        setlist={songList as ISet}
                    />
                );
            }
        });
    };

    const IsBandListNeeded = () =>
        Object.values(songLists).filter(songList => songList.songlistType === SonglistType.BandList).length === 0;

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
