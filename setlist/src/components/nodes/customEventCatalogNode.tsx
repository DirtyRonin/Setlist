import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { SongNodeContainer } from "../../styles";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalCustomEvent, ICustomEvent, ModalTypes } from "../../models";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';



export interface ICustomEventNodeProps {
    customEvent: ICustomEvent;
    index: number;
    catalogId: string;

    pushCatalogsOrder(props: IComponentOrderActionProps): void

}

const CustomEventCatalogNodeComponent = (props: ICustomEventNodeProps): JSX.Element => {
    const {
        customEvent,
        index,
        catalogId,

        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalCustomEvent = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["CustomEvent Catalog"],
            type,
            value: customEvent,
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

    const handleShowEditCustomEvent = () => createModal(ModalTypes.Edit)
    const handleShowReadCustomEvent = () => createModal(ModalTypes.Read)
    const handleShowDeleteCustomEvent = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${customEvent.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{customEvent.Title}</label>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadCustomEvent} >{ModalTypes.Read}*</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditCustomEvent} >{ModalTypes.Edit}*</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteCustomEvent} >{ModalTypes.Remove}*</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </SongNodeContainer>
        </Container>
    )
}

export default CustomEventCatalogNodeComponent