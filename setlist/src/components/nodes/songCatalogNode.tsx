import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { ISong, ModalTypes, IModalSong, CatalogTypes, IComponentOrderActionProps, DisplayIn, IComponentOrder } from "../../models";
import { SongNodeContainer } from "../../styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
// import '@szhsin/react-menu/dist/index.css';



export interface ISongNodeProps {
    song: ISong;
    index: number;
    songListId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}

const SongCatalogNodeComponent = (props: ISongNodeProps): JSX.Element => {
    const { song,
        index,
        songListId,
        pushCatalogsOrder,
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

        const order: IComponentOrderActionProps = {
            ComponentOrder: {
                value: modal,
                id: modal.catalogId,
                displayIn: DisplayIn.Modal
            } as IComponentOrder
        }

        pushCatalogsOrder(order)
    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)
    const handleAddSongToBand = () => createModal(ModalTypes.Add, CatalogTypes["Band Catalog"])
    const handleAddSongToSetlist = () => createModal(ModalTypes.Add, CatalogTypes["Setlist Catalog"])

    const uniqueNodeId = `${songListId}-${song.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{song.Title}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{song.Artist}</label>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
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
            </SongNodeContainer>
        </Container>
    );
};

export default SongCatalogNodeComponent;
