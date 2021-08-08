import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, Form, FormControlProps } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";

import { LocationCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { FilterLocationActionProps,Location } from "../../mapping";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalLocation } from "../../models";
import { LocationCatalogProps } from "../../store/containers/catalogs/LocationCatalogContainer";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import LocationCatalogNodeComponent from "../nodes/locationCatalogNode";

const LocationCatalogComponent = (props: LocationCatalogProps): JSX.Element => {


    const {
        locationCatalog,
        showModal,

        pushCatalogsOrder,
        fetchLocationCatalog
    } = props;

    useEffect(() => {
        if (locationCatalog.Refresh) {
            const filter = FilterLocationActionProps.CreateFromCatalog(locationCatalog)
            fetchLocationCatalog(filter)
        }
    }, [locationCatalog.Refresh])

    const locationCatalogDef = LocationCatalogHtmlAttributesConfiguration

    const handleScrollDown = (): void => { }

    const handleShowAddLocation = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalLocation = {
            show: elements[locationCatalogDef.ShowAddLocationCheckBox.ControlId].checked,
            catalogId: locationCatalog.Id,
            catalogType: CatalogTypes["Location Catalog"],
            type: "New",
            value: Location.EmptyLocation(),
            catalogInModal: CatalogTypes["None"]
        }

        const order: IComponentOrderActionProps = {
            ComponentOrder: {
                value: modal,
                id: modal.catalogId,
                displayIn: DisplayIn.Modal
            } as IComponentOrder
        }

        pushCatalogsOrder(order)
    }

    return <div>
        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss data-testid={locationCatalog.Id}>
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
                                                        {/* <LocationFilterComponent
                                                            CatalogId={locationCatalog.Id}
                                                            Filter={locationCatalog.Filter}
                                                            setLocationFilter={setLocationFilter}
                                                        /> */}
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    <Form onChange={handleShowAddLocation}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={locationCatalogDef.ShowAddLocationCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={locationCatalogDef.ShowAddLocationCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>

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
                                                catalogId={locationCatalog.Id}
                                                pushCatalogsOrder={pushCatalogsOrder}
                                                key={location.Id}
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