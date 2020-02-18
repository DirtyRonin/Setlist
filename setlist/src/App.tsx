import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import { song, songlist } from "./models";
import MainListComponent from "./components/mainList";
import BandListComponent from "./components/bandList";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<IAppState>;

    CreateSongAsync(song: song): Promise<song>;
    DeleteSongAsync(songId: string): Promise<void>;
    // CreateSetlistAsync: (setlist: setlist) => Promise<setlist>;
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

    const { CreateSongAsync, DeleteSongAsync, InitialStateRequest } = props;

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
        const currentSongList = songLists[songListId];

        const newSongs = Array.from(currentSongList.songs);
        const newSongIds = newSongs.map(song => song.id);
        const songIndex = newSongIds.indexOf(songId);
        newSongs.splice(songIndex, 1);

        const newSonglist = {
            ...currentSongList,
            songs: newSongs
        };

        const newStateSetlists = {
            ...songLists,
            [songListId]: newSonglist
        };

        setSongLists(newStateSetlists);
    };

    const AddSetlistToState = (setlist: songlist) => {
        const newSetlistState = {
            ...songLists,
            [setlist.id]: setlist
        };

        setSongLists(newSetlistState);

        const newSetlistOrder = Array.from(songListOrder);
        newSetlistOrder.push(setlist.id);

        setSongListOrder(newSetlistOrder);
    };

    const onDragEnd = (result: DropResult): void => {
        /* const { destination, source, draggableId } = result;

        if (destination) {
            if (hasColumnChanged(destination, source)) {
                const start = songLists[source.droppableId];
                const finsih = songLists[destination.droppableId];

                const newStartSongIds = Array.from(start.songs);
                const draggable = newStartSongIds.splice(source.index, 1);

                const newFinishSongIds = Array.from(finsih.songs);
                newFinishSongIds.splice(destination.index, 0, draggable[0]);

                const newStartSetlist = {
                    ...start,
                    songs: newStartSongIds
                };

                const newFinishSetlist = {
                    ...finsih,
                    songs: newFinishSongIds
                };

                const newStateSetlists = {
                    ...songLists,
                    [newStartSetlist.id]: newStartSetlist,
                    [newFinishSetlist.id]: newFinishSetlist
                };

                setSongLists(newStateSetlists);
            } else if (hasPositionInColumnChanged(destination, source)) {
                const column = songLists[source.droppableId];

                const newSongIds = Array.from(column.songs);
                const draggable = newSongIds.splice(source.index, 1);
                newSongIds.splice(destination.index, 0, draggable[0]);

                const newSetlist = {
                    ...column,
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
        } */
    };

    /* const hasColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;
 */
    const renderSetlists = (): JSX.Element[] => {
        return songListOrder.map(songListId => {
            const songList = songLists[songListId];
            if (songList.isMajorLibrary) {
                return (
                    <MainListComponent
                        CreateSongAsync={CreateSongAsync}
                        // UpdateSetlistAsync={UpdateSetlistAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromMainListState={RemoveSongFromMainListState}
                        AddSongToMainListState={AddSongToMainListState}
                        key={songList.id}
                        songlist={songList}
                    />
                );
            } else if (songList.isLibrary) {
                return (
                    <BandListComponent
                        key={songList.id}
                        songlist={songList}
                    />
                )
            }
            else {
                return (
                    <SetlistComponent
                        CreateSongAsync={CreateSongAsync}
                        // UpdateSetlistAsync={UpdateSetlistAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromState={RemoveSongFromMainListState}
                        AddSongToState={(songList: songlist, newSong: song) => { }}
                        key={songList.id}
                        songlist={songList}
                    />
                )
            }
        });
    };

    // const IsMajorLibraryNeeded = () => Object.keys(songLists).length === 0;

    return (
        <Container>
            {/* <Row>
                <Col md="8">
                    <CreateSetlist CreateSetlistAsync={CreateSetlistAsync} IsMajorLibrary={IsMajorLibraryNeeded()} AddSetlistToState={AddSetlistToState} />
                </Col>
                <Col md="2" />
                <Col md="2">
                    <input type="text"></input>
                </Col>
            </Row> */}
            <Row>
                <AppContainer data-testid="DragDropContext">
                    <DragDropContext onDragEnd={onDragEnd}>{renderSetlists()}</DragDropContext>
                </AppContainer>
            </Row>
        </Container>
    );
};

export default App;
