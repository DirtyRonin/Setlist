import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { History } from "history";

import { IBandSong, IModalActionsProps, ModalTypes } from "models";
import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IBandSongNodeProps {
    bandSong: IBandSong;
    index: number;

    history: History
    setModal(props: IModalActionsProps): void
}

const BandSongCatalogNodeComponent = (props: IBandSongNodeProps): JSX.Element => {
    const {
        bandSong,
        index,
        setModal,
        history
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$bandId=${bandSong.bandId}&$songId=${bandSong.songId}`,
            state: { background: history.location }
        })
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit, '/bandSongModal')
    const handleShowReadSong = () => createModal(ModalTypes.Read, '/bandSongModal')
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove, '/bandSongModal')
    const handleAddBandSongToSetlist = () => createModal(ModalTypes.Add, '/AddBandSongToSetlist')

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
                                        <DefaultLabelStyle>{bandSong.song.title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DefaultLabelStyle>{bandSong.song.artist}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='2' >
                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                            <MenuItem value="AddToSetlist" onClick={handleAddBandSongToSetlist}  >Add to Setlist</MenuItem>
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

export default BandSongCatalogNodeComponent;
