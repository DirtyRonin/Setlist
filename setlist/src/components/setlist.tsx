import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { column, Song } from "../models/DndListModels";
import styled from "styled-components";
import SongNode from "./songNode";
import Button from "react-bootstrap/Button";

export interface ISetlistProps {
    setlist: column;
    songs: Song[];
    handleNewSong: (newSong: Song) => void;
}

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
`;

const Title = styled.h3`
    padding: 8px;
`;
const NodeList = styled.div`
    padding: 8px;
`;

const Setlist = (props: ISetlistProps): JSX.Element => {
    const { handleNewSong } = props;

    const hanldeOnAddSongClick = (event: React.MouseEvent) => {
        event.preventDefault();

        const song: Song = { title: "Ehrenlos", artist: "K.I.Z.", mode: "Brutal", id : "Ehrenlos - K.I.Z." };
        handleNewSong(song);
    };

    return (
        <Container data-testid={props.setlist.id}>
            <Title>{props.setlist.title}</Title>
            <Droppable droppableId={props.setlist.id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {props.songs.map((task, index) => (
                            <SongNode key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </NodeList>
                )}
            </Droppable>
            <Button type="button" className="btn_AddNewSong" onClick={hanldeOnAddSongClick}>
                Add Song
            </Button>
        </Container>
    );
};

export default Setlist;
