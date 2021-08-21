import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from "history";

import { ISong, ModalTypes, IModalSong, CatalogTypes, IComponentOrderActionProps, DisplayIn, IComponentOrder, IModal, IModalActionsProps } from "models";
import { DefaultNodeWrapperStyle, DefaultNodeImageStyle, DefaultLabelStyle } from "styles/defaultNodeStyle";


import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
import IconOval from "components/common/icons/common/oval";
// import '@szhsin/react-menu/dist/index.css';



export interface ISongNodeProps {
    history: History
    song: ISong;
    index: number;
    songListId: string;
    setModal(props: IModalActionsProps): void
}

const SongCatalogNodeComponent = (props: ISongNodeProps): JSX.Element => {
    const { song,
        index,
        songListId,
        setModal,
        history
    } = props;



    const createModal = (type: ModalTypes, catalogInModal: CatalogTypes = CatalogTypes["None"]) => {

        const modal: IModalSong = {
            show: true,
            catalogId: songListId,
            catalogType: CatalogTypes["Song Catalog"],
            type,
            value: song,
            catalogInModal
        }

        setModal({ modal, routePath: '/modal' })

        history.push({
            pathname: `/modal`,
            // search:'?type=song'
            state: { background: history.location }
        })
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)
    const handleAddSongToBand = () => createModal(ModalTypes.Add, CatalogTypes["Band Catalog"])
    const handleAddSongToSetlist = () => createModal(ModalTypes.Add, CatalogTypes["Setlist Catalog"])

    const uniqueNodeId = `${songListId}-${song.Id}-${index}`

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
