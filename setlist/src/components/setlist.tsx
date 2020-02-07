import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import SongNode from "./songNode";
import { setlist, song, setlistSong } from "../models/DndListModels";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";

export interface ISetlistProps {
    setlist: setlist;
    songs: song[];

    CreateSongAsync(song: song): Promise<song>;
    DeleteSongAsync(setlistId: string, songId: string): Promise<void>;
    UpdateSetlistAsync(setlist: setlist): Promise<setlist>;
    
    AddSongToState: (setlist: setlist, newSong: song) => void;
    RemoveSongFromState(setlistId: string, songId: string): void;
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
    const { CreateSongAsync, AddSongToState, setlist, songs, RemoveSongFromState, DeleteSongAsync, UpdateSetlistAsync } = props;

    const songDef = CreateSongNodeHtmlAttributesConfiguration;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song: song = {
            title: elements[songDef.Title.ControlId].value,
            artist: elements[songDef.Artist.ControlId].value,
            mode: elements[songDef.Mode.ControlId].value,
            id: ""
        };

        CreateSongAsync(song)
            .then(newsongResult => {
                const newSetlistSongs = Array.from(setlist.songs);
                newSetlistSongs.push(newsongResult.id);

                const newSetlist = {
                    ...setlist,
                    songs: newSetlistSongs
                };

                UpdateSetlistAsync(newSetlist)
                    .then(newSetlistResult =>{
                        AddSongToState(newSetlist, newsongResult)
                    })
                    .catch(error =>
                        console.log(error)
                    );
            })
            .catch(error => console.log(error));
    };

    return (
        <Container data-testid={setlist.id}>
            <Title>{setlist.title}</Title>
            <Droppable droppableId={setlist.id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {songs.map((song, index) => (
                            <SongNode
                                RemoveSongFromState={RemoveSongFromState}
                                DeleteSongAsync={DeleteSongAsync}
                                setlistId={setlist.id}
                                key={song.id}
                                song={song}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </NodeList>
                )}
            </Droppable>
            <Form onSubmit={hanldeOnAddSongClick} method="GET">
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                        <Form.Label>{songDef.Title.label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Title.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                        <Form.Label>{songDef.Artist.label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Artist.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={songDef.Mode.ControlId}>
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
