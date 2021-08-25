import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from "history";

import { ISong, ModalTypes, IModalSong, CatalogTypes, IModalActionsProps } from "models";
import { DefaultNodeWrapperStyle, DefaultNodeImageStyle, DefaultLabelStyle } from "styles/defaultNodeStyle";


import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

export interface ISongNodeProps {
    history: History
    song: ISong;
    index: number;
    setModal(props: IModalActionsProps): void
}

const SongCatalogNodeComponent = (props: ISongNodeProps): JSX.Element => {
    const { 
        song,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${song.Id}`,
            state: { background: history.location }
        })
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit, '/songModal')
    const handleShowReadSong = () => createModal(ModalTypes.Read, `/songModal`)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove, `/songModal`)
    const handleAddSongToBand = () => createModal(ModalTypes.Add, '/AddSongToBand')
    const handleAddSongToSetlist = () => createModal(ModalTypes.Add, '/AddSongToSetlist')

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
                                        <DefaultLabelStyle>{song.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{song.Artist}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="AddToBand" onClick={handleAddSongToBand} >Add to Band Song</MenuItem>
                            <MenuItem value="AddToSetlist" onClick={handleAddSongToSetlist}  >Add to Setlist</MenuItem>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
};

export default SongCatalogNodeComponent;
