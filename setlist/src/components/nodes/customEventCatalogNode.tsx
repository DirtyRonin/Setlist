import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { History } from "history";

import { ICustomEvent, IModalActionsProps, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';



export interface ICustomEventNodeProps {
    customEvent: ICustomEvent;
    index: number;
    history: History
    setModal(props: IModalActionsProps): void
}

const CustomEventCatalogNodeComponent = (props: ICustomEventNodeProps): JSX.Element => {
    const {
        customEvent,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${customEvent.Id}`,
            state: { background: history.location }
        })
    }

    const handleShowReadCustomEvent = () => createModal(ModalTypes.Read,'/customEventModal')
    const handleShowEditCustomEvent = () => createModal(ModalTypes.Edit,'/customEventModal')
    const handleShowDeleteCustomEvent = () => createModal(ModalTypes.Remove,'/customEventModal')


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
                                        <DefaultLabelStyle>{customEvent.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>Band : {customEvent?.Band.Title ?? 'No Band'}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>Location : {customEvent?.Location.Name ?? 'No Location'}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>Setlist : {customEvent?.Setlist.Title ?? 'No Setlist'}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{customEvent.Date?.toLocaleDateString() ?? 'No Date'}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadCustomEvent} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditCustomEvent} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteCustomEvent} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
}

export default CustomEventCatalogNodeComponent