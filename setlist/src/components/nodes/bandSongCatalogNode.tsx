import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { IBandSong, IModal, ModalTypes } from "../../models";
import { SongNodeContainer } from "../../styles";



export interface IBandSongNodeProps {
    bandSong: IBandSong;
    index: number;
    bandSongCatalogId: string;
    setModal(props: IModal): void
}

const BandSongCatalogNodeComponent = (props: IBandSongNodeProps): JSX.Element => {
    const { bandSong,
        index,
        bandSongCatalogId,
        setModal
    } = props;

    const createModal = (type :ModalTypes) =>{
        // const modal: IModalSong = {
        //     show: true,
        //     catalogId: bandSongCatalogId,
        //     catalogType: CatalogType.Song,
        //     type,
        //     value: bandSong
        // }
        // setModal(modal)
    }

    const handleShowEditSong = () => createModal("Edit")
    const handleShowReadSong = () => createModal("Read")
    const handleShowDeleteSong = () => createModal("Remove")

    const uniqueNodeId = `${bandSongCatalogId}-${bandSong.Id}-${index}`

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{bandSong.Song.Title} - {bandSong.Song.Artist}</label>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.New}</Button>
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

export default BandSongCatalogNodeComponent;
