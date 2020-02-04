import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import SongNode from "./songNode";
import { setlist, song } from "../models/DndListModels";
import Configuration from "../Configuration/config";

export interface ISetlistProps {
    setlist: setlist;
    songs: song[];
    handleNewSong: (setlist: setlist, newSong: song) => void;
    AddSong(song: song): Promise<song>;
    handleDeleteSong(setlistId: string, songId: string): void;
    DeleteSong(setlistId: string, songId: string): Promise<void>;
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

const SetlistComponent = (props: ISetlistProps): JSX.Element => {
    const { AddSong, handleNewSong, setlist, songs, handleDeleteSong, DeleteSong } = props;

    const songDef = Configuration.SongTypeDefinition;

    const getUniqueControlId = (propName: string) => `${props.setlist.id}_${propName}`;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        // const song: Song = { title: "Ehrenlos", artist: "K.I.Z.", mode: "Brutal", id: "Ehrenlos - K.I.Z." };
        const song: song = {
            title: elements[getUniqueControlId(songDef.Title.Title)].value,
            artist: elements[getUniqueControlId(songDef.Artist.Title)].value,
            mode: elements[getUniqueControlId(songDef.Mode.Title)].value,
            id: ""
        };

        AddSong(song)
            .then(success => handleNewSong(setlist, success))
            .catch(error => console.log(error));
    };

    return (
        <Container data-testid={setlist.id}>
            <Title>{setlist.title}</Title>
            <Droppable droppableId={setlist.id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {songs.map((song, index) => (
                            <SongNode handleDeleteSong={handleDeleteSong} DeleteSong={DeleteSong} setlistId={setlist.id} key={song.id} song={song} index={index} />
                        ))}
                        {provided.placeholder}
                    </NodeList>
                )}
            </Droppable>
            <Form onSubmit={hanldeOnAddSongClick} method="GET">
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId={getUniqueControlId(songDef.Title.Title)}>
                        <Form.Label>{songDef.Title.label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Title.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={getUniqueControlId(songDef.Artist.Title)}>
                        <Form.Label>{songDef.Artist.label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Artist.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={getUniqueControlId(songDef.Mode.Title)}>
                        <Form.Label>{songDef.Mode.label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Mode.Placeholder}></Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Add Song
                </Button>
            </Form>
        </Container>
    );
};

export default SetlistComponent;
