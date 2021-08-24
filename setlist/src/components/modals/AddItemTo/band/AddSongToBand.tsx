import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container, Modal, Form, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { nameof } from "ts-simple-nameof";

import { AddSongToBandHtmlAttributesConfiguration } from "configuration";
import { IBand, IBandSong, IBandUser } from "models";
import { fetchSongById, ReadBandsAsync } from "service";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import Node from "./node/AddSongToBandNode"
import { Song } from "mapping";
import { mapQuery } from "utils/routeQueryHelper";

export interface IAddSongToBandComponent {
    routeQuery: string
    userId: string
    handleCloseModal(): void
}

const AddSongToBandComponent = (props: IAddSongToBandComponent): JSX.Element => {

    const { routeQuery, userId, handleCloseModal } = props

    const TITLE = 'Add Song To Band'
    const ID = `${TITLE}_id`

    const [bands, setBands] = useState<IBand[]>([]);
    const [odataCount, setOdataCount] = useState(0);
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
            ReadBandsAsync(url).then(
                result => {
                    setOdataCount(result.Count);
                    setBands(result.Values);
                }
            ).catch().finally()]

        ).then(() => setIsLoading(false))
    }, [])

    const generateODataQuery = (songId: string) => {

        // get bands that have the current userId and if this band has the songId, return it in property bandsongs. otherwise bangssongs will be empty 
        // bands?$filter=bandusers/any(d:d/userid eq 54eef1ca-d399-4f5c-b77e-8ff6b0e47083)&$expand=bandsongs($filter= songid eq 37c2047e-6171-441b-b409-b1488f5494e0)

        const BANDUSERS = `${nameof<IBand>(_ => _.BandUsers)}`
        const USERID = `${nameof<IBandUser>(x => x.UserId)}`

        const BANDSONGS = `${nameof<IBand>(_ => _.BandSongs)}`
        const SONGID = `${nameof<IBandSong>(x => x.SongId)}`

        return `?$filter=${BANDUSERS}/any(d:d/${USERID} eq ${userId})&$expand=${BANDSONGS}($filter= ${SONGID} eq ${songId})`
    }

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _id = args.get('id') ?? ''

        return { id: _id }
    }


    const addSongToBandDef = AddSongToBandHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        // const { Id, OData } = bandcatalog
        // const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            // new nextLink methode
            //fetchBandCatalogNextLink(actionProps)
        }, 500);

    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>{song.Title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <NodeListCss id={addSongToBandDef.NodeList.ControlId} >
                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                        <Navbar.Brand >{`${TITLE}`}</Navbar.Brand>

                        <Navbar.Toggle aria-controls={addSongToBandDef.Navbar.ControlId} />
                        <Navbar.Collapse id={addSongToBandDef.Navbar.ControlId}>
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
                                                            <Form.Group as={Col} controlId={addSongToBandDef.ShowAddBandCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={addSongToBandDef.ShowAddBandCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form> */}

                                </Col>
                            </Row>
                        </Navbar.Collapse>

                    </Navbar>

                    <InfiniteScroll
                        dataLength={bands.length}
                        next={handleScrollDown}
                        hasMore={bands.length < odataCount}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        scrollableTarget={addSongToBandDef.NodeList.ControlId}
                    >
                        {bands.map((band, index) => (
                            <Node
                                band={band}
                                song={song}
                                key={index}
                            />
                        ))}
                    </InfiniteScroll>
                </NodeListCss>
                {odataCount?.toString()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>

    
};

export default AddSongToBandComponent;
