import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { nameof } from "ts-simple-nameof";

import { AddSongToSetlistHtmlAttributesConfiguration } from "configuration";
import { ISong, IBandSong, ISetlist } from "models";
import { ReadSetlistAsync } from "service";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import Node from "./node/AddSongToSetlistModalNode"

export interface IAddSongToSetlistModalComponent {
    song: ISong
}

const AddSongToSetlistModalComponent = (props: IAddSongToSetlistModalComponent): JSX.Element => {

    const { song } = props

    const TITLE = 'Add Song To Setlist'
    const ID = `${TITLE}_id`

    const [setlist, setSetlist] = useState<ISetlist[]>([]);
    const [count, setCount] = useState(0);

    const generateODataQuery = () => {

        // setlists?$expand=setlistsongs($filter=songid eq 805237b2-49c2-42e5-8b88-57d2d4045c36)

        const SETLISTSONGS = `${nameof<ISetlist>(_ => _.SetlistSongs)}`
        const SONGID = `${nameof<IBandSong>(x => x.SongId)}`

        return `?$expand=${SETLISTSONGS}($filter= ${SONGID} eq ${song.Id})`
    }

    useEffect(() => {
        //fetch abnds for user

        const url = generateODataQuery()
        ReadSetlistAsync(url).then(
            resolve => {
                setCount(resolve.Count);
                setSetlist(resolve.Values);
            }
        ).catch().finally()
    }, []);


    const addSongToSetlistDef = AddSongToSetlistHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        // const { Id, OData } = bandcatalog
        // const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            // new nextLink methode
            //fetchBandCatalogNextLink(actionProps)
        }, 500);

    }

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={ID}>
                        <Row>
                            <Col>
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
                                                bandSong={undefined}
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

export default AddSongToSetlistModalComponent;
