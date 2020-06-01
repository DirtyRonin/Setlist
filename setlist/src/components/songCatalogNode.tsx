import React from "react";

import { Draggable } from "react-beautiful-dnd";

import { ISong, IModal, ModalTypes } from "../models";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SongNodeContainer } from "../styles";

export interface ISongNodeProps {
    song: ISong;
    index: number;
    songListId: string;
    setSongModal(props: IModal): void
}

const SongCatalogNodeComponent = (props: ISongNodeProps): JSX.Element => {
    const { song,
        index,
        songListId,
        setSongModal
    } = props;

    const createModal = (type :ModalTypes) =>{
        const modal: IModal = {
            show: true,
            catalogId: songListId,
            type,
            song: song
        }
        setSongModal(modal)
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${songListId}-${song.Id}-${index}`

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{song.Title} - {song.Artist}</label>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.Read}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSong}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSong}>{ModalTypes.Remove}</Button>
                            </Col>
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SongCatalogNodeComponent;
