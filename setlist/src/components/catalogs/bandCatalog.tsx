import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Col, Row, Navbar, Container, FormControlProps, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps } from "../../models";
import { BandCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { FilterBandActionProps, Band } from "../../mapping";
import BandCatalogNodeComponent from "../nodes/bandCatalogNode";
import { IModalBand } from "../../models/modals/modelBand";
import { BandFilterComponent } from "../filters";
import { BandCatalogProps } from "../../store/containers/catalogs/BandCatalogContainer";

const BandCatalogComponent = (props: BandCatalogProps): JSX.Element => {
    const {
        bandlist,
        showModal,
        openedCatalogs,
        fetchBandCatalog,
        fetchBandCatalogNextLink,
        // openBandSongsCatalog,
        // closeBandSongsCatalog,
        openBandSongsCatalog,
        pushCatalogsOrder,
        setModal,
        addToBandSongsAction,
        ownNodeProps
    } = props;

    useEffect(() => {
        const filter = FilterBandActionProps.CreateFromCatalog(bandlist)

        fetchBandCatalog(filter)
    }, []);


    const bandCatalogDef = BandCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { Id, OData } = bandlist
        const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddBand = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalBand = {
            show: elements[bandCatalogDef.ShowAddBandCheckBox.ControlId].checked,
            catalogId: bandlist.Id,
            catalogType: CatalogTypes["Band Catalog"],
            type: "New",
            value: Band.EmptyBand()
        }

        const order:  IComponentOrderActionProps = {
            ComponentOrder:{
                value:modal,
                id:modal.catalogId,
                displayIn: DisplayIn.Modal
            } as IComponentOrder
        }

        pushCatalogsOrder(order)
    }

    

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={bandlist.Id}>
                        <Row>
                            <Col>
                                <Droppable droppableId={bandlist.Id}>
                                    {provided => (
                                        <NodeListCss id={bandCatalogDef.NodeList.ControlId} ref={provided.innerRef} {...provided.droppableProps}>
                                            <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                                <Navbar.Brand >{bandlist.Title}</Navbar.Brand>

                                                <Navbar.Toggle aria-controls={bandCatalogDef.Navbar.ControlId} />
                                                <Navbar.Collapse id={bandCatalogDef.Navbar.ControlId}>
                                                    <Row>
                                                        <Col sm="6">
                                                            <SongFilterCss>
                                                                <BandFilterComponent
                                                                    CatalogId={bandlist.Id}
                                                                    Filter={bandlist.Filter}
                                                                    FetchBandCatalog={fetchBandCatalog}
                                                                />
                                                            </SongFilterCss>
                                                        </Col>
                                                        <Col sm="6">
                                                            <Form onChange={handleShowAddBand}>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId={bandCatalogDef.ShowAddBandCheckBox.ControlId}>
                                                                        <Form.Check type="switch" checked={showModal} label={bandCatalogDef.ShowAddBandCheckBox.Label} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form>
                                                            
                                                        </Col>
                                                    </Row>
                                                </Navbar.Collapse>

                                            </Navbar>

                                            <InfiniteScroll
                                                dataLength={bandlist.Values.size}
                                                next={handleScrollDown}
                                                hasMore={bandlist.Values.size < bandlist.OData.Count}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{ textAlign: 'center' }}>
                                                        <b>Yay! You have seen it all</b>
                                                    </p>
                                                }
                                                scrollableTarget={bandCatalogDef.NodeList.ControlId}
                                            >
                                                {Array.from(bandlist.Values.values()).map((band, index) => (
                                                    <BandCatalogNodeComponent
                                                    openBandSongsCatalog={openBandSongsCatalog}
                                                    addToBandSongsAction={addToBandSongsAction}
                                                    ownNodeProps={ownNodeProps}
                                                    band={band}
                                                    index={index}
                                                    catalogId={bandlist.Id}
                                                    openedCatalogs = {openedCatalogs}
                                                    // openBandSongsCatalog = {openBandSongsCatalog}
                                                    // closeBandSongsCatalog = {closeBandSongsCatalog}
                                                    setModal={setModal}
                                                    key={band.Id}
                                                    />
                                                ))}
                                            </InfiniteScroll>

                                            {provided.placeholder}
                                        </NodeListCss>
                                    )}
                                </Droppable>
                                {bandlist.OData.Count}
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>


            </Row>
        </Container>

    );
};

export default BandCatalogComponent;
