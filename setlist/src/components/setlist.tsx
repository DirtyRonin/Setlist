import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong, ISetCatalog } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";
import SetlistSongNodeComponent from "./setlistSongNode";
import { Song } from "../mapping";

export interface ISetlistProps {
    setlist: ISetCatalog;
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

        const song = Song.Create(
            elements[songDef.Title.ControlId].value,
            elements[songDef.Artist.ControlId].value,
            elements[songDef.Mode.ControlId].value,
            false,
            "no genre",
            "no comment"
        )
        
    };

    return (
        <Container data-testid={setlist.Id}>
            <Title>{setlist.Title}</Title>
            {setlist.Values && (
                <Droppable droppableId={setlist.Id}>
                    {provided => (
                        <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                            {setlist.Values.map((song, index) => (
                                <SetlistSongNodeComponent
                                    setlistId={setlist.Id}
                                    key={song.Id}
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
