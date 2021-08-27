import React from "react";
import { History } from 'history'

import { Container, Row, Col, Button } from "react-bootstrap";
import {
    Menu,
    MenuItem,
    MenuDivider,
    MenuHeader
} from '@szhsin/react-menu';

import { DefaultLabelStyle, DefaultNodeImageStyle, DefaultNodeWrapperStyle } from "styles";
import { IBand, ModalTypes, IModalActionsProps } from "models";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    history: History

    setModal(props: IModalActionsProps): void

    setBandIdForBandSong(bandId: string): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {
        band,
        index,
        setModal,
        history,
        setBandIdForBandSong,
    } = props;

    const createModal = (type: ModalTypes, pathName: string = '/', isModal: boolean = true) => {

        setModal({ showModal: true })

        if (type === ModalTypes.ShowCatalog)
            setBandIdForBandSong(band.Id)

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${band.Id}`,
            state: isModal ? { background: history.location } : undefined //display as catalog in main window
        })
    }

    const handleShowEditBand = () => createModal(ModalTypes.Edit, `/bandModal`)
    const handleShowReadBand = () => createModal(ModalTypes.Read, `/bandModal`)
    const handleShowDeleteBand = () => createModal(ModalTypes.Remove, `/bandModal`)
    const handleShowBandSongsCatalog = () => createModal(ModalTypes.ShowCatalog, '/bandSongAsCatalog', false)

    // // die variante als modal bleibt erstmal drinne, falls es dafür nochmal ne verwendung geben sollte (25.08.2021)
    // const handleShowBandSongsModal = () => createModal(ModalTypes.ShowCatalog, '/bandSongAsModal')



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
                                        <DefaultLabelStyle>{band.Title}</DefaultLabelStyle>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col >
                    <Col xs="2">
                        <Menu menuButton={<Button variant="secondary" >Menu</Button>}>
                            <MenuItem value="ShowBandSongs" onClick={handleShowBandSongsCatalog} >Show Band Songs</MenuItem>

                            <MenuDivider />

                            <MenuHeader>Edit</MenuHeader>
                            <MenuItem value="Read" onClick={handleShowReadBand} >{ModalTypes.Read}</MenuItem>
                            <MenuItem value="Edit" onClick={handleShowEditBand} >{ModalTypes.Edit}</MenuItem>
                            <MenuItem value="Remove" onClick={handleShowDeleteBand} >{ModalTypes.Remove}</MenuItem>
                        </Menu>
                    </Col>
                </Row>
            </Container>

        </DefaultNodeWrapperStyle >

    );
};

export default BandCatalogNodeComponent;
