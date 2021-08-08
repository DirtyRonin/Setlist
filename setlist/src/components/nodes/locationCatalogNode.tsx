import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { SongNodeContainer } from "../../styles";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalLocation, ILocation, ModalTypes } from "../../models";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';



export interface ILocationNodeProps {
    location: ILocation;
    index: number;
    catalogId: string;

    pushCatalogsOrder(props: IComponentOrderActionProps): void

}

const LocationCatalogNodeComponent = (props: ILocationNodeProps): JSX.Element => {
    const {
        location,
        index,
        catalogId,

        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalLocation = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Location Catalog"],
            type,
            value: location,
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

    const handleShowEditLocation = () => createModal(ModalTypes.Edit)
    const handleShowReadLocation = () => createModal(ModalTypes.Read)
    const handleShowDeleteLocation = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${location.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{location.Name}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{location.Address}</label>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadLocation} >{ModalTypes.Read}*</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditLocation} >{ModalTypes.Edit}*</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteLocation} >{ModalTypes.Remove}*</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </SongNodeContainer>
        </Container>
    )
}

export default LocationCatalogNodeComponent