import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col, Row, Navbar, FormControl, Nav, NavDropdown, Container, InputGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";



import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong, ISongFilter, ISongActionProps, IFilterSongActionProps, INextLinkActionProps, IModal, ModalTypes } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration, FilterSongHtmlAttributesConfiguration, SongCatalogHtmlAttributesConfiguration } from "../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../styles";
import { Song, FilterSongActionProps } from "../mapping";
import { SongFilterComponent, ISongFilterProps } from "./filters/songFilter";

export interface ISongCatalogProps {
    songlist: ISongCatalog;
    showModal: boolean;

    fetchSongCatalog(props: IFilterSongActionProps): void
    fetchSongCatalogNextLink: (props: INextLinkActionProps) => void

    setSongModal(props: IModal): void
    // DeleteSongAsync(songId: string): Promise<ISong>;

    // AddSongToMainListState: (songListId: string, newSong: ISong) => void;
    // RemoveSongFromMainListState(songListId: string, songId: string): void;
}

const SongCatalogComponent = (props: ISongCatalogProps): JSX.Element => {
    const {
        songlist,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        setSongModal,
        showModal
        // AddSongToMainListState,
        // RemoveSongFromMainListState,
        // DeleteSongAsync
    } = props;

    useEffect(() => {
        const filter = FilterSongActionProps.CreateFromSongCatalog(songlist)

        fetchSongCatalog(filter)
    }, []);


    const songCatalogDef = SongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { Id, OData } = songlist
        const actionProps: INextLinkActionProps = { CatalogId: Id, NextLink: OData.NextLink }

        setTimeout(() => {
            fetchSongCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddSong = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModal = {
            show: elements[songCatalogDef.ShowAddSongCheckBox.ControlId].checked,
            catalogId: songlist.Id,
            type: ModalTypes.New,
            song: Song.EmptySong()
        }

        setSongModal(modal)
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
                                                        setSongModal={setSongModal}
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
