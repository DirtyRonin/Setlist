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

export default class SetlistTask extends React.Component<ISetlistTaskProps, {}> {
    constructor(props: ISetlistTaskProps) {
        super(props);
    }

    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {provided => (
                    <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        );
    }
}
