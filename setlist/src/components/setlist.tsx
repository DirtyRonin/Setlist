import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { column, Song } from "../models/DndListModels";
import styled from "styled-components";
import SongNode from "./songNode";

export interface ISetlistProps {
    column: column;
    tasks: Song[];
}

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    
`;

const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

const Setlist = (props: ISetlistProps): JSX.Element => (
    <Container data-testid={props.column.id}>
        <Title>{props.column.title}</Title>
        <Droppable droppableId={props.column.id}>
            {provided => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                    {props.tasks.map((task, index) => (
                        <SongNode key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </TaskList>
            )}
        </Droppable>
    </Container>
);

export default Setlist;
