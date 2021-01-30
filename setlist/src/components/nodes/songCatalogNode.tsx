import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { ISong, IModal, ModalTypes, IModalSong, CatalogTypes, IComponentOrderActionProps, DisplayIn, IComponentOrder, IReferencedCatalog } from "../../models";
import { SongNodeContainer } from "../../styles";
import { BandCatalog } from "../../mapping";
import { IOwnBandCatalogProps } from "../../store/containers/catalogs/BandCatalogContainer";



export interface ISongNodeProps {
    song: ISong;
    index: number;
    songListId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}

const SongCatalogNodeComponent = (props: ISongNodeProps): JSX.Element => {
    const { song,
        index,
        songListId,
        pushCatalogsOrder,
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalSong = {
            show: true,
            catalogId: songListId,
            catalogType: CatalogTypes["Song Catalog"],
            type,
            value: song,
            referencedCatalog: {
                
                bandCatalogId: BandCatalog.CatalogId,
                ownNodeProps:{
                    song,
                    songCatalogId:songListId
                }
            } as IOwnBandCatalogProps
        }

        const order: IComponentOrderActionProps = {
            ComponentOrder: {
                value: modal,
                id: modal.catalogId,
                displayIn: DisplayIn.Modal
            } as IComponentOrder
        }

        pushCatalogsOrder(order)
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
                            <Col xs="6" >
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
                            <Col xs='6' >
                                <Row>
                                    <Col xs="6">
                                        <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.Read}</Button>
                                    </Col>
                                    <Col xs="6">
                                        <Button variant="secondary" onClick={handleShowEditSong}>{ModalTypes.Edit}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <Button variant="secondary" onClick={handleShowDeleteSong}>{ModalTypes.Remove}</Button>
                                    </Col>
                                    <Col xs="6">
                                        <Button variant="secondary" onClick={handleShowAddSong}>...</Button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SongCatalogNodeComponent;
