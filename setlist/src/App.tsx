import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import { song, songlist, bandlist } from "./models";
import MainListComponent from "./components/mainList";
import BandListComponent from "./components/bandList";
import CreateSetlist from "./components/createSetlistForm";

import {RemoveSongFromSonglists} from "./service"

import { ToSonglist } from "./Util";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<IAppState>;

    CreateSongAsync(song: song): Promise<song>;
    DeleteSongAsync(songId: string): Promise<void>;
    CreateBandAsync: (band: bandlist) => Promise<bandlist>;
    DeleteBandAsync(bandId: string): Promise<void>;
    AddSongsToBandAsync(bandId: string, songIds: string[]): Promise<void>;
    RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;
    // UpdateSetlistAsync(setlist: setlist): Promise<setlist>;
}

export interface IAppState {
    songLists: HashTable<songlist>;
    songListOrder: string[];
}

const AppContainer = styled.div`
    display: flex;
`;

const App = (props: IAppProps): JSX.Element => {
    const [songLists, setSongLists] = useState({} as HashTable<songlist>);
    const [songListOrder, setSongListOrder] = useState([] as string[]);

    const { CreateSongAsync, DeleteSongAsync, InitialStateRequest, CreateBandAsync, DeleteBandAsync, AddSongsToBandAsync ,RemoveSongsFromBandAsync} = props;

    useEffect(() => {
        InitialStateRequest().then(result => {
            setSongLists(result.songLists);
            setSongListOrder(result.songListOrder);
        });
    }, []);

    const AddSongToMainListState = (songListId: string, newSong: song) => {
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
        // const currentSongList = songLists[songListId];

        const newBandlists = RemoveSongFromSonglists({...songLists},songId);

        // const newSongs = Array.from(currentSongList.songs);
        // const newSongIds = newSongs.map(song => song.id);
        // const songIndex = newSongIds.indexOf(songId);
        // newSongs.splice(songIndex, 1);

        // const newSonglist = {
        //     ...currentSongList,
        //     songs: newSongs
        // };

        const newStateSetlists = {
            ...newBandlists
        };

        setSongLists(newStateSetlists);
    };

    const AddBandToState = (bandlist: bandlist): void => {
        if (!songLists[bandlist.id]) {
            const newSonglist = ToSonglist(bandlist);

            const newSongLists = {
                ...songLists,
                [newSonglist.id]: newSonglist
            };

            setSongLists(newSongLists);

            AddToSonglistOrder(newSonglist.id);
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

            const newSonglists: HashTable<songlist> = songListIds.reduce((prev: HashTable<any>, current: string) => {
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

    const RemoveBandsongFromState= (bandId: string,songIds: string[])=> {
        const songlist = songLists[bandId];

        const newBandsongs =Array.from(songlist.songs);

        songIds.forEach(songId =>{
            const index = newBandsongs.findIndex(song=> song.id === songId)
            newBandsongs.splice(index,1);
        } )

        const newSonglist = {
            ...songlist,
            songs: newBandsongs
        } as songlist

        const newSonglistState = {
            ...songLists,
            [newSonglist.id]:newSonglist
        }

        setSongLists(newSonglistState);
    }

    const onDragEnd = (result: DropResult): void => {
        const { destination, source } = result;

        if (destination) {
            if (hasSonglistChanged(destination, source)) {
                const start = songLists[source.droppableId];
                const finish = songLists[destination.droppableId];

                if (finish.isMainList) {
                    //nothing happens
                } else {
                    const newStartSongIds = Array.from(start.songs);
                    const draggable = newStartSongIds[source.index];

                    if (start.isMainList === false) {
                        newStartSongIds.splice(source.index, 1);
                    }

                    const newFinishSongIds = Array.from(finish.songs);

                    if (doesBandlistContainsSongId(finish, draggable.id) === false) {
                        AddSongsToBandAsync(finish.id, [draggable.id]).then(result => {
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

    const doesBandlistContainsSongId = (songlist: songlist, songId: string): boolean =>
        songlist.isBandList && songlist.songs.filter(song => song.id === songId).length > 0;

    const hasSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInSonglistChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlists = (): JSX.Element[] => {
        return songListOrder.map(songListId => {
            const songList = songLists[songListId];
            if (songList.isMainList) {
                return (
                    <MainListComponent
                        CreateSongAsync={CreateSongAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromMainListState={RemoveSongFromMainListState}
                        AddSongToMainListState={AddSongToMainListState}
                        key={songList.id}
                        songlist={songList}
                    />
                );
            } else if (songList.isBandList) {
                return (
                    <BandListComponent
                        key={songList.id}
                        songlist={songList}
                        RemoveSongsFromBandAsync={RemoveSongsFromBandAsync}
                        RemoveBandsongFromState={RemoveBandsongFromState}
                        DeleteBandAsync={DeleteBandAsync}
                        RemoveBandFromState={RemoveBandFromState}
                    />
                );
            } else {
                return (
                    <SetlistComponent
                        CreateSongAsync={CreateSongAsync}
                        // UpdateSetlistAsync={UpdateSetlistAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromState={RemoveSongFromMainListState}
                        AddSongToState={(songList: songlist, newSong: song) => {}}
                        key={songList.id}
                        songlist={songList}
                    />
                );
            }
        });
    };

    const IsBandListNeeded = () =>
        Object.values(songLists).filter(songList => songList.isMainList === false && songList.isBandList === true).length === 0;

    return (
        <Container>
            <Row>
                <Col md="8">
                    <CreateSetlist IsBandList={IsBandListNeeded()} CreateBandAsync={CreateBandAsync} AddBandToState={AddBandToState} />
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
