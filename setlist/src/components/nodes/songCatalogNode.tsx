import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { ISong, IModal, ModalTypes, IModalSong, CatalogType } from "../../models";
import { SongNodeContainer } from "../../styles";



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

    const createModal = (type: ModalTypes) => {
        const modal: IModalSong = {
            show: true,
            catalogId: songListId,
            catalogType: CatalogType.Song,
            type,
            value: song
        }
        setSongModal(modal)
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)
    const handleShowAddSong = () => createModal(ModalTypes.Add)

    const uniqueNodeId = `${songListId}-${song.Id}-${index}`

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col xs="10" >

                                <Row>
                                    <Col>
                                        <label>{song.Title}</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>{song.Artist}</label>
                                    </Col>
                                </Row>
                            </Col >
                            <Col xs='2' >

                                <Button variant="secondary" onClick={handleShowAddSong}>...</Button>

                                {/* <Row>
                                    <Col sm="4">
                                        <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.Read}</Button>
                                    </Col>
                                    <Col sm="4">
                                        <Button variant="secondary" onClick={handleShowEditSong}>{ModalTypes.Edit}</Button>
                                    </Col>
                                    <Col sm="4">
                                        <Button variant="secondary" onClick={handleShowDeleteSong}>{ModalTypes.Remove}</Button>
                                    </Col>
                                </Row> */}
                            </Col>

                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SongCatalogNodeComponent;
