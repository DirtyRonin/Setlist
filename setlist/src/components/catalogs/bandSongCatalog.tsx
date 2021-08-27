import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps } from "models";
import { FilterBandSongActionProps } from "mapping";
import { BandSongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import { BandSongCatalogProps } from "store/containers/catalogs/BandSongCatalogContainer";
import { BandSongFilterComponent } from "components/filters";
import BandSongCatalogNodeComponent from "components/nodes/bandSongCatalogNode";

const BandSongCatalogComponent = (props: BandSongCatalogProps): JSX.Element => {

    const {
        bandSongCatalog,
        setBandSongFilter,
        fetchBandSongCatalog,
        fetchBandSongCatalogNextLink,
        setModal,
        history
    } = props

    useEffect(() => {
        const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongCatalog)
        fetchBandSongCatalog(filter)
    }, []);

    useEffect(() => {
        if (bandSongCatalog.Refresh) {
            const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongCatalog)
            fetchBandSongCatalog(filter)
        }

    }, [bandSongCatalog.Refresh]);

    const bandSongCatalogDef = BandSongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { OData } = bandSongCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandSongCatalogNextLink(actionProps)
        }, 500);

    }

    return <div >

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                                <NodeListCss id={bandSongCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{bandSongCatalog.Title}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={bandSongCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={bandSongCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <BandSongFilterComponent
                                                            bandId={bandSongCatalog.BandId}
                                                            filter={bandSongCatalog.Filter}
                                                            setBandSongFilter={setBandSongFilter}
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
                                                key={bandSong.Id}
                                                setModal={setModal}
                                                history={history}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
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