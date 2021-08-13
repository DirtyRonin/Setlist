import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { CatalogTypes, DisplayIn, IBandSong, IComponentOrder, IComponentOrderActionProps, ModalTypes } from "models";
import { IModalBandSong } from "models/modals";
import { SongNodeContainer } from "../../styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

export interface IBandSongNodeProps {
    bandSong: IBandSong;
    index: number;
    bandSongCatalogId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}

const BandSongCatalogNodeComponent = (props: IBandSongNodeProps): JSX.Element => {
    const {
        bandSong,
        index,
        bandSongCatalogId,
        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes, catalogInModal: CatalogTypes = CatalogTypes["None"]) => {
        const modal: IModalBandSong = {
            show: true,
            catalogId: bandSongCatalogId,
            catalogType: CatalogTypes["BandSong Catalog"],
            type,
            value: bandSong,
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

    const handleShowEditSong = () => createModal("Edit")
    const handleShowReadSong = () => createModal("Read")
    const handleShowDeleteSong = () => createModal("Remove")
    const handleAddBandSongToSetlist = () => createModal(ModalTypes.Add, CatalogTypes["Setlist Catalog"])

    const uniqueNodeId = `${bandSongCatalogId}-${bandSong.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>

                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{bandSong.Song.Title} - {bandSong.Song.Artist}</label>
                            </Col>
                        </Row>

                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="AddToSetlist" onClick={handleAddBandSongToSetlist}  >Add to Setlist</MenuItem>
                            

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>

                    {/* <Col >
                                <label>{bandSong.Song.Title} - {bandSong.Song.Artist}</label>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.New}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSong}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSong}>{ModalTypes.Remove}</Button>
                            </Col> */}
                </Row>
            </SongNodeContainer>
        </Container>
    );
};

export default BandSongCatalogNodeComponent;
