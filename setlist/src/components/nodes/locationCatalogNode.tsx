import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from "history";

import { DefaultNodeWrapperStyle, DefaultNodeImageStyle, DefaultLabelStyle } from "styles/defaultNodeStyle";
import { ILocation, ModalTypes, IModalActionsProps } from "models";

import {
    Menu,
    MenuItem,
    MenuHeader
} from '@szhsin/react-menu';



export interface ILocationNodeProps {
    location: ILocation;
    index: number;
    history: History
    setModal(props: IModalActionsProps): void
}

const LocationCatalogNodeComponent = (props: ILocationNodeProps): JSX.Element => {
    const {
        location,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${location.id}`,
            state: { background: history.location }
        })
    }

    const handleShowReadLocation = () => createModal(ModalTypes.Read, `/locationModal`)
    const handleShowEditLocation = () => createModal(ModalTypes.Edit, '/locationModal')
    const handleShowDeleteLocation = () => createModal(ModalTypes.Remove, `/locationModal`)

    return (
        <DefaultNodeWrapperStyle >
            <Container>
                <Row>
                    <Col xs="10" >
                        <Row>
                            <Col xs="3">
                                <DefaultNodeImageStyle />
                            </Col>
                            <Col xs="9">
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{location.name}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{location.address}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadLocation} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditLocation} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteLocation} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
}

export default LocationCatalogNodeComponent