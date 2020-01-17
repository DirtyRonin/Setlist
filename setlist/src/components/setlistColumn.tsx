import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { column, task } from "../models/DndListModels";
import styled from "styled-components";
import SetlistTask from "./setlistTask";

export interface ISetlistColumnProps {
    column: column;
    tasks: task[];
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

export default class SetlistColumn extends React.Component<ISetlistColumnProps> {
    constructor(props: ISetlistColumnProps) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                       <TaskList
                       ref = {provided.innerRef}
                           {...provided.droppableProps}
                       >
                           {this.props.tasks.map((task, index) => (
                               <SetlistTask key={task.id} task={task} index={index} />
                           ))}
                           {provided.placeholder}
                       </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
