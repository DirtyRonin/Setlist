import React from "react";
import { Container, Row, Col, Button, FormControlProps, Form } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { SongNodeContainer } from "../../styles";
import { IBand, IModal, ModalTypes, CatalogType, IStatusBandSongCatalogActionProps } from "../../models";
import { IModalBand } from "../../models/modals/modelBand";
import { BandCatalogNodeHtmlAttributesConfiguration } from "../../Configuration";
import { BandSongCatalog } from "../../mapping";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    catalogId: string;
    openedCatalogs: string[];
    showBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    closeBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    setModal(props: IModal): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const { 
        band,
        index,
        catalogId,
        openedCatalogs,
        showBandSongsCatalog,
        closeBandSongsCatalog,
        setModal
    } = props;

    const bandCatalogNodeDef = BandCatalogNodeHtmlAttributesConfiguration;

    const createModal = (type: ModalTypes) => {
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogType.Band,
            type,
            value: band
        }
        setModal(modal)
    }

    const concatUniqueID = (htmlElementId: string) : string => `${htmlElementId}_${band.Id}`

    const handleShowBandSongCatalog = (event: React.FormEvent<FormControlProps>) => {


        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[concatUniqueID(bandCatalogNodeDef.ShowBandSongCatalogCheckBox.ControlId)].checked

        const props: IStatusBandSongCatalogActionProps = { show, parentId: band.Id, catalogType: CatalogType.BandSong }

        if (props.show) {
            showBandSongsCatalog(props);
        }else{
            closeBandSongsCatalog(props);
        }


    }

    const handleShowEditSong = () => createModal(ModalTypes.Edit)
    const handleShowReadSong = () => createModal(ModalTypes.Read)
    const handleShowDeleteSong = () => createModal(ModalTypes.Remove)

    const uniqueNodeId = `${catalogId}-${band.Id}-${index}`
    const showBandSongCatalog = openedCatalogs.includes(BandSongCatalog.GetCatalogId(band.Id))

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{band.Title}</label>
                            </Col>
                            <Col>
                                <Form onChange={handleShowBandSongCatalog}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId={concatUniqueID(bandCatalogNodeDef.ShowBandSongCatalogCheckBox.ControlId)}>
                                            <Form.Check type="switch" checked={showBandSongCatalog} label={bandCatalogNodeDef.ShowBandSongCatalogCheckBox.Label} />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowReadSong}>{ModalTypes.Read}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowEditSong}>{ModalTypes.Edit}</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={handleShowDeleteSong}>{ModalTypes.Remove}</Button>
                            </Col>
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default BandCatalogNodeComponent;
