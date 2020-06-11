import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col, Row, Navbar, FormControl, Nav, NavDropdown, Container, InputGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";



import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong, ISongFilter, ISongActionProps, IFilterSongActionProps, INextLinkActionProps, IModal, ModalTypes, IBandCatalog, IFilterBandActionProps } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration, FilterSongHtmlAttributesConfiguration, SongCatalogHtmlAttributesConfiguration, BandCatalogHtmlAttributesConfiguration } from "../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../styles";
import { Song, FilterSongActionProps, FilterBandActionProps } from "../mapping";
import { SongFilterComponent, ISongFilterProps } from "./filters/songFilter";

export interface IBandCatalogProps {
    bandlist: IBandCatalog;
    showModal: boolean;

    fetchBandCatalog(props: IFilterBandActionProps): void
    // fetchSongCatalogNextLink: (props: INextLinkActionProps) => void

    // setSongModal(props: IModal): void
}

const BandCatalogComponent = (props: IBandCatalogProps): JSX.Element => {
    const {
        bandlist,
        fetchBandCatalog,
        // fetchSongCatalogNextLink,
        // setSongModal,
        showModal
    } = props;

    useEffect(() => {
        const filter = FilterBandActionProps.CreateFromCatalog(bandlist)

        fetchBandCatalog(filter)
    }, []);


    const bandCatalogDef = BandCatalogHtmlAttributesConfiguration;





    const handleScrollDown = () => {
        // const { Id, OData } = bandlist
        // const actionProps: INextLinkActionProps = { CatalogId: Id, NextLink: OData.NextLink }

        // setTimeout(() => {
        //     fetchSongCatalogNextLink(actionProps)
        // }, 500);

    }

    // const handleShowAddSong = (event: React.FormEvent<FormControlProps>) => {
    //     const elements: any = (event.target as any).form.elements;

    //     const modal: IModal = {
    //         show: elements[songCatalogDef.ShowAddSongCheckBox.ControlId].checked,
    //         catalogId: bandlist.Id,
    //         type: ModalTypes.New,
    //         song: Song.EmptySong()
    //     }

    //     setSongModal(modal)
    // }

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
                                                            {/* <SongFilterCss>
                                                                <SongFilterComponent
                                                                    CatalogId={bandlist.Id}
                                                                    Filter={bandlist.Filter}
                                                                    FetchSongCatalog={fetchSongCatalog}
                                                                />
                                                            </SongFilterCss> */}
                                                        </Col>
                                                        <Col sm="6">
                                                            {/* <Form onChange={handleShowAddSong}>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId={bandCatalogDef.ShowAddSongCheckBox.ControlId}>
                                                                        <Form.Check type="switch" checked={showModal} label={bandCatalogDef.ShowAddSongCheckBox.Label} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form> */}
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
                                                    band.Title
                                                    // <SongCatalogNodeComponent
                                                    //     setSongModal={setSongModal}
                                                    //     bandlistId={bandlist.Id}
                                                    //     key={band.Id}
                                                    //     band={band}
                                                    //     index={index}
                                                    // />
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
