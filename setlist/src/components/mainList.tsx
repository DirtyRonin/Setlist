import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import MainSongNodeComponent from "./mainSongNode";
import { ISonglist, ISong } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";

export interface IMainListProps {
    songlist: ISonglist;

    CreateSongAsync(song: ISong): Promise<ISong>;
    DeleteSongAsync(songId: string): Promise<void>;

    AddSongToMainListState: (songListId: string, newSong: ISong) => void;
    RemoveSongFromMainListState(songListId: string, songId: string): void;
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

const MainListComponent = (props: IMainListProps): JSX.Element => {
    const { CreateSongAsync, AddSongToMainListState, songlist, RemoveSongFromMainListState, DeleteSongAsync } = props;

    const songDef = CreateSongNodeHtmlAttributesConfiguration;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song: ISong = {
            title: elements[songDef.Title.ControlId].value,
            artist: elements[songDef.Artist.ControlId].value,
            mode: elements[songDef.Mode.ControlId].value,
            id: -1
        };

        CreateSongAsync(song)
            .then(newSongResult => AddSongToMainListState(songlist.id, newSongResult))
            .catch(error => console.log(error));
    };

    return (
        <Container data-testid={songlist.id}>
            <Title>{songlist.title}</Title>
            <Droppable droppableId={songlist.id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {songlist.songs.map((song, index) => (
                            <MainSongNodeComponent
                                RemoveSongFromState={RemoveSongFromMainListState}
                                DeleteSongAsync={DeleteSongAsync}
                                songListId={songlist.id}
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
                    Add Song to Main List
                </Button>
            </Form>
        </Container>
    );
};

export default MainListComponent;
