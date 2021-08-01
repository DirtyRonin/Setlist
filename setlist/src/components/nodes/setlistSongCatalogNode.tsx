import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalSetlistSong, ISetlistSong, ModalTypes } from "../../models";
import { SongNodeContainer } from "../../styles";

export interface ISetlistSongNodeProps {
    setlistSong: ISetlistSong;
    index: number;
    catalogId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}


const SetlistSongCatalogNodeComponent = (props: ISetlistSongNodeProps): JSX.Element => {
    const {
        setlistSong,
        index,
        catalogId,
        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalSetlistSong = {
            show: true,
            catalogId: catalogId,
            catalogType: CatalogTypes["SetlistSong Catalog"],
            type,
            value: setlistSong,
            catalogInModal: CatalogTypes["None"]
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

    const handleShowEditSetlistSong = () => createModal("Edit")
    const handleShowReadSetlistSong = () => createModal("Read")
    const handleShowDeleteSetlistSong = () => createModal("Remove")

    const uniqueNodeId = `${catalogId}-${setlistSong.Id}-${index}`

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{setlistSong.Song.Title} - {setlistSong.Song.Artist}</label>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSetlistSong}>{ModalTypes.New}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSetlistSong}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSetlistSong}>{ModalTypes.Remove}</Button>
                            </Col>
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default SetlistSongCatalogNodeComponent;