import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistComponent from "./components/setlist";
import { dndList, song, setlist } from "./models/DndListModels";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { HashTable } from "./Util/HashTable";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<dndList>;
    AddSong(song: song): Promise<song>;
    DeleteSong(setlistId: string, songId: string): Promise<void>;
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

    const { AddSong, DeleteSong } = props;

    useEffect(() => {
        props.InitialStateRequest().then(result => {
            setSongs(result.songs);
            setSetlists(result.setlists);
            setSetlistOrder(result.setlistOrder);
        });
    }, []);

    const handleNewSong = (setlist: setlist, newSong: song) => {
        const newSongs = {
            ...songs,
            [newSong.id]: newSong
        };

        setSongs(newSongs);

        const currentSetlist = setlists[setlist.id];
        const currentSongIds = Array.from(currentSetlist.songIds);
        const newSongIds = currentSongIds.concat(newSong.id);

        const updatedSetlist = {
            ...currentSetlist,
            songIds: newSongIds
        };

        const newSetlists = {
            ...setlists,
            [setlist.id]: updatedSetlist
        };

        setSetlists(newSetlists);
    };

    const handleDeleteSong = (setlistId: string, songId: string): void => {
        const currentSetlist = setlists[setlistId];

        const newSongIds = Array.from(currentSetlist.songIds);
        const songIndex = newSongIds.indexOf(songId);
        newSongIds.splice(songIndex, 1);

        const newSetlist = {
            ...currentSetlist,
            songIds: newSongIds
        };

        const newStateSetlists = {
            ...setlists,
            [newSetlist.id]: newSetlist
        };

        setSetlists(newStateSetlists);

        const newSongsKeys = Object.keys(songs)
        const removalSongID = newSongsKeys.indexOf(songId)
        newSongsKeys.splice(removalSongID,1);

        const newSongs = newSongsKeys.reduce((newSongs: HashTable<any>, currentId: string) => {
            newSongs[currentId] = songs[currentId];
            return newSongs;
        }, {} as HashTable<any>);

        setSongs(newSongs);
    };

    const handleEditSong = () => {};

    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        if (destination) {
            if (hasColumnChanged(destination, source)) {
                const start = setlists[source.droppableId];
                const finsih = setlists[destination.droppableId];

                const newStartSongIds = Array.from(start.songIds);
                newStartSongIds.splice(source.index, 1);

                const newFinishSongIds = Array.from(finsih.songIds);
                newFinishSongIds.splice(destination.index, 0, draggableId);

                const newStartSetlist = {
                    ...start,
                    songIds: newStartSongIds
                };

                const newFinishSetlist = {
                    ...finsih,
                    songIds: newFinishSongIds
                };

                const newStateSetlists = {
                    ...setlists,
                    [newStartSetlist.id]: newStartSetlist,
                    [newFinishSetlist.id]: newFinishSetlist
                };

                setSetlists(newStateSetlists);
            } else if (hasPositionInColumnChanged(destination, source)) {
                const column = setlists[source.droppableId];

                const newSongIds = Array.from(column.songIds);
                newSongIds.splice(source.index, 1);
                newSongIds.splice(destination.index, 0, draggableId);

                const newSetlist = {
                    ...column,
                    songIds: newSongIds
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
            const setlistSongs = setlist.songIds.map(songId => songs[songId]);

            return (
                <SetlistComponent
                    AddSong={AddSong}
                    DeleteSong={DeleteSong}
                    handleDeleteSong={handleDeleteSong}
                    handleNewSong={handleNewSong}
                    key={setlistId}
                    setlist={setlist}
                    songs={setlistSongs}
                />
            );
        });
    };

    return (
        <Container>
            <Row>
                <Col>{/* <SelectSetlist /> */}</Col>
                <Col />
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
