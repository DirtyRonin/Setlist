import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import { dndList, song, setlist } from "./models/DndListModels";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";
import CreateSetlist from "./components/createSetlistForm";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<dndList>;

    CreateSongAsync(song: song): Promise<song>;
    DeleteSongAsync(setlistId: string, songId: string): Promise<void>;
    CreateSetlistAsync: (setlist: setlist) => Promise<setlist>;
    UpdateSetlistAsync(setlist: setlist): Promise<setlist>;
}

export interface IAppState {
    songs: HashTable<song>;
    setlists: HashTable<setlist>;
    setlistOrder: string[];
}

const AppContainer = styled.div`
    display: flex;
`;

const App = (props: IAppProps): JSX.Element => {
    const [songs, setSongs] = useState({} as HashTable<song>);
    const [setlists, setSetlists] = useState({} as HashTable<setlist>);
    const [setlistOrder, setSetlistOrder] = useState([] as string[]);
    const [] = useState(true);

    const { CreateSongAsync, DeleteSongAsync ,CreateSetlistAsync,InitialStateRequest,UpdateSetlistAsync} = props;

    useEffect(() => {
        InitialStateRequest().then(result => {
            setSongs(result.songs);
            setSetlists(result.setlists);
            setSetlistOrder(result.setlistOrder);
        });
    }, []);

    const AddSetlistToState = (setlist:setlist)=> {
        const newSetlistState = {
            ...setlists,
            [setlist.id] : setlist
        }

        setSetlists(newSetlistState);

        const newSetlistOrder = Array.from(setlistOrder);
        newSetlistOrder.push(setlist.id);

        setSetlistOrder(newSetlistOrder);
    }

    const AddSongToState = (setlist: setlist, newSong: song) => {
        const newSongs = {
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

        setSetlists(newSetlists);
    };

    const RemoveSongFromState = (setlistId: string, songId: string): void => {
        const currentSetlist = setlists[setlistId];

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

        setSongs(newSongs);
    };


    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        if (destination) {
            if (hasColumnChanged(destination, source)) {
                const start = setlists[source.droppableId];
                const finsih = setlists[destination.droppableId];

                const newStartSongIds = Array.from(start.songs);
                newStartSongIds.splice(source.index, 1);

                const newFinishSongIds = Array.from(finsih.songs);
                newFinishSongIds.splice(destination.index, 0, draggableId);

                const newStartSetlist = {
                    ...start,
                    songs: newStartSongIds
                };

                const newFinishSetlist = {
                    ...finsih,
                    songs: newFinishSongIds
                };

                const newStateSetlists = {
                    ...setlists,
                    [newStartSetlist.id]: newStartSetlist,
                    [newFinishSetlist.id]: newFinishSetlist
                };

                setSetlists(newStateSetlists);
            } else if (hasPositionInColumnChanged(destination, source)) {
                const column = setlists[source.droppableId];

                const newSongIds = Array.from(column.songs);
                newSongIds.splice(source.index, 1);
                newSongIds.splice(destination.index, 0, draggableId);

                const newSetlist = {
                    ...column,
                    songs: newSongIds
                };

                const newStateSetlists = {
                    ...setlists,
                    [newSetlist.id]: newSetlist
                };

                setSetlists(newStateSetlists);
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
        return setlistOrder.map(setlistId => {
            const setlist = setlists[setlistId];
            const setlistSongs = setlist.songs.map(songId => songs[songId]);

            return (
                <SetlistComponent
                    CreateSongAsync={CreateSongAsync}
                    UpdateSetlistAsync={UpdateSetlistAsync}
                    DeleteSongAsync={DeleteSongAsync}
                    RemoveSongFromState={RemoveSongFromState}
                    AddSongToState={AddSongToState}
                    key={setlistId}
                    setlist={setlist}
                    songs={setlistSongs}
                />
            );
        });
    };

    const IsMajorLibraryNeeded = () => Object.keys(setlists).length === 0

    return (
        <Container>
            <Row>
                <Col md="8">
                    <CreateSetlist CreateSetlistAsync={CreateSetlistAsync} IsMajorLibrary={IsMajorLibraryNeeded()} AddSetlistToState={AddSetlistToState} />
                </Col>
                <Col md="2" />
                <Col md="2">
                    <input type="text"></input>
                </Col>
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
