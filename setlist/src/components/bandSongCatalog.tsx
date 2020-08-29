import React, { useEffect } from "react";

import { Col, Row, Navbar, Container, FormControlProps, Form } from "react-bootstrap";
import { IBandSongCatalog, IFilterBandActionProps, INextLinkActionProps, IModal } from "../models";
import { FilterBandSongActionProps } from "../mapping";
import { ContainerCss, NodeListCss, SongFilterCss } from "../styles";
import { Droppable } from "react-beautiful-dnd";
import { BandSongCatalogHtmlAttributesConfiguration } from "../Configuration";
import InfiniteScroll from "react-infinite-scroll-component";
import BandSongCatalogNodeComponent from "./nodes/bandSongCatalogNode";
import { BandSongFilterComponent } from "./filters/bandSongFilter";

export interface IBandSongCatalogProps{
    bandSongCatalog : IBandSongCatalog;
    showModal: boolean;
    setModal(props: IModal): void

    fetchBandSongCatalog(props: IFilterBandActionProps): void
    fetchBandSongCatalogNextLink: (props: INextLinkActionProps) => void
}

const BandSongCatalogComponent = (props : IBandSongCatalogProps) : JSX.Element => {

    const {
        bandSongCatalog,
        showModal,
        setModal,
        // openedCatalogs,
        fetchBandSongCatalog,
        fetchBandSongCatalogNextLink
    } = props

    useEffect(() => {
        const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongCatalog)

        fetchBandSongCatalog(filter)
    }, []);

    const bandSongCatalogDef = BandSongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { Id, OData } = bandSongCatalog
        const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandSongCatalogNextLink(actionProps)
        }, 500);

    }

    return <div >

<Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={bandSongCatalog.Id}>
                        <Row>
                            <Col>
                                <Droppable droppableId={bandSongCatalog.Id}>
                                    {provided => (
                                        <NodeListCss id={bandSongCatalogDef.NodeList.ControlId} ref={provided.innerRef} {...provided.droppableProps}>
                                            <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                                <Navbar.Brand >{bandSongCatalog.Title}</Navbar.Brand>

                                                <Navbar.Toggle aria-controls={bandSongCatalogDef.Navbar.ControlId} />
                                                <Navbar.Collapse id={bandSongCatalogDef.Navbar.ControlId}>
                                                    <Row>
                                                        <Col sm="6">
                                                            <SongFilterCss>
                                                                <BandSongFilterComponent
                                                                    bandId={bandSongCatalog.BandId}
                                                                    Filter={bandSongCatalog.Filter}
                                                                    fetchBandSongCatalog={fetchBandSongCatalog}
                                                                />
                                                            </SongFilterCss>
                                                        </Col>
                                                        <Col sm="6">
                                                            {/* <Form onChange={handleShowAddBand}>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId={bandSongCatalogDef.ShowAddBandCheckBox.ControlId}>
                                                                        <Form.Check type="switch" checked={showModal} label={bandSongCatalogDef.ShowAddBandCheckBox.Label} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form> */}
                                                            
                                                        </Col>
                                                    </Row>
                                                </Navbar.Collapse>

                                            </Navbar>

                                            <InfiniteScroll
                                                dataLength={bandSongCatalog.Values.size}
                                                next={handleScrollDown}
                                                hasMore={bandSongCatalog.Values.size < bandSongCatalog.OData.Count}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{ textAlign: 'center' }}>
                                                        <b>Yay! You have seen it all</b>
                                                    </p>
                                                }
                                                scrollableTarget={bandSongCatalogDef.NodeList.ControlId}
                                            >
                                                {Array.from(bandSongCatalog.Values.values()).map((bandSong, index) => (
                                                    <BandSongCatalogNodeComponent
                                                    bandSong={bandSong}
                                                    index={index}
                                                    bandSongCatalogId={bandSongCatalog.Id}
                                                    setModal={setModal}
                                                    key={bandSong.Id}
                                                    />
                                                ))}
                                            </InfiniteScroll>

                                            {provided.placeholder}
                                        </NodeListCss>
                                    )}
                                </Droppable>
                                {bandSongCatalog.OData.Count}
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>


            </Row>
        </Container>

        
    </div>
}

export default BandSongCatalogComponent;