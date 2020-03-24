import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";


import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";
import { Container, Title, NodeList } from "../styles";
import { Song } from "../mapping";

export interface IMainListProps {
    songlist: ISongCatalog;

    // CreateSongAsync(song: ISong): Promise<ISong>;
    // DeleteSongAsync(songId: string): Promise<ISong>;

    // AddSongToMainListState: (songListId: string, newSong: ISong) => void;
    // RemoveSongFromMainListState(songListId: string, songId: string): void;
}

const SongCatalogComponent = (props: IMainListProps): JSX.Element => {
    const {
        songlist,
        // CreateSongAsync,
        // AddSongToMainListState,
        // RemoveSongFromMainListState,
        // DeleteSongAsync
    } = props;

    useEffect(() => {
        /*initial request*/
    }, []);

    const songDef = CreateSongNodeHtmlAttributesConfiguration;

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song = Song.Create(
            elements[songDef.Title.ControlId].value,
            elements[songDef.Artist.ControlId].value,
            elements[songDef.Mode.ControlId].value,
        )

        // CreateSongAsync(song)
        //     .then(newSongResult => AddSongToMainListState(songlist.Id, newSongResult))
        //     .catch(error => console.log(error));
    };

    return (
        <Container data-testid={songlist.Id}>
            <Title>{songlist.Title}</Title>
            <Droppable droppableId={songlist.Id}>
                {provided => (
                    <NodeList ref={provided.innerRef} {...provided.droppableProps}>
                        {songlist.Songs.map((song, index) => (
                            <SongCatalogNodeComponent
                                // RemoveSongFromState={RemoveSongFromMainListState}
                                // DeleteSongAsync={DeleteSongAsync}
                                songListId={songlist.Id}
                                key={song.Id}
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

export default SongCatalogComponent;
