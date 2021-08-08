import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalSetlistSong, ISetlistSong, ModalTypes } from "../../models";
import { SongNodeContainer } from "../../styles";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';
export interface ISetlistSongNodeProps {
    setlistSong: ISetlistSong;
    index: number;
    catalogId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
}


const SetlistSongCatalogNodeComponent = (props: ISetlistSongNodeProps): JSX.Element => {
    const {
        setlistSong,
        index,
        catalogId,
        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalSetlistSong = {
            show: true,
            catalogId: catalogId,
            catalogType: CatalogTypes["SetlistSong Catalog"],
            type,
            value: setlistSong,
            catalogInModal: CatalogTypes["None"]
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

    const handleShowEditSetlistSong = () => createModal("Edit")
    const handleShowReadSetlistSong = () => createModal("Read")
    const handleShowDeleteSetlistSong = () => createModal("Remove")

    const uniqueNodeId = `${catalogId}-${setlistSong.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{setlistSong.Song.Title}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>{setlistSong.Song.Artist}</label>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="AddBand" >Add Something</MenuItem>

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlistSong} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlistSong} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlistSong} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>

                    {/* <Col >
                                <label>{setlistSong.Song.Title} - {setlistSong.Song.Artist}</label>
                            </Col>
                            <Col></Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSetlistSong}>{ModalTypes.New}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSetlistSong}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSetlistSong}>{ModalTypes.Remove}</Button>
                            </Col> */}
                </Row>
            </SongNodeContainer>
        </Container>
    );
};

export default SetlistSongCatalogNodeComponent;