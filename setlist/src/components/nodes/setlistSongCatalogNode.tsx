import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { History } from "history";

import { IModalActionsProps, ISetlistSong, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface ISetlistSongNodeProps {
    setlistSong: ISetlistSong;
    index: number;
    history: History
    setModal(props: IModalActionsProps): void
}


const SetlistSongCatalogNodeComponent = (props: ISetlistSongNodeProps): JSX.Element => {
    const {
        setlistSong,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${setlistSong.Id}`,
            state: { background: history.location }
        })
    }

    const handleShowEditSetlistSong = () => createModal(ModalTypes.Edit, '/setlistSongModal')
    const handleShowReadSetlistSong = () => createModal(ModalTypes.Read, '/setlistSongModal')
    const handleShowDeleteSetlistSong = () => createModal(ModalTypes.Remove, '/setlistSongModal')

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
                                        <DefaultLabelStyle>{setlistSong.Song.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{setlistSong.Song.Artist}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuDivider />
                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlistSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlistSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlistSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>
        </DefaultNodeWrapperStyle >
    );
};

export default SetlistSongCatalogNodeComponent;