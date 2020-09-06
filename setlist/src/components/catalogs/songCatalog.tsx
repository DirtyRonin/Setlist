import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { ISongCatalog, IFilterSongActionProps, INextLinkActionProps, IModal, IModalSong, CatalogType, ModalTypes } from "../../models";
import { FilterSongActionProps, Song } from "../../mapping";
import { SongCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { SongFilterComponent } from "../filters";
import SongCatalogNodeComponent from "../nodes/songCatalogNode";
import { SongCatalogProps } from "../../store/containers/catalogs/SongCatalogContainer";

// export interface ISongCatalogProps {
//     songlist: ISongCatalog;
//     showModal: boolean;

//     fetchSongCatalog(props: IFilterSongActionProps): void
//     fetchSongCatalogNextLink: (props: INextLinkActionProps) => void

//     setModal(props: IModal): void
// }

const SongCatalogComponent = (props: SongCatalogProps): JSX.Element => {
    const {
        songlist,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        setModal,
        showModal
    } = props;

    useEffect(() => {
        const filter = FilterSongActionProps.CreateFromSongCatalog(songlist)

        fetchSongCatalog(filter)
    }, []);


    const songCatalogDef = SongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { Id, OData } = songlist
        const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            fetchSongCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddSong = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalSong = {
            show: elements[songCatalogDef.ShowAddSongCheckBox.ControlId].checked,
            catalogId: songlist.Id,
            catalogType: CatalogType.Song,
            type: "New",
            value: Song.EmptySong()
        }

        setModal(modal)
    }

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={songlist.Id}>
                        <Row>
                            <Col>
                                <Droppable droppableId={songlist.Id}>
                                    {provided => (
                                        <NodeListCss id={songCatalogDef.NodeList.ControlId} ref={provided.innerRef} {...provided.droppableProps}>
                                            <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                                <Navbar.Brand >{songlist.Title}</Navbar.Brand>
                                                <Navbar.Toggle aria-controls={songCatalogDef.Navbar.ControlId} />
                                                <Navbar.Collapse id={songCatalogDef.Navbar.ControlId}>
                                                    <Row>
                                                        <Col sm="6">
                                                            <SongFilterCss>
                                                                <SongFilterComponent
                                                                    CatalogId={songlist.Id}
                                                                    Filter={songlist.Filter}
                                                                    FetchSongCatalog={fetchSongCatalog}
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
                                                dataLength={songlist.Values.size}
                                                next={handleScrollDown}
                                                hasMore={songlist.Values.size < songlist.OData.Count}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{ textAlign: 'center' }}>
                                                        <b>Yay! You have seen it all</b>
                                                    </p>
                                                }
                                                scrollableTarget={songCatalogDef.NodeList.ControlId}
                                            >
                                                {Array.from(songlist.Values.values()).map((song, index) => (
                                                    <SongCatalogNodeComponent
                                                        setSongModal={setModal}
                                                        songListId={songlist.Id}
                                                        key={song.Id}
                                                        song={song}
                                                        index={index}
                                                    />
                                                ))}
                                            </InfiniteScroll>

                                            {provided.placeholder}
                                        </NodeListCss>
                                    )}
                                </Droppable>
                                {songlist.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default SongCatalogComponent;
