import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { nameof } from "ts-simple-nameof";

import { AddBandSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { IBandSong, ISetlist, ISetlistSong } from "models";
import { ReadSetlistAsync } from "service";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import Node from "./node/AddBandSongToSetlistModalNode"

export interface IAddBandSongToSetlistModalComponent {
    bandSong: IBandSong
}

const AddBandSongToSetlistModalComponent = (props: IAddBandSongToSetlistModalComponent): JSX.Element => {

    const { bandSong } = props

    const TITLE = 'Add BandSong To Setlist'
    const ID = `${TITLE}_id`

    const [setlist, setSetlist] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);
    const [nextLink, setNextLink] = useState('');

    const generateODataQuery = () => {

        // $expand=setlistsongs($filter=bandsongid eq d0b60d82-96b7-411b-b6f0-b03a668fbf1f)

        const SETLISTSONGS = `${nameof<ISetlist>(_ => _.SetlistSongs)}`
        const BANDSONGID = `${nameof<ISetlistSong>(x => x.BandSongId)}`

        return `?$expand=${SETLISTSONGS}($filter= ${BANDSONGID} eq ${bandSong.Id})`
    }

    useEffect(() => {
        const url = generateODataQuery()
        ReadSetlistAsync(url).then(
            resolve => {
                setCount(resolve.Count);
                setSetlist(resolve.Values);
                setNextLink(resolve.NextLink);
            }
        ).catch().finally()
    }, []);


    const addBandSongToSetlistDef = AddBandSongToSetlistHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        ReadSetlistAsync(nextLink).then(
            resolve => {
                setCount(resolve.Count);
                setSetlist(setlist.concat(resolve.Values));
                setNextLink(resolve.NextLink);
            }
        );
    }

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={ID}>
                        <Row>
                            <Col>
                                <NodeListCss id={addBandSongToSetlistDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{`${TITLE}`}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={addBandSongToSetlistDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={addBandSongToSetlistDef.Navbar.ControlId}>
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
                                                            <Form.Group as={Col} controlId={addBandSongToSetlistDef.ShowAddBandCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={addBandSongToSetlistDef.ShowAddBandCheckBox.Label} />
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
                                        scrollableTarget={addBandSongToSetlistDef.NodeList.ControlId}
                                    >
                                        {setlist.map((setlist, index) => (
                                            <Node
                                                setlist={setlist}
                                                bandSong={bandSong}
                                                key={index}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {count?.toString()}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default AddBandSongToSetlistModalComponent;
