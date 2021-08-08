import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { SongNodeContainer } from "../../styles";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalSetlist, ISetlist, ModalTypes } from "../../models";

import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

export interface ISetlistNodeProps {
    setlist: ISetlist;
    index: number;
    catalogId: string;

    pushCatalogsOrder(props: IComponentOrderActionProps): void

}

const SetlistCatalogNodeComponent = (props: ISetlistNodeProps): JSX.Element => {
    const {
        setlist,
        index,
        catalogId,

        pushCatalogsOrder
    } = props;

    const createModal = (type: ModalTypes) => {
        const modal: IModalSetlist = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Setlist Catalog"],
            type,
            value: setlist,
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

    const handleShowEditSetlist = () => createModal(ModalTypes.Edit)
    const handleShowReadSetlist = () => createModal(ModalTypes.Read)
    const handleShowDeleteSetlist = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${setlist.Id}-${index}`

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8" >
                        <Row>
                            <Col>
                                <label>{setlist.Title}</label>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs='4' >
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="AddSong"  >Add Song *</MenuItem>
                            <MenuItem value="AddBandSong"  >Add Song from Band *</MenuItem>

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadSetlist} >{ModalTypes.Read}*</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditSetlist} >{ModalTypes.Edit}*</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteSetlist} >{ModalTypes.Remove}*</MenuItem>
                        </Menu>
                    </Col>




                    {/* <Col >
                        <label>{setlist.Title}</label>
                    </Col>
                    <div>
                        <Col>
                            <Button variant="secondary" onClick={handleShowReadSetlist}>{ModalTypes.Read}</Button>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={handleShowEditSetlist}>{ModalTypes.Edit}</Button>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={handleShowDeleteSetlist}>{ModalTypes.Remove}</Button>
                        </Col>
                    </div> */}
                </Row>
            </SongNodeContainer>
        </Container>
    )
}

export default SetlistCatalogNodeComponent