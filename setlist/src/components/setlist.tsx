import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import MainSongNodeComponent from "./mainSongNode";
import { ISonglist, ISong, ISet } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";
import SetlistSongNodeComponent from "./setlistSongNode";

export interface ISetlistProps {
    setlist: ISet;
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
    const {  setlist } = props;

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

        
    };

    return (
        <Container data-testid={setlist.id}>
            <Title>{setlist.title}</Title>
            {setlist.songs && (
                <Droppable droppableId={setlist.id}>
                    {provided => (
                        <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                            {setlist.songs.map((song, index) => (
                                <SetlistSongNodeComponent
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
            )}
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
