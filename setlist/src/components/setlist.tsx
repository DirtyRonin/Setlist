import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { setlist, Song } from "../models/DndListModels";
import styled from "styled-components";
import SongNode from "./songNode";
import Button from "react-bootstrap/Button";
import { Form, FormControlProps, Col } from "react-bootstrap";


export interface ISetlistProps {
    setlist: setlist;
    songs: Song[];
    handleNewSong: (setlist: setlist, newSong: Song) => void;
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
    const { handleNewSong, setlist } = props;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements

        // const song: Song = { title: "Ehrenlos", artist: "K.I.Z.", mode: "Brutal", id: "Ehrenlos - K.I.Z." };
        const song: Song = { title: elements["title"].value, artist: elements["artist"].value, mode: elements["mode"].value, id: "Ehrenlos - K.I.Z." };
        handleNewSong(setlist, song);
    };

    return (
        <Container data-testid={props.setlist.id}>
            <Title>{props.setlist.title}</Title>
            <Droppable droppableId={props.setlist.id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {props.songs.map((song, index) => (
                            <SongNode key={song.id} task={song} index={index} />
                        ))}
                        {provided.placeholder}
                    </NodeList>
                )}
            </Droppable>
            <Form onSubmit={hanldeOnAddSongClick} method="GET">
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="title">
                        <Form.Label >Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title"></Form.Control>
                    </Form.Group >
                    <Form.Group as={Col} md="4" controlId="artist">
                        <Form.Label >Artist</Form.Label>
                        <Form.Control type="text" placeholder="Enter Artist"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="mode">
                        <Form.Label >Mode</Form.Label>
                        <Form.Control type="text" placeholder="Enter Mode"></Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Add Song
                </Button>

            </Form>
        </Container>
    );
};

export default Setlist;
