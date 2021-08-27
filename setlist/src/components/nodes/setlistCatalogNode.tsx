import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from "history";

import { DefaultNodeWrapperStyle, DefaultNodeImageStyle, DefaultLabelStyle } from "styles/defaultNodeStyle";
import { IModalActionsProps, ISetlist, ModalTypes } from "models";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

export interface ISetlistNodeProps {
    setlist: ISetlist;
    index: number;
    history: History
    setModal(props: IModalActionsProps): void
    setSetlistIdForSetlistSong(setlistId: string): void
}

const SetlistCatalogNodeComponent = (props: ISetlistNodeProps): JSX.Element => {
    const {
        setlist,
        index,
        setSetlistIdForSetlistSong,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/', isModal: boolean = true) => {

        setModal({ showModal: true })

        if (type === ModalTypes.ShowCatalog)
            setSetlistIdForSetlistSong(setlist.Id)

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${setlist.Id}`,
            state: isModal ? { background: history.location } : undefined //display as catalog in main window
        })
    }

    const handleShowEditSetlist = () => createModal(ModalTypes.Edit, '/setlistModal')
    const handleShowReadSetlist = () => createModal(ModalTypes.Read, '/setlistModal')
    const handleShowDeleteSetlist = () => createModal(ModalTypes.Remove, '/setlistModal')
    const handleShowSetlistSongsCatalog = () => createModal(ModalTypes.ShowCatalog, '/setlistSongAsCatalog', false)

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
                                        <DefaultLabelStyle>{setlist.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="ShowSetlistSongs" onClick={handleShowSetlistSongsCatalog}  >Show Setlist Songs</MenuItem>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlist} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlist} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlist} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
}

export default SetlistCatalogNodeComponent