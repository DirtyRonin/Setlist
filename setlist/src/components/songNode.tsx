import React from "react";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { song } from "../models";
import { Container, Row, Col, Button } from "react-bootstrap";
import {SongNodeHtmlAttributesConfiguration} from "../Configuration";

export interface ISongNodeProps {
    song: song;
    index: number;
    setlistId: string;
    DeleteSongAsync(setlistId: string, songId: string): Promise<void>;

    RemoveSongFromState(setlistId: string, songId: string): void;
}

const SongNodeContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const SongNode = (props: ISongNodeProps): JSX.Element => {
    const { song, index,setlistId, RemoveSongFromState } = props;
    const songDef = SongNodeHtmlAttributesConfiguration;

    const btn_click_deleteSong = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        RemoveSongFromState(setlistId,song.id);
    };

    return (
        <Draggable draggableId={song.id} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col>
                                <label>{songDef.Title.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Title.Data_TestId}>{song.title}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{songDef.Artist.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Artist.Data_TestId}>{song.artist}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{songDef.Mode.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Mode.Data_TestId}>{song.mode}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="button" onClick={btn_click_deleteSong}>
                                    Delete Song
                                </Button>
                            </Col>
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SongNode;
