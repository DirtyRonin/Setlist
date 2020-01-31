import React from "react";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { Song } from "../models/DndListModels";

export interface ISongNodeProps {
    task: Song;
    index: number;
}

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const SongNode = (props: ISongNodeProps): JSX.Element => {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                   <div data-testid="task-content" >{props.task.title}</div> 
                </Container>
            )}
        </Draggable>
    );
};

export default SongNode