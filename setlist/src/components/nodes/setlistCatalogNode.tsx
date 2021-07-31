import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { SongNodeContainer } from "../../styles";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalSetlist, ISetlist, ModalTypes } from "../../models";

export interface ISetlistNodeProps {
    setlist: ISetlist;
    index: number;
    catalogId: string;

    pushCatalogsOrder(props: IComponentOrderActionProps): void

}

const SetlistCatalogNodeComponent = (props: ISetlistNodeProps): JSX.Element => {
    const {
        setlist,
        index,
        catalogId,
        
        pushCatalogsOrder
    } = props;

    const createModal = (type : ModalTypes) => {
        const modal: IModalSetlist = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Setlist Catalog"],
            type,
            value: setlist,
            catalogInModal:CatalogTypes["None"]
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

    const handleShowEditSetlist = () => createModal(ModalTypes.Edit)
    const handleShowReadSetlist = () => createModal(ModalTypes.Read)
    const handleShowDeleteSetlist = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${setlist.Id}-${index}`

    return (

    <Draggable draggableId={uniqueNodeId} index={index}>
        {provided => (
            <Container>
                <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Row>
                        <Col >
                            <label>{setlist.Title}</label>
                        </Col>
                        <div>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSetlist}>{ModalTypes.Read}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSetlist}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSetlist}>{ModalTypes.Remove}</Button>
                            </Col>
                        </div>
                    </Row>
                </SongNodeContainer>
            </Container>
        )}
    </Draggable>
    )
}

export default SetlistCatalogNodeComponent