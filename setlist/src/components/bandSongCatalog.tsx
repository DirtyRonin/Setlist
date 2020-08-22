import React, { useEffect } from "react";

import { Col, Row, Navbar, Container, FormControlProps, Form } from "react-bootstrap";
import { IBandSongCatalog, IFilterBandActionProps, INextLinkActionProps } from "../models";
import { FilterBandSongActionProps } from "../mapping";
import { ContainerCss, NodeListCss, SongFilterCss } from "../styles";
import { Droppable } from "react-beautiful-dnd";
import { BandSongCatalogHtmlAttributesConfiguration } from "../Configuration";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IBandSongCatalogProps{
    bandSongList : IBandSongCatalog;
    showModal: boolean;
    // openedCatalogs: string[];

    fetchBandSongCatalog(props: IFilterBandActionProps): void
    // fetchCatalogNextLink: (props: INextLinkActionProps) => void
}

const BandSongCatalogComponent = (props : IBandSongCatalogProps) : JSX.Element => {

    const {
        bandSongList,
        showModal,
        // openedCatalogs,
        fetchBandSongCatalog,
        // fetchCatalogNextLink
    } = props

    useEffect(() => {
        const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongList)

        fetchBandSongCatalog(filter)
    }, []);

    const bandSongCatalogDef = BandSongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        // values from bandCatalog --> Change

        // const { Id, OData } = bandlist
        // const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        // setTimeout(() => {
        //     fetchCatalogNextLink(actionProps)
        // }, 500);

    }

    return <div >

<Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={bandSongList.Id}>
                        <Row>
                            <Col>
                                <Droppable droppableId={bandSongList.Id}>
                                    {provided => (
                                        <NodeListCss id={bandSongCatalogDef.NodeList.ControlId} ref={provided.innerRef} {...provided.droppableProps}>
                                            <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                                <Navbar.Brand >{bandSongList.Title}</Navbar.Brand>

                                                <Navbar.Toggle aria-controls={bandSongCatalogDef.Navbar.ControlId} />
                                                <Navbar.Collapse id={bandSongCatalogDef.Navbar.ControlId}>
                                                    <Row>
                                                        <Col sm="6">
                                                            <SongFilterCss>
                                                                {/* <BandFilterComponent
                                                                    CatalogId={bandSongList.Id}
                                                                    Filter={bandSongList.Filter}
                                                                    FetchBandCatalog={fetchBandCatalog}
                                                                /> */}
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
                                                dataLength={bandSongList.Values.size}
                                                next={handleScrollDown}
                                                hasMore={bandSongList.Values.size < bandSongList.OData.Count}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{ textAlign: 'center' }}>
                                                        <b>Yay! You have seen it all</b>
                                                    </p>
                                                }
                                                scrollableTarget={bandSongCatalogDef.NodeList.ControlId}
                                            >
                                                {Array.from(bandSongList.Values.values()).map((bandsong, index) => (
                                                        bandsong.Title 

                                                    // <BandCatalogNodeComponent
                                                    // band={band}
                                                    // index={index}
                                                    // catalogId={bandSongList.Id}
                                                    // openedCatalogs = {openedCatalogs}
                                                    // showBandSongsCatalog = {showBandSongsCatalog}
                                                    // setModal={setModal}
                                                    // key={band.Id}
                                                    // />
                                                ))}
                                            </InfiniteScroll>

                                            {provided.placeholder}
                                        </NodeListCss>
                                    )}
                                </Droppable>
                                {bandSongList.OData.Count}
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>


            </Row>
        </Container>

        
    </div>
}

export default BandSongCatalogComponent;