import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col, Row, Navbar, FormControl, Nav, NavDropdown, Container, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";



import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong, ISongFilter, INewSongActionProps, IFilterSongActionProps, INextLinkActionProps } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration, FilterSongHtmlAttributesConfiguration, SongCatalogHtmlAttributesConfiguration } from "../Configuration";
import { ContainerCss, TitleCss, NodeListCss, SongFilterCss } from "../styles";
import { Song, FilterSongActionProps } from "../mapping";
import { SongFilterComponent, ISongFilterProps } from "./filters/songFilter";

export interface ISongCatalogProps {
    songlist: ISongCatalog;

    AddSongToCatalog(props: INewSongActionProps): void
    FetchSongCatalog(props: IFilterSongActionProps): void
    FetchSongCatalogNextLink: (props: INextLinkActionProps) => void
    // DeleteSongAsync(songId: string): Promise<ISong>;

    // AddSongToMainListState: (songListId: string, newSong: ISong) => void;
    // RemoveSongFromMainListState(songListId: string, songId: string): void;
}

const SongCatalogComponent = (props: ISongCatalogProps): JSX.Element => {
    const {
        songlist,
        AddSongToCatalog,
        FetchSongCatalog,
        FetchSongCatalogNextLink: fetchSongCatalogNextLink
        // AddSongToMainListState,
        // RemoveSongFromMainListState,
        // DeleteSongAsync
    } = props;

    useEffect(() => {
        const filter =FilterSongActionProps.CreateFromSongCatalog(songlist)

        FetchSongCatalog(filter)
    }, []);

    const songDef = CreateSongNodeHtmlAttributesConfiguration;
    const songCatalogDef = SongCatalogHtmlAttributesConfiguration;

    

    const hanldeOnAddSongClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song = Song.Create(
            elements[songDef.Title.ControlId].value,
            elements[songDef.Artist.ControlId].value,
            elements[songDef.Mode.ControlId].value,
            false,
            "no genre",
            "no comment"
        )

        AddSongToCatalog({ song, songCatalogId: songlist.Id } as INewSongActionProps)


    };

    const handleScrollDown = () => {
        const { Id, OData } = songlist
        const actionProps: INextLinkActionProps = { CatalogId: Id, NextLink: OData.NextLink }

        setTimeout(() => {
            fetchSongCatalogNextLink(actionProps)
        }, 500);

    }

    const handleSearchOnChange = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;
    }

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();
    }

    return (

        <Container fluid>
            <Row>
                {/* <Navbar bg="dark" variant="dark"> */}
                {/* <Navbar variant="dark" bg="dark justify-content-between">
                <Navbar.Brand>{songlist.Title}</Navbar.Brand>
                <Form inline>
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar> */}
                <Col >
                    <ContainerCss data-testid={songlist.Id}>
                        {/* <Title>{songlist.Title}</Title> */}


                        <Row>

                        </Row>
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
                                                                    FetchSongCatalog={FetchSongCatalog}
                                                                />
                                                            </SongFilterCss>
                                                        </Col>
                                                        <Col sm="6">
                                                            <Form >
                                                                <Form.Row>
                                                                    <Form.Group as={Col} controlId={songCatalogDef.ShowAddSongCheckBox.ControlId}>
                                                                        <Form.Check type="switch" label={songCatalogDef.ShowAddSongCheckBox.Label} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </Navbar.Collapse>
                                            </Navbar>
                                            <InfiniteScroll
                                                dataLength={songlist.Values.length}
                                                next={handleScrollDown}
                                                hasMore={songlist.Values.length < songlist.OData.Count}
                                                loader={<h4>Loading...</h4>}
                                                endMessage={
                                                    <p style={{ textAlign: 'center' }}>
                                                        <b>Yay! You have seen it all</b>
                                                    </p>
                                                }
                                                scrollableTarget={songCatalogDef.NodeList.ControlId}
                                            >
                                                {songlist.Values.map((song, index) => (
                                                    <SongCatalogNodeComponent
                                                        // RemoveSongFromState={RemoveSongFromMainListState}
                                                        // DeleteSongAsync={DeleteSongAsync}
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

                <Col >
                    <Container>
                        <TitleCss>Add Song</TitleCss>
                        <Form onSubmit={hanldeOnAddSongClick} method="GET">
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                                    <Form.Label>{songDef.Title.Label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Title.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                                    <Form.Label>{songDef.Artist.Label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Artist.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Mode.ControlId}>
                                    <Form.Label>{songDef.Mode.Label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Mode.Placeholder}></Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit">
                                Add Song to Main List
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>

    );
};

export default SongCatalogComponent;
