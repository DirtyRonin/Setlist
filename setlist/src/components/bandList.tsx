import React from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { ISongCatalog, ISong } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration } from "../Configuration";
import BandSongNodeComponent from "./bandSongNode";
import { ContainerCss, TitleCss, NodeListCss } from "../styles";
import { Song } from "../mapping";

export interface IBandListProps {
    songlist: ISongCatalog;
    DeleteBandAsync(bandId: string): Promise<void>;

    RemoveBandFromState(bandId: string): void;

    RemoveSongsFromBandAsync(bandId: string, songIds: string[]): Promise<void>;
    RemoveBandsongFromState(bandId: string,songIds: string[]):void
}

const BandListComponent = (props: IBandListProps): JSX.Element => {
    const { songlist, DeleteBandAsync,RemoveBandFromState,RemoveSongsFromBandAsync ,RemoveBandsongFromState} = props;

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

    const handleOnDeleteBandClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        DeleteBandAsync(songlist.Id)
            .then(result => RemoveBandFromState(songlist.Id))
            .catch(error => console.log(error));
    };

    return (
        <ContainerCss data-testid={songlist.Id}>
            <TitleCss>{songlist.Title}</TitleCss>
            <Droppable droppableId={songlist.Id}>
                {provided => (
                    <NodeListCss ref={provided.innerRef} {...provided.droppableProps}>
                        {songlist.Values &&
                            songlist.Values.map((song, index) => (
                                <BandSongNodeComponent RemoveSongsFromBandAsync={RemoveSongsFromBandAsync} RemoveBandsongFromState={RemoveBandsongFromState} songListId={songlist.Id} key={song.Id} song={song} index={index} />
                            ))}
                        {provided.placeholder}
                    </NodeListCss>
                )}
            </Droppable>

            <Form onSubmit={hanldeOnAddSongClick} method="GET">
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                        <Form.Label>{songDef.Title.Label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Title.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                        <Form.Label>{songDef.Artist.Label}</Form.Label>
                        <Form.Control type="text" placeholder={songDef.Artist.Placeholder}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId={songDef.Mode.ControlId}>
                        <Form.Label>{songDef.Mode.Label}</Form.Label>
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
        </ContainerCss>
    );
};

export default BandListComponent;
