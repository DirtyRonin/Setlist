import React, { useEffect } from "react";

import { Droppable } from "react-beautiful-dnd";
import { Form, FormControlProps, Col, Row, Navbar, FormControl, Nav, NavDropdown, Container, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";


import SongCatalogNodeComponent from "./songCatalogNode";
import { ISongCatalog, ISong, ISongFilter, INewSongActionProps, IFilterSongActionProps } from "../models";
import { CreateSongNodeHtmlAttributesConfiguration, FilterSongHtmlAttributesConfiguration } from "../Configuration";
import { ContainerCss, TitleCss, NodeListCss, SongFilterCss } from "../styles";
import { Song } from "../mapping";
import { SongFilterComponent, ISongFilterProps } from "./filters/songFilter";

export interface IMainListProps {
    songlist: ISongCatalog;

    AddSongToCatalog(props: INewSongActionProps): void
    FetchSongCatalog(props: IFilterSongActionProps): void
    // DeleteSongAsync(songId: string): Promise<ISong>;

    // AddSongToMainListState: (songListId: string, newSong: ISong) => void;
    // RemoveSongFromMainListState(songListId: string, songId: string): void;
}

const SongCatalogComponent = (props: IMainListProps): JSX.Element => {
    const {
        songlist,
        AddSongToCatalog,
        FetchSongCatalog
        // AddSongToMainListState,
        // RemoveSongFromMainListState,
        // DeleteSongAsync
    } = props;

    useEffect(() => {
        const filter: IFilterSongActionProps = {
            Filter: songlist.Filter,
            ToBeUpdated: songlist.ToBeUpdated
        }

        FetchSongCatalog(filter)
    }, []);

    const songDef = CreateSongNodeHtmlAttributesConfiguration;
    const filterSongDet = FilterSongHtmlAttributesConfiguration;

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

        // CreateSongAsync(song)
        //     .then(newSongResult => AddSongToMainListState(songlist.Id, newSongResult))
        //     .catch(error => console.log(error));
    };

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
                                        <NodeListCss ref={provided.innerRef} {...provided.droppableProps}>
                                            <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                                <Navbar.Brand >{songlist.Title}</Navbar.Brand>
                                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                                <Navbar.Collapse id="responsive-navbar-nav">
                                                    <Row>
                                                        <Col sm="12">
                                                            <SongFilterCss>
                                                                <SongFilterComponent
                                                                    Filter={songlist.Filter}
                                                                    FetchSongCatalog={FetchSongCatalog}
                                                                />
                                                            </SongFilterCss>
                                                        </Col>
                                                    </Row>
                                                </Navbar.Collapse>
                                            </Navbar>

                                            {songlist.Songs.map((song, index) => (
                                                <SongCatalogNodeComponent
                                                    // RemoveSongFromState={RemoveSongFromMainListState}
                                                    // DeleteSongAsync={DeleteSongAsync}
                                                    songListId={songlist.Id}
                                                    key={song.Id}
                                                    song={song}
                                                    index={index}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </NodeListCss>
                                    )}
                                </Droppable>
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>

                {/* <Col>
                    <Container>
                        <Title>Add Song</Title>
                        <Form onSubmit={hanldeOnAddSongClick} method="GET">
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                                    <Form.Label>{songDef.Title.label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Title.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                                    <Form.Label>{songDef.Artist.label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Artist.Placeholder}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId={songDef.Mode.ControlId}>
                                    <Form.Label>{songDef.Mode.label}</Form.Label>
                                    <Form.Control type="text" placeholder={songDef.Mode.Placeholder}></Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Button variant="primary" type="submit">
                                Add Song to Main List
                            </Button>
                        </Form>
                    </Container>
                </Col> */}
            </Row>
        </Container>

    );
};

export default SongCatalogComponent;
