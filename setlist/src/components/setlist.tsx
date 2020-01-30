import React, { useState } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistColumn from "./setlistColumn";
import { dndList } from "../models/DndListModels";
import styled from "styled-components";

export interface ISetlistProps extends dndList {}

const Container = styled.div`
    display: flex;
`;

const Setlist = (props: ISetlistProps): JSX.Element => {
    const [tasks, setTasks] = useState(props.tasks);
    const [columns, setcolumns] = useState(props.columns);
    const [columnOrder, setcolumnOrder] = useState(props.columnOrder);

    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

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

                setcolumns(newStateColumns);
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

                setcolumns(newStateColumns);
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
        return columnOrder.map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => tasks[taskId]);

            return <SetlistColumn key={columnId} column={column} tasks={columnTasks} />;
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container data-testid="DragDropContext">{renderSetlistColumns()}</Container>
        </DragDropContext>
    );
};

export default Setlist;
