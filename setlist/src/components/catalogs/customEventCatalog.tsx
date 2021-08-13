import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, Form, FormControlProps } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";

import { CustomEventCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { FilterCustomEventActionProps,CustomEvent } from "../../mapping";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalCustomEvent } from "../../models";
import { CustomEventCatalogProps } from "../../store/containers/catalogs/CustomEventCatalogContainer";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import CustomEventCatalogNodeComponent from "../nodes/customEventCatalogNode";

const CustomEventCatalogComponent = (props: CustomEventCatalogProps): JSX.Element => {


    const {
        customEventCatalog,
        showModal,

        pushCatalogsOrder,
        fetchCustomEventCatalog
    } = props;

    useEffect(() => {
            const filter = FilterCustomEventActionProps.CreateFromCatalog(customEventCatalog)
            fetchCustomEventCatalog(filter)
    }, [])

    useEffect(() => {
        if (customEventCatalog.Refresh) {
            const filter = FilterCustomEventActionProps.CreateFromCatalog(customEventCatalog)
            fetchCustomEventCatalog(filter)
        }
    }, [customEventCatalog.Refresh])

    const customEventCatalogDef = CustomEventCatalogHtmlAttributesConfiguration

    const handleScrollDown = (): void => { }

    const handleShowAddCustomEvent = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalCustomEvent = {
            show: elements[customEventCatalogDef.ShowAddCustomEventCheckBox.ControlId].checked,
            catalogId: customEventCatalog.Id,
            catalogType: CatalogTypes["CustomEvent Catalog"],
            type: "New",
            value: CustomEvent.EmptyCustomEvent(),
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
                    <ContainerCss data-testid={customEventCatalog.Id}>
                        <Row>
                            <Col>
                                <NodeListCss id={customEventCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{customEventCatalog.Title}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={customEventCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={customEventCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        {/* <CustomEventFilterComponent
                                                            CatalogId={customEventCatalog.Id}
                                                            Filter={customEventCatalog.Filter}
                                                            setCustomEventFilter={setCustomEventFilter}
                                                        /> */}
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    <Form onChange={handleShowAddCustomEvent}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={customEventCatalogDef.ShowAddCustomEventCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={customEventCatalogDef.ShowAddCustomEventCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>

                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>

                                    </Navbar>

                                    <InfiniteScroll
                                        dataLength={customEventCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={customEventCatalog.Values.size < customEventCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={customEventCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(customEventCatalog.Values.values()).map((customEvent, index) => (
                                            <CustomEventCatalogNodeComponent
                                                customEvent={customEvent}
                                                index={index}
                                                catalogId={customEventCatalog.Id}
                                                pushCatalogsOrder={pushCatalogsOrder}
                                                key={customEvent.Id}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {customEventCatalog.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default CustomEventCatalogComponent