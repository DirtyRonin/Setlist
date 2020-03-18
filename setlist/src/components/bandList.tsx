import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import { ISongCatalog, ISong } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";
import BandSongNodeComponent from "./bandSongNode";

export interface IBandListProps {
    songlist: ISongCatalog;
    DeleteBandAsync(bandId: string): Promise<void>;

    RemoveBandFromState(bandId: string): void;

    RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;
    RemoveBandsongFromState(bandId: string,songIds: string[]):void
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

const BandListComponent = (props: IBandListProps): JSX.Element => {
    const { songlist, DeleteBandAsync,RemoveBandFromState,RemoveSongsFromBandAsync ,RemoveBandsongFromState} = props;

    const songDef = CreateSongNodeHtmlAttributesConfiguration;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song: ISong = {
            Title: elements[songDef.Title.ControlId].value,
            Artist: elements[songDef.Artist.ControlId].value,
            Key: elements[songDef.Mode.ControlId].value,
            Id: ""
        };
    };

    const handleOnDeleteBandClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        DeleteBandAsync(songlist.Id)
            .then(result => RemoveBandFromState(songlist.Id))
            .catch(error => console.log(error));
    };

    return (
        <Container data-testid={songlist.Id}>
            <Title>{songlist.Title}</Title>
            <Droppable droppableId={songlist.Id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {songlist.Songs &&
                            songlist.Songs.map((song, index) => (
                                <BandSongNodeComponent RemoveSongsFromBandAsync={RemoveSongsFromBandAsync} RemoveBandsongFromState={RemoveBandsongFromState} songListId={songlist.Id} key={song.Id} song={song} index={index} />
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
                    Add Song to Band Songs
                </Button>
            </Form>
            <Button variant="primary" type="button" onClick={handleOnDeleteBandClick}>
                Delete Band
            </Button>
        </Container>
    );
};

export default BandListComponent;
