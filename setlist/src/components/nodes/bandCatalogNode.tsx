import React from "react";
import { Container, Row, Col, Button, FormControlProps, Form } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { SongNodeContainer } from "../../styles";
import { IBand, IModal, ModalTypes, CatalogTypes, IStatusBandSongCatalogActionProps, DisplayIn, NodeTypes, IBandEntityActionProps, IEntityActionProps, ISong, IBandSongEntityActionProps, IBandSong, IComponentOrderActionProps, IComponentOrder, IBandSongCatalog } from "../../models";
import { IModalBand } from "../../models/modals/modelBand";
import { BandCatalogNodeHtmlAttributesConfiguration } from "../../Configuration";
import { BandSongCatalog, BandSong } from "../../mapping";
import { GUID_EMPTY } from "../../Util";

export interface IBandNodeProps {
    band: IBand;
    index: number;
    catalogId: string;
    openedCatalogs: string[];
    ownNodeProps?: {
        songCatalogId: string
        song: ISong
    }


    // addValueToCatalog(props: IBandEntityActionProps): void

    // openBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    // closeBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    // pushCatalogsOrder: (props: IComponentOrderActionProps) => void
    addToBandSongsAction(props: IBandSongEntityActionProps): void
    setModal(props: IModal): void
    openBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {
        band,
        index,
        catalogId,
        openedCatalogs,
        openBandSongsCatalog,
        // closeBandSongsCatalog,
        setModal,
        addToBandSongsAction,
        ownNodeProps

        // addValueToCatalog: addToThisCatalog
    } = props;

    const bandCatalogNodeDef = BandCatalogNodeHtmlAttributesConfiguration;

    const createModal = (type: ModalTypes) => {
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Band Catalog"],
            type,
            value: band
        }
        setModal(modal)
    }

    const concatUniqueID = (htmlElementId: string): string => `${htmlElementId}_${band.Id}`

    const handleShowBandSongCatalog = (event: React.FormEvent<FormControlProps>) => {


        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[concatUniqueID(bandCatalogNodeDef.ShowBandSongCatalogCheckBox.ControlId)].checked

        const catalogId = BandSongCatalog.GetCatalogId(band.Id)

        const props: IStatusBandSongCatalogActionProps = { show, bandId: band.Id, catalogType: CatalogTypes["BandSong Catalog"], catalogId, displayIn: DisplayIn.Main, nodeType: NodeTypes.Edit }

        openBandSongsCatalog(props)

    }

    const handleAddSongToCatalog = () => {

        if (ownNodeProps) {
            const bandSong = { ...BandSong.EmptyBandSong(), Id: GUID_EMPTY, BandId: band.Id, SongId: ownNodeProps.song.Id } as IBandSong
            // catalogId: 'Band Song Catalog Id'
            addToBandSongsAction({ value: bandSong, catalogId: BandSongCatalog.GetCatalogId(band.Id) } as IBandSongEntityActionProps)
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
                            {!ownNodeProps && <div>
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
                            </div>
                            }{
                                ownNodeProps && <div>
                                    <Col>
                                        <Button variant="secondary" onClick={handleAddSongToCatalog}>Hinzufügen</Button>
                                    </Col>
                                </div>
                            }
                        </Row>
                    </SongNodeContainer>
                </Container>
            )}
        </Draggable>
    );
};

export default BandCatalogNodeComponent;
