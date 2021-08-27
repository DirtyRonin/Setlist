import React, { useEffect } from "react";

import { FormControlProps, Col, Row, Navbar, Container, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, ModalTypes } from "models";
import { FilterSongActionProps } from "mapping";
import { SongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";

import { SongCatalogProps } from "store/containers/catalogs/SongCatalogContainer";
import { SongFilterComponent } from "components/filters";
import SongCatalogNodeComponent from "components/nodes/songCatalogNode";

const SongCatalogComponent = (props: SongCatalogProps): JSX.Element => {
    const {
        songCatalog,
        history,

        setSongFilter,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        setModal,
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
        const { OData } = songCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

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
                    <ContainerCss >
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
                                                            filter={songCatalog.Filter}
                                                            setSongFilter={setSongFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
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
                                                setModal={setModal}
                                                key={song.Id}
                                                song={song}
                                                index={index}
                                            />
                                        ))}



                                    </InfiniteScroll>

                                </NodeListCss>
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
