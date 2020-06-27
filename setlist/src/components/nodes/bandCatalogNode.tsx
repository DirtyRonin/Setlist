import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { SongNodeContainer } from "../../styles";
import { IBand, IModal, ModalTypes, CatalogType } from "../../models";
import { IModalBand } from "../../models/modals/modelBand";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    catalogId: string;
    setModal(props: IModal): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {band,
        index,
        catalogId,
        setModal
    } = props;

    const createModal = (type :ModalTypes) =>{
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogType.Band,
            type,
            value:band
        }
        setModal(modal)
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${band.Id}-${index}`

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{band.Title}</label>
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

export default BandCatalogNodeComponent;
