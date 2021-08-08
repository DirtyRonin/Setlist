import React, { useEffect } from "react";

import { Form, FormControlProps, Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, IModalSong, CatalogTypes, IComponentOrderActionProps, IComponentOrder, DisplayIn } from "../../models";
import { FilterSongActionProps, Song } from "../../mapping";
import { SongCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { SongFilterComponent } from "../filters";
import SongCatalogNodeComponent from "../nodes/songCatalogNode";
import { SongCatalogProps } from "../../store/containers/catalogs/SongCatalogContainer";

const SongCatalogComponent = (props: SongCatalogProps): JSX.Element => {
    const {
        songCatalog,
        setSongFilter,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        pushCatalogsOrder,

        showModal
    } = props;

    useEffect(() => {
        if (songCatalog.Refresh) {
            const filter = FilterSongActionProps.CreateFromSongCatalog(songCatalog)
            fetchSongCatalog(filter)
        }
    }, [songCatalog.Refresh]);


    const songCatalogDef = SongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { Id, OData } = songCatalog
        const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            fetchSongCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddSong = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalSong = {
            show: elements[songCatalogDef.ShowAddSongCheckBox.ControlId].checked,
            catalogId: songCatalog.Id,
            catalogType: CatalogTypes["Song Catalog"],
            type: "New",
            value: Song.EmptySong(),
            catalogInModal: CatalogTypes["None"]
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

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={songCatalog.Id}>
                        <Row>
                            <Col>
                                <NodeListCss id={songCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{songCatalog.Title}</Navbar.Brand>
                                        <Navbar.Toggle aria-controls={songCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={songCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <SongFilterComponent
                                                            CatalogId={songCatalog.Id}
                                                            Filter={songCatalog.Filter}
                                                            FetchSongCatalog={setSongFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    <Form onChange={handleShowAddSong}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={songCatalogDef.ShowAddSongCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={songCatalogDef.ShowAddSongCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>
                                    </Navbar>
                                    <InfiniteScroll
                                        dataLength={songCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={songCatalog.Values.size < songCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={songCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(songCatalog.Values.values()).map((song, index) => (
                                            <SongCatalogNodeComponent
                                                pushCatalogsOrder={pushCatalogsOrder}
                                                songListId={songCatalog.Id}
                                                key={song.Id}
                                                song={song}
                                                index={index}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {songCatalog.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default SongCatalogComponent;
