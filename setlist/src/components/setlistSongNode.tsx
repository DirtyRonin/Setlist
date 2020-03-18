import React from "react";

import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import { ISong } from "../models";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SongNodeHtmlAttributesConfiguration } from "../Configuration";

export interface ISetlistNodeProps {
    song: ISong;
    index: number;
    setlistId: string;
}

const SongNodeContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
`;

const SetlistSongNodeComponent = (props: ISetlistNodeProps): JSX.Element => {
    const { song, index, setlistId } = props;
    const songDef = SongNodeHtmlAttributesConfiguration;

    const btn_click_deleteSong = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    };

    const uniqueNodeId = `${setlistId}-${song.Id}-${index}`;

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col>
                                <label>{songDef.Title.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Title.Data_TestId}>{song.Title}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{songDef.Artist.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Artist.Data_TestId}>{song.Artist}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{songDef.Mode.label}</label>
                            </Col>
                            <Col>
                                <label data-testid={songDef.Mode.Data_TestId}>{song.Key}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" type="button" onClick={btn_click_deleteSong}>
                                    Delete Song from Setlist
                                </Button>
                            </Col>
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SetlistSongNodeComponent;
