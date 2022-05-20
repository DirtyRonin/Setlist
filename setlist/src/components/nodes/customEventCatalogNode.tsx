import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { History } from "history";
import validator from "validator";

import { ICustomEvent, IModalActionsProps, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';



export interface IProps {
    customEvent: ICustomEvent;
    index: number;
    history: History
    setModal(props: IModalActionsProps): void
    setSetlistIdForSetlistSong(setlistId: number): void
}

const CustomEventCatalogNodeComponent = (props: IProps): JSX.Element => {
    const {
        customEvent,
        index,
        setModal,
        setSetlistIdForSetlistSong,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/', isModal: boolean = true) => {

        setModal({ showModal: true })

        setSetlistIdForSetlistSong(customEvent.setlist.id)

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$customEventId=${customEvent.id}&$setlistId=${customEvent.setlist.id}`,
            state: isModal ? { background: history.location } : undefined
        })

    }

    const handleShowReadCustomEvent = () => createModal(ModalTypes.Read, '/customEventModal')
    const handleShowEditCustomEvent = () => createModal(ModalTypes.Edit, '/customEventModal')
    const handleShowDeleteCustomEvent = () => createModal(ModalTypes.Remove, '/customEventModal')
    const handleShowSetlistEditor = () => createModal(ModalTypes.Add, '/setlistEditorModal')
    const handleShowSetlistSongsCatalog = () => createModal(ModalTypes.ShowCatalog, '/customEvent_SetlistSongAsCatalog', false)

    return (
        <DefaultNodeWrapperStyle >
            <Container>
                <Row>
                    <Col xs="10">
                        <Row>
                            <Col xs='3'>
                                <DefaultLabelStyle>{customEvent.title}</DefaultLabelStyle>
                            </Col>
                            <Col xs='3'>
                                <DefaultLabelStyle>{customEvent.band.title}</DefaultLabelStyle>
                            </Col>
                            <Col xs='3'>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{customEvent.location.name}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{customEvent.location.address}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='2'>
                                <DefaultLabelStyle>{customEvent.date.toLocaleDateString()}</DefaultLabelStyle>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs='1' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="openSetlist" onClick={handleShowSetlistSongsCatalog}  >Open Setlist</MenuItem>
                            <MenuItem value="compareSetlist" onClick={handleShowSetlistEditor}  >Compare Setlists</MenuItem>
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