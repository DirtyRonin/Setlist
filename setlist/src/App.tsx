import React from "react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { initialData } from "./static/initial-data";
import SetlistColumn from "./components/setlistColumn";
import { dndList } from "./models/DndListModels";

export interface IAppState extends dndList {}

export class App extends React.Component<{}, IAppState> {
    readonly state: IAppState;

    constructor() {
        super({});

        this.state = initialData;
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <SetlistColumn key={columnId} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        );
    }

    private onDragEnd(result: DropResult):void {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        console.log(this.state);

        const column = this.state.columns[source.droppableId];
        const newTasksIds = Array.from(column.taskIds);
        newTasksIds.splice(source.index, 1);
        newTasksIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTasksIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
        };

        this.setState(newState);
    }
}
