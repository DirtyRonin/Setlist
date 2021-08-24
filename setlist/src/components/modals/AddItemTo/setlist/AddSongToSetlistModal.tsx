import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container, Modal, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { nameof } from "ts-simple-nameof";

import { AddSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { ISong, IBandSong, ISetlist } from "models";
import { fetchSongById, ReadSetlistAsync } from "service";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import Node from "./node/AddSongToSetlistModalNode"
import { Song } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";

export interface IAddSongToSetlistModalComponent {
    routeQuery: string
    handleCloseModal(): void
}

const AddSongToSetlistModalComponent = (props: IAddSongToSetlistModalComponent): JSX.Element => {

    const { routeQuery, handleCloseModal } = props

    const TITLE = 'Add Song To Setlist'
    const ID = `${TITLE}_id`

    const [setlist, setSetlist] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');
    const [song, setSong] = useState(Song.EmptySong());
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        const mapped = mapQueryRoute(routeQuery)

        setIsLoading(true)
        const songId = mapped.id
        const url = generateODataQuery(songId)

        Promise.all([
            fetchSongById(songId).then(result => {
                setSong(result)

            }),
            ReadSetlistAsync(url).then(
                resolve => {
                    setCount(resolve.Count);
                    setSetlist(resolve.Values);
                    setNextLink(resolve.NextLink);
                }
            ).catch().finally()
        ]).then(() => setIsLoading(false))
    }, []);

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _id = args.get('id') ?? ''
        return { id: _id }
    }

    const generateODataQuery = (songId: string) => {

        // setlists?$expand=setlistsongs($filter=songid eq 805237b2-49c2-42e5-8b88-57d2d4045c36)

        const SETLISTSONGS = `${nameof<ISetlist>(_ => _.SetlistSongs)}`
        const SONGID = `${nameof<IBandSong>(x => x.SongId)}`

        return `?$expand=${SETLISTSONGS}($filter= ${SONGID} eq ${songId})`
    }

    const addSongToSetlistDef = AddSongToSetlistHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        ReadSetlistAsync(nextLink).then(
            resolve => {
                setCount(resolve.Count);
                setSetlist(setlist.concat(resolve.Values));
                setNextLink(resolve.NextLink);
            }
        );
    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>{song.Title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <NodeListCss id={addSongToSetlistDef.NodeList.ControlId} >
                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                        <Navbar.Brand >{`${TITLE}`}</Navbar.Brand>

                        <Navbar.Toggle aria-controls={addSongToSetlistDef.Navbar.ControlId} />
                        <Navbar.Collapse id={addSongToSetlistDef.Navbar.ControlId}>
                            <Row>
                                <Col sm="6">
                                    <SongFilterCss>
                                        {/* <BandFilterComponent
                                                            CatalogId={bandcatalog.Id}
                                                            Filter={bandcatalog.Filter}
                                                            setBandFilter={setBandFilter}
                                                        /> */}
                                    </SongFilterCss>
                                </Col>
                                <Col sm="6">
                                    {/* <Form onChange={handleShowAddBand}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={addSongToSetlistDef.ShowAddBandCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={addSongToSetlistDef.ShowAddBandCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form> */}

                                </Col>
                            </Row>
                        </Navbar.Collapse>

                    </Navbar>

                    <InfiniteScroll
                        dataLength={setlist.length}
                        next={handleScrollDown}
                        hasMore={setlist.length < count}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        scrollableTarget={addSongToSetlistDef.NodeList.ControlId}
                    >
                        {setlist.map((setlist, index) => (
                            <Node
                                setlist={setlist}
                                song={song}
                                key={index}
                            />
                        ))}
                    </InfiniteScroll>
                </NodeListCss>
                {count?.toString()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>
};

export default AddSongToSetlistModalComponent;


