import React, { useState } from "react";

import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import SetlistColumn from "./setlistColumn";
import { dndList } from "../models/DndListModels";

export interface ISetlistProps extends dndList {}

const Setlist = (props: ISetlistProps): JSX.Element => {
    const [tasks, setTasks] = useState(props.tasks);
    const [columns, setcolumns] = useState(props.columns);
    const [columnOrder, setcolumnOrder] = useState(props.columnOrder);

    const onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        if (destination && hasDestinationChanged(destination, source)) {
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
        }
    };

    const hasDestinationChanged = (destination: DraggableLocation, source: DraggableLocation): boolean =>
        destination.droppableId === source.droppableId && destination.index === source.index ? false : true;

    const renderSetlistColumns = (): JSX.Element[] =>
        columnOrder.map(columnId => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
            console.log(columnId);
            console.log(column);
            console.log(columnTasks);
            return <SetlistColumn key={columnId} column={column} tasks={columnTasks} />;
        });

    return (
        <div data-testid="setlist-div">
            <DragDropContext onDragEnd={onDragEnd}>{renderSetlistColumns()}</DragDropContext>
        </div>
    );
};

export default Setlist;
