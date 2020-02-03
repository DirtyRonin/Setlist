import React, { useState, useEffect } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import InitialStateRequest from "./api/InitialStateRequest";
import Setlist from "./components/setlist";
import { dndList, HashTable, Song, column } from "./models/DndListModels";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Endpoints } from "./static/config";

export interface IAppProps /* extends dndList */ {
    InitialStateRequest(): Promise<dndList>;
}

export interface IAppState {
    songs: HashTable<Song>
    columns: HashTable<column>
    columnOrder: string[]
}

const AppContainer = styled.div`
    display: flex;
`;

const App = (props: IAppProps): JSX.Element => {

    const [state,setState] = useState({ columns: {}, songs: {}, columnOrder: [] } as IAppState )

    // const [songs, setsongs] = useState({} as HashTable<Song>);
    // const [columns, setcolumns] = useState({} as HashTable<column>);
    // const [columnOrder, setcolumnOrder] = useState([] as string[]);

    useEffect(() => {
        props.InitialStateRequest().then(result => {

            setState(result);

            // setsongs(result.songs);
            // setcolumns(result.columns);
            // setcolumnOrder(result.columnOrder);
        });
    }, []);

    const handleNewSong = (newSong: Song) => {

        const {songs, columns} = state;

        const newSongs = {
            ...songs,
            [newSong.id]: newSong
        };

        const currentColumn = columns[Endpoints.Songs];
        const currentTaskIds = Array.from(currentColumn.taskIds);
        const newTaskIds = currentTaskIds.concat(newSong.id);

        const updatedColumn = {
            ...currentColumn,
            taskIds: newTaskIds
        };

        const newColumns = {
            ...columns,
            [Endpoints.Songs]: updatedColumn
        };

        const newState : IAppState = {
            ...state,
            songs:newSongs,
            columns: newColumns
        }

        setState(newState);
    };

    const handleRemoveSong = () => {};
    const handleEditSong = () => {};

    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;
        const {columns} = state

        if (destination) {
            if (hasColumnChanged(destination, source)) {
                const start = columns[source.droppableId];
                const finsih = columns[destination.droppableId];

                const newStartTasksIds = Array.from(start.taskIds);
                newStartTasksIds.splice(source.index, 1);

                const newFinishTasksIds = Array.from(finsih.taskIds);
                newFinishTasksIds.splice(destination.index, 0, draggableId);

                const newStartColumn = {
                    ...start,
                    taskIds: newStartTasksIds
                };

                const newFinishColumn = {
                    ...finsih,
                    taskIds: newFinishTasksIds
                };

                const newStateColumns = {
                    ...columns,
                    [newStartColumn.id]: newStartColumn,
                    [newFinishColumn.id]: newFinishColumn
                };

                const newState: IAppState = {
                    ...state,
                    columns : newStateColumns
                }

                setState(newState);
                
            } else if (hasPositionInColumnChanged(destination, source)) {
                const column = columns[source.droppableId];

                const newTasksIds = Array.from(column.taskIds);
                newTasksIds.splice(source.index, 1);
                newTasksIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...column,
                    taskIds: newTasksIds
                };

                const newStateColumns = {
                    ...columns,
                    [newColumn.id]: newColumn
                };

                const newState: IAppState = {
                    ...state,
                    columns : newStateColumns
                }

                setState(newState);

                // setcolumns(newStateColumns);
            } else {
                // no change
            }
        }
    };

    const hasColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId !== source.droppableId;

    const hasPositionInColumnChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.index !== source.index;

    const renderSetlistColumns = (): JSX.Element[] => {
        const {columnOrder,columns,songs} = state;
        return columnOrder.map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => songs[taskId]);

            return <Setlist handleNewSong={handleNewSong} key={columnId} setlist={column} songs={columnTasks} />;
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
                    <DragDropContext onDragEnd={onDragEnd}>{renderSetlistColumns()}</DragDropContext>
                </AppContainer>
            </Row>
        </Container>
    );
};

export default App;
