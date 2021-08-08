import React from "react";
import { useEffect } from "react";
import { Col, Container, Navbar, Row, Form, FormControlProps } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { SetlistSongCatalogHtmlAttributesConfiguration } from "../../Configuration";

import { FilterSetlistSongActionProps } from "../../mapping";
import { SetlistSongCatalogProps } from "../../store/containers/catalogs/SetlistSongCatalogContainer";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { SetlistSongFilterComponent } from "../filters";
import SetlistSongCatalogNodeComponent from "../nodes/setlistSongCatalogNode";

const SetlistSongCatalogComponent = (props: SetlistSongCatalogProps): JSX.Element => {

    const {
        setlistSongCatalog,
        showModal,

        pushCatalogsOrder,
        setSetlistSongFilter,
        fetchSetlistSongCatalog
    } = props

    useEffect(() => {
        if (setlistSongCatalog.Refresh) {
            const filter = FilterSetlistSongActionProps.CreateFromCatalog(setlistSongCatalog)
            fetchSetlistSongCatalog(filter)
        }
    }, [setlistSongCatalog.Refresh])

    const setlistSongCatalogDef = SetlistSongCatalogHtmlAttributesConfiguration

    const handleScrollDown = () => { }

    return <div>
        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={setlistSongCatalog.Id}>
                        <Row>
                            <Col>
                                <NodeListCss id={setlistSongCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{setlistSongCatalog.Title}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={setlistSongCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={setlistSongCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <SetlistSongFilterComponent
                                                            CatalogId={setlistSongCatalog.Id}
                                                            Filter={setlistSongCatalog.Filter}
                                                            setSetlistSongFilter={setSetlistSongFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    {/* <Form onChange={handleShowAddSetlist}>
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId={setlistSongCatalogDef.ShowAddSetlistCheckBox.ControlId}>
                                                                        <Form.Check type="switch" checked={showModal} label={setlistSongCatalogDef.ShowAddSetlistCheckBox.Label} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form> */}

                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>

                                    </Navbar>

                                    <InfiniteScroll
                                        dataLength={setlistSongCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={setlistSongCatalog.Values.size < setlistSongCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={setlistSongCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(setlistSongCatalog.Values.values()).map((setlistSong, index) => (
                                            <SetlistSongCatalogNodeComponent
                                                setlistSong={setlistSong}
                                                index={index}
                                                catalogId={setlistSongCatalog.Id}
                                                pushCatalogsOrder={pushCatalogsOrder}
                                                key={setlistSong.Id}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {setlistSongCatalog.OData.Count}
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>


            </Row>
        </Container>
    </div>
}

export default SetlistSongCatalogComponent