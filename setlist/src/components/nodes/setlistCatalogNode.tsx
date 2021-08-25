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
}

const SetlistCatalogNodeComponent = (props: ISetlistNodeProps): JSX.Element => {
    const {
        setlist,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${setlist.Id}`,
            state: { background: history.location }
        })
    }

    const handleShowEditSetlist = () => createModal(ModalTypes.Edit,'/setlistModal')
    const handleShowReadSetlist = () => createModal(ModalTypes.Read,'/setlistModal')
    const handleShowDeleteSetlist = () => createModal(ModalTypes.Remove,'/setlistModal')
    const handleAddSong = () => createModal(ModalTypes.Add, '/AddSong')
    const handleAddSongFromBandSongs = () => createModal(ModalTypes.Add, '/AddSongFromBandSongs')

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
                        <MenuItem value="AddSong" onClick={handleAddSong}  >Add Song *</MenuItem>
                            <MenuItem value="AddBandSong" onClick={handleAddSongFromBandSongs} >Add Song from Band *</MenuItem>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlist} >{ModalTypes.Read}*</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlist} >{ModalTypes.Edit}*</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlist} >{ModalTypes.Remove}*</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
}

export default SetlistCatalogNodeComponent