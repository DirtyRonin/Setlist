import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, FormControlProps, Button } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";

import { LocationCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/locationHtmlAttributes";
import { FilterLocationActionProps } from "mapping";
import { INextLinkActionProps, ModalTypes } from "models";
import { LocationCatalogProps } from "store/containers/catalogs/LocationCatalogContainer";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";
import LocationCatalogNodeComponent from "components/nodes/locationCatalogNode";
import { LocationFilterComponent } from "components/filters/LocationFilter";

const LocationCatalogComponent = (props: LocationCatalogProps): JSX.Element => {


    const {
        locationCatalog,
        history,

        setLocationFilter,
        fetchLocationCatalog,
        fetchLocationCatalogNextLink,
        setModal,
    } = props;

    useEffect(() => {
        const filter = FilterLocationActionProps.CreateFromCatalog(locationCatalog)
        fetchLocationCatalog(filter)
    }, [])

    useEffect(() => {
        if (locationCatalog.Refresh) {
            const filter = FilterLocationActionProps.CreateFromCatalog(locationCatalog)
            fetchLocationCatalog(filter)
        }
    }, [locationCatalog.Refresh])

    const locationCatalogDef = LocationCatalogHtmlAttributesConfiguration

    const handleScrollDown = (): void => {
        const { OData } = locationCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchLocationCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddLocation = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();
        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/locationModal'


        history.push({
            pathname: pathName,
            search: `?$type=${type}`,
            state: { background: history.location }
        })
    }

    return <div>
        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                                <NodeListCss id={locationCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{locationCatalog.Title}</Navbar.Brand>
                                        <Navbar.Toggle aria-controls={locationCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={locationCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <LocationFilterComponent
                                                            filter={locationCatalog.Filter}
                                                            setLocationFilter={setLocationFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                <Button variant="secondary" onClick={handleShowAddLocation}>New Song</Button>
                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>

                                    </Navbar>

                                    <InfiniteScroll
                                        dataLength={locationCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={locationCatalog.Values.size < locationCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={locationCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(locationCatalog.Values.values()).map((location, index) => (
                                            <LocationCatalogNodeComponent
                                                location={location}
                                                index={index}
                                                key={location.Id}
                                                history={history}
                                                setModal={setModal}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {locationCatalog.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default LocationCatalogComponent