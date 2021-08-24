import React, { useEffect } from "react";

import { Form, FormControlProps, Col, Row, Navbar, Container, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, IModalSong, CatalogTypes, IComponentOrderActionProps, IComponentOrder, DisplayIn, ModalTypes } from "models";
import { FilterSongActionProps, Song } from "../../mapping";
import { SongCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { SongFilterComponent } from "../filters";
import SongCatalogNodeComponent from "../nodes/songCatalogNode";
import { SongCatalogProps } from "../../store/containers/catalogs/SongCatalogContainer";
import styled from "styled-components";

const CatalogBody = styled.div`
    height: 100%;
    margin: 0;
`

const NodeWrapper = styled.div`
min-height: 100%;
margin-bottom: -50px;
`
const StickBottomButtonWrapper = styled.div`
  height: 50px;
`
const NodeFooter = styled.div`
  height: 50px;
`

const SongCatalogComponent = (props: SongCatalogProps): JSX.Element => {
    const {
        songCatalog,
        setSongFilter,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        pushCatalogsOrder,
        setModal,

        showModal,
        history

    } = props;

    //initial refresh
    useEffect(() => {
        const filter = FilterSongActionProps.CreateFromSongCatalog(songCatalog)
        fetchSongCatalog(filter)
    }, []);

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
        event.preventDefault();
        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/songModal'


        history.push({
            pathname: pathName,
            search: `?$type=${type}`,
            state: { background: history.location }
        })
    }

    return (

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={songCatalog.Id}>
                        <Row>
                            <Col>
                                <NodeListCss id={songCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} expanded={true} bg="light" variant="light">
                                        <Navbar.Brand >{songCatalog.Title}</Navbar.Brand>
                                        <Navbar.Toggle aria-controls={songCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={songCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <SongFilterComponent
                                                            CatalogId={songCatalog.Id}
                                                            filter={songCatalog.Filter}
                                                            setSongFilter={setSongFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    {/* <Form onChange={handleShowAddSong}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={songCatalogDef.ShowAddSongCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={songCatalogDef.ShowAddSongCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form> */}
                                                    <Button variant="secondary" onClick={handleShowAddSong}>New Song</Button>
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
                                                history={history}
                                                // pushCatalogsOrder={pushCatalogsOrder}
                                                setModal={setModal}
                                                songListId={songCatalog.Id}
                                                key={song.Id}
                                                song={song}
                                                index={index}
                                            />
                                        ))}



                                    </InfiniteScroll>

                                </NodeListCss>
                                <Button variant="secondary" >Close</Button>
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
