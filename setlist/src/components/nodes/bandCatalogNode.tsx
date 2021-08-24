import React from "react";
import {History} from 'history'

import { Container, Row, Col, Button } from "react-bootstrap";
import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

import { SongNodeContainer } from "../../styles";
import { IBand, ModalTypes, CatalogTypes, DisplayIn, IBandSongEntityActionProps, IComponentOrder, IComponentOrderActionProps, IModalActionsProps } from "models";
import { IModalBand } from "../../models/modals/modelBand";
import { BandCatalogNodeHtmlAttributesConfiguration } from "configuration";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    catalogId: string;
    history: History
    
    setModal(props: IModalActionsProps): void

    addToBandSongsAction(props: IBandSongEntityActionProps): void
    openBandSongsCatalog(bandId: string): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {
        band,
        index,
        catalogId,
        setModal,
        history,

        openBandSongsCatalog,
        addToBandSongsAction,
    } = props;

    const bandCatalogNodeDef = BandCatalogNodeHtmlAttributesConfiguration;

    const createModal = (type: ModalTypes, catalogInModal: CatalogTypes = CatalogTypes["None"]) => {
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Band Catalog"],
            type,
            value: band,
            catalogInModal
        }

        setModal({ modal, routePath: '/bandModal' })

        history.push({
            pathname: `/bandModal`,
            // search:'?type=song',
            state: { background: history.location }
        })
    }

    const concatUniqueID = (htmlElementId: string): string => `${htmlElementId}_${band.Id}`

    const handleShowBandSongCatalog = () => {
        openBandSongsCatalog(band.Id)
    }

    const handleShowEditBand = () => createModal(ModalTypes.Edit)
    const handleShowReadBand = () => createModal(ModalTypes.Read)
    const handleShowDeleteBand = () => createModal(ModalTypes.Remove)
    const handleShowBandSongsCatalog = () => handleShowBandSongCatalog()
    const handleShowBandSongsModal = () => createModal(ModalTypes.ShowCatalog, CatalogTypes["BandSong Catalog"])

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
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="AddBand" onClick={handleShowBandSongsCatalog} >Show Band Songs</MenuItem>
                            <MenuItem value="AddBand" onClick={handleShowBandSongsModal} >Show Band Songs Modal</MenuItem>

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadBand} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditBand} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteBand} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>

                </Row>
            </SongNodeContainer>
        </Container>
    );
};

export default BandCatalogNodeComponent;
