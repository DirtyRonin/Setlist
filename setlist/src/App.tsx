import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import { song, songlist } from "./models";
import MainListComponent from "./components/mainList";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<IAppState>;

    CreateSongAsync(song: song): Promise<song>;
    DeleteSongAsync(setlistId: string, songId: string): Promise<void>;
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

    const AddSongToState = (setlist: songlist, newSong: song) => {
        /* const newSongs = {
            ...songs,
            [newSong.id]: newSong
        };

        setSongs(newSongs);

        const currentSetlist = setlists[setlist.id];
        const newRefSongs = Array.from(currentSetlist.songs);
        newRefSongs.push(newSong.id);

        const updatedSetlist = {
            ...currentSetlist,
            songs: newRefSongs
        };

        const newSetlists = {
            ...setlists,
            [setlist.id]: updatedSetlist
        };

        setSetlists(newSetlists); */
    };

    const RemoveSongFromState = (setlistId: string, songId: string): void => {
        /*  const currentSetlist = setlists[setlistId];

        const newSongIds = Array.from(currentSetlist.songs);
        const songIndex = newSongIds.indexOf(songId);
        newSongIds.splice(songIndex, 1);

        const newSetlist = {
            ...currentSetlist,
            songs: newSongIds
        };

        const newStateSetlists = {
            ...setlists,
            [newSetlist.id]: newSetlist
        };

        setSetlists(newStateSetlists);

        const newSongsKeys = Object.keys(songs);
        const removalSongID = newSongsKeys.indexOf(songId);
        newSongsKeys.splice(removalSongID, 1);

        const newSongs = newSongsKeys.reduce((newSongs: HashTable<any>, currentId: string) => {
            newSongs[currentId] = songs[currentId];
            return newSongs;
        }, {} as HashTable<any>);

        setSongs(newSongs); */
    };

    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

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
        }
    };

    const hasColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlists = (): JSX.Element[] => {
        return songListOrder.map(songListId => {
            const songList = songLists[songListId];
            if (songList.isMajorLibrary) {
                return (
                    <MainListComponent
                        CreateSongAsync={CreateSongAsync}
                        // UpdateSetlistAsync={UpdateSetlistAsync}
                        DeleteSongAsync={songId => Promise.resolve()}
                        RemoveSongFromMainListState={(songListId: string, songId: string) => {}}
                        AddSongToMainListState={(songListId: string, newSong: song) => {}}
                        key={songList.id}
                        songlist={songList}
                    />
                );
            } else {
                return (
                    <SetlistComponent
                        CreateSongAsync={CreateSongAsync}
                        // UpdateSetlistAsync={UpdateSetlistAsync}
                        DeleteSongAsync={DeleteSongAsync}
                        RemoveSongFromState={RemoveSongFromState}
                        AddSongToState={AddSongToState}
                        key={songList.id}
                        songlist={songList}
                    />
                );
            }
            // return (
            //        {songList.isMajorLibrary && getSetlist(songList)}
            // );
        });
    };

    const getSetlist = (songList: songlist): JSX.Element => (
        <SetlistComponent
            CreateSongAsync={CreateSongAsync}
            // UpdateSetlistAsync={UpdateSetlistAsync}
            DeleteSongAsync={DeleteSongAsync}
            RemoveSongFromState={RemoveSongFromState}
            AddSongToState={AddSongToState}
            key={songList.id}
            songlist={songList}
        />
    );

    const IsMajorLibraryNeeded = () => Object.keys(songLists).length === 0;

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
