import React from "react";
import { Container, Row, Col, Button, FormControlProps, Form } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

import { SongNodeContainer } from "../../styles";
import { IBand, IModal, ModalTypes, CatalogTypes, IStatusBandSongCatalogActionProps, DisplayIn, NodeTypes, ISong, IBandSongEntityActionProps, IBandSong, IComponentOrder, IComponentOrderActionProps } from "../../models";
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
    // openedCatalogs: IComponentOrder[];
    // ownNodeProps?: {
    //     songCatalogId: string
    //     song: ISong
    // },
    selectedNode?: ISong




    // addValueToCatalog(props: IBandEntityActionProps): void

    // openBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    // closeBandSongsCatalog(props: IStatusBandSongCatalogActionProps): void
    pushCatalogsOrder: (props: IComponentOrderActionProps) => void
    addToBandSongsAction(props: IBandSongEntityActionProps): void
    // setModal(props: IModal): void
    openBandSongsCatalog(bandId:string): void
}

const BandCatalogNodeComponent = (props: IBandNodeProps): JSX.Element => {
    const {
        band,
        index,
        catalogId,
        pushCatalogsOrder,
        // openedCatalogs,
        openBandSongsCatalog,
        // closeBandSongsCatalog,
        // setModal,
        addToBandSongsAction,
        selectedNode

        // addValueToCatalog: addToThisCatalog
    } = props;

    const bandCatalogNodeDef = BandCatalogNodeHtmlAttributesConfiguration;

    const createModal = (type: ModalTypes) => {
        const modal: IModalBand = {
            show: true,
            catalogId,
            catalogType: CatalogTypes["Band Catalog"],
            type,
            value: band,
            catalogInModal:CatalogTypes["None"]
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

    const handleShowBandSongCatalog = (event: React.FormEvent<FormControlProps>) => {


        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[concatUniqueID(bandCatalogNodeDef.ShowBandSongCatalogCheckBox.ControlId)].checked

        const catalogId = BandSongCatalog.GetCatalogId(band.Id)

        const props: IStatusBandSongCatalogActionProps = { show, bandId: band.Id, catalogType: CatalogTypes["BandSong Catalog"], catalogId, displayIn: DisplayIn.Main, nodeType: NodeTypes.Edit }

        // openBandSongsCatalog(props)
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
    const handleShowBandSongs = () => createModal(ModalTypes.ShowCatalog)

    const uniqueNodeId = `${catalogId}-${band.Id}-${index}`
    // const showBandSongCatalog = openedCatalogs.some( catalog=> catalog.id === BandSongCatalog.GetCatalogId(band.Id))

    return (
        <Draggable draggableId={uniqueNodeId} index={index}>
            {provided => (
                <Container>
                    <SongNodeContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row>
                            <Col >
                                <label>{band.Title}</label>
                            </Col>
                            {!selectedNode && <div>
                                <Col>
                                    <Form onChange={handleShowBandSongCatalog}>
                                        <Form.Row>
                                            <Form.Group as={Col} controlId={concatUniqueID(bandCatalogNodeDef.ShowBandSongCatalogCheckBox.ControlId)}>
                                                {/* <Form.Check type="switch" checked={showBandSongCatalog} label={bandCatalogNodeDef.ShowBandSongCatalogCheckBox.Label} /> */}
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={handleShowReadBand}>{ModalTypes.Read}</Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={handleShowEditBand}>{ModalTypes.Edit}</Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={handleShowDeleteBand}>{ModalTypes.Remove}</Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={handleShowBandSongs}>{ModalTypes.ShowCatalog}</Button>
                                </Col>
                            </div>
                            }{
                                selectedNode && <div>
                                    <Col>
                                        <Button variant="secondary" onClick={handleAddSongToCatalog}>Hinzufügen</Button>
                                    </Col>
                                    <Col>
                                        <AsyncButtonComponent asyncExecute={CreateBandSongAsync} value={createBandSong()} defaultState='INITIAL' />
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
