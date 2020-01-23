import React from "react";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { task } from "../models/DndListModels";

export interface ISetlistTaskProps {
    task: task;
    index: number;
}

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const SetlistTask = (props: ISetlistTaskProps): JSX.Element => {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                   <div data-testid="task-content" >{props.task.content}</div> 
                </Container>
            )}
        </Draggable>
    );
};

export default SetlistTask