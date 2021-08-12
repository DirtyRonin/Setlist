import React, { useEffect, useState } from "react";
import { Col, Row, Navbar, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { nameof } from "ts-simple-nameof";

import { AddSongToBandHtmlAttributesConfiguration } from "configuration";
import { ISong, IBand, IBandSong, IBandUser } from "models";
import { ReadBandsAsync } from "service";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import Node from "./node/AddSongToBandNode"

export interface IAddSongToBandComponent {
    song: ISong
    userId: string
}

const AddSongToBandComponent = (props: IAddSongToBandComponent): JSX.Element => {

    const { song, userId } = props

    const TITLE = 'Add Song To Band'
    const ID = `${TITLE}_id`

    const [bands, setBands] = useState<IBand[]>([]);
    const [odataCount, setOdataCount] = useState(0);

    const generateODataQuery = () => {

        // get bands that have the current userId and if this band has the songId, return it in property bandsongs. otherwise bangssongs will be empty 
        // bands?$filter=bandusers/any(d:d/userid eq 54eef1ca-d399-4f5c-b77e-8ff6b0e47083)&$expand=bandsongs($filter= songid eq 37c2047e-6171-441b-b409-b1488f5494e0)

        const BANDUSERS = `${nameof<IBand>(_ => _.BandUsers)}`
        const USERID = `${nameof<IBandUser>(x => x.UserId)}`
        
        const BANDSONGS = `${nameof<IBand>(_ => _.BandSongs)}`
        const SONGID = `${nameof<IBandSong>(x => x.SongId)}`

        return `?$filter=${BANDUSERS}/any(d:d/${USERID} eq ${userId})&$expand=${BANDSONGS}($filter= ${SONGID} eq ${song.Id})`
    }

    useEffect(() => {
        //fetch abnds for user

        const url = generateODataQuery()
        ReadBandsAsync(url).then(
            resolve => {
                setOdataCount(resolve.Count);
                setBands(resolve.Values);
            }
        ).catch().finally()
    }, []);


    const addSongToBandDef = AddSongToBandHtmlAttributesConfiguration;

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
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default AddSongToBandComponent;
