import React, { useEffect } from "react";

import { Col, Row, Navbar, Container, FormControlProps, Form, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, ModalTypes } from "models";
import { BandCatalogHtmlAttributesConfiguration } from "configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";
import { FilterBandActionProps, Band } from "mapping";
import { IModalBand } from "models/modals/modelBand";
import { BandCatalogProps } from "store/containers/catalogs/BandCatalogContainer";
import BandCatalogNodeComponent from "components/nodes/bandCatalogNode";
import { BandFilterComponent } from "components/filters";

const BandCatalogComponent = (props: BandCatalogProps): JSX.Element => {
    const {
        bandcatalog,
        setBandFilter,

        setModal,
        history,


        fetchBandCatalog,
        fetchBandCatalogNextLink,

        setBandIdForBandSong,
    } = props;

    useEffect(() => {
        const filter = FilterBandActionProps.CreateFromCatalog(bandcatalog)
        fetchBandCatalog(filter)
    }, []);

    useEffect(() => {
        if (bandcatalog.Refresh) {
            const filter = FilterBandActionProps.CreateFromCatalog(bandcatalog)
            fetchBandCatalog(filter)
        }

    }, [bandcatalog.Refresh]);


    const bandCatalogDef = BandCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { OData } = bandcatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddBand = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();
        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/bandModal'

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
                                <NodeListCss id={bandCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{bandcatalog.Title}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={bandCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={bandCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <BandFilterComponent
                                                            filter={bandcatalog.Filter}
                                                            setBandFilter={setBandFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                <Button variant="secondary" onClick={handleShowAddBand}>New Band</Button>
                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>

                                    </Navbar>

                                    <InfiniteScroll
                                        dataLength={bandcatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={bandcatalog.Values.size < bandcatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={bandCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(bandcatalog.Values.values()).map((band, index) => (
                                            <BandCatalogNodeComponent
                                                setModal={setModal}
                                                setBandIdForBandSong={setBandIdForBandSong}
                                                history={history}
                                               
                                                key={band.Id}
                                                band={band}
                                                index={index}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {bandcatalog.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default BandCatalogComponent;
