import React from "react";
import { Container, Row, Col, Button, FormControlProps, Form } from "react-bootstrap";
import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

import { SongNodeContainer } from "../../styles";
import { IBand, ModalTypes, CatalogTypes, IStatusBandSongCatalogActionProps, DisplayIn, ISong, IBandSongEntityActionProps, IBandSong, IComponentOrder, IComponentOrderActionProps } from "../../models";
import { IModalBand } from "../../models/modals/modelBand";
import { BandCatalogNodeHtmlAttributesConfiguration } from "../../Configuration";
import { BandSongCatalog, BandSong } from "../../mapping";
import { GUID_EMPTY } from "../../Util";
import { CreateBandSongAsync } from "../../service";
import { AsyncButtonComponent } from "../common/asyncButton";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    catalogId: string;
    pushCatalogsOrder(props: IComponentOrderActionProps): void
    selectedNode?: ISong

    addToBandSongsAction(props: IBandSongEntityActionProps): void
    openBandSongsCatalog(bandId: string): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {
        band,
        index,
        catalogId,
        pushCatalogsOrder,
        openBandSongsCatalog,
        addToBandSongsAction,
        selectedNode
    } = props;

    const bandCatalogNodeDef = BandCatalogNodeHtmlAttributesConfiguration;

    const createModal = (type: ModalTypes) => {
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Band Catalog"],
            type,
            value: band,
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

    const concatUniqueID = (htmlElementId: string): string => `${htmlElementId}_${band.Id}`

    const handleShowBandSongCatalog = () => {
        openBandSongsCatalog(band.Id)
    }

    const handleAddSongToCatalog = () => {
        if (selectedNode) {
            const bandSong = { ...BandSong.EmptyBandSong(), Id: GUID_EMPTY, BandId: band.Id, SongId: selectedNode.Id } as IBandSong
            // catalogId: 'Band Song Catalog Id'
            addToBandSongsAction({ value: bandSong, catalogId: BandSongCatalog.GetCatalogId(band.Id) } as IBandSongEntityActionProps)
        }
    }

    const createBandSong = (): IBandSong =>
        selectedNode ? { ...BandSong.EmptyBandSong(), Id: GUID_EMPTY, BandId: band.Id, SongId: selectedNode.Id } as IBandSong : {} as IBandSong

    const handleShowEditBand = () => createModal(ModalTypes.Edit)
    const handleShowReadBand = () => createModal(ModalTypes.Read)
    const handleShowDeleteBand = () => createModal(ModalTypes.Remove)
    const handleShowBandSongsCatalog = () => handleShowBandSongCatalog()
    const handleShowBandSongsModal = () => handleShowBandSongCatalog()

    const uniqueNodeId = `${catalogId}-${band.Id}-${index}`
    // const showBandSongCatalog = openedCatalogs.some( catalog=> catalog.id === BandSongCatalog.GetCatalogId(band.Id))

    return (
        <Container>
            <SongNodeContainer >
                <Row>
                    <Col xs="8">
                        <label>{band.Title}</label>
                    </Col >
                    <Col xs="4">
                        {!selectedNode && <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="AddBand" onClick={handleShowBandSongsCatalog} >Show Band Songs</MenuItem>
                            <MenuItem value="AddBand" onClick={handleShowBandSongsModal} >Show Band Songs</MenuItem>

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadBand} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditBand} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteBand} >{ModalTypes.Remove}</MenuItem>
                        </Menu>}
                        {
                            selectedNode && <div>
                                <Col>
                                    <Button variant="secondary" onClick={handleAddSongToCatalog}>Hinzufügen</Button>
                                </Col>
                                <Col>
                                    <AsyncButtonComponent asyncExecute={CreateBandSongAsync} value={createBandSong()} defaultState='INITIAL' />
                                </Col>
                            </div>
                        }

                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
};

export default BandCatalogNodeComponent;
