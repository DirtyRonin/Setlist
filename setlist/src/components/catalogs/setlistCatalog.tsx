import React from "react";
import { useEffect } from "react";
import { Col, Container, Navbar, Row, Form, FormControlProps } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";

import { SetlistCatalogHtmlAttributesConfiguration } from "../../Configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "../../styles";
import { FilterSetlistActionProps, Setlist } from "../../mapping";
import { SetlistCatalogProps } from "../../store/containers/catalogs/SetlistCatalogContainer";
import { CatalogTypes, DisplayIn, IComponentOrder, IComponentOrderActionProps, IModalSetlist, INextLinkActionProps } from "../../models";
import SetlistCatalogNodeComponent from "../nodes/setlistCatalogNode";
import { SetlistFilterComponent } from "../filters";



const SetlistCatalogComponent = (props: SetlistCatalogProps): JSX.Element => {
    const {
        setlistCatalog,
        showModal,

        setSetlistFilter,
        fetchSetlistCatalog,
        fetchSetlistCatalogNextLink,
        pushCatalogsOrder,

    } = props;

    useEffect(() => {
        const filter = FilterSetlistActionProps.CreateFromCatalog(setlistCatalog)
        fetchSetlistCatalog(filter)
    }, [])

    useEffect(() => {
        if (setlistCatalog.Refresh) {
            const filter = FilterSetlistActionProps.CreateFromCatalog(setlistCatalog)
            fetchSetlistCatalog(filter)
        }
    }, [setlistCatalog.Refresh])

    const setlistCatalogDef = SetlistCatalogHtmlAttributesConfiguration

    const handleScrollDown = () => {
        const { Id, OData } = setlistCatalog
        const actionProps: INextLinkActionProps = { catalogId: Id, nextLink: OData.NextLink }

        setTimeout(() => {
            fetchSetlistCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddSetlist = (event: React.FormEvent<FormControlProps>) => {
        const elements: any = (event.target as any).form.elements;

        const modal: IModalSetlist = {
            show: elements[setlistCatalogDef.ShowAddSetlistCheckBox.ControlId].checked,
            catalogId: setlistCatalog.Id,
            catalogType: CatalogTypes["Setlist Catalog"],
            type: "New",
            value: Setlist.EmptySetlist(),
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
                    <ContainerCss data-testid={setlistCatalog.Id}>
                        <Row>
                            <Col>
                                <NodeListCss id={setlistCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{setlistCatalog.Title}</Navbar.Brand>

                                        <Navbar.Toggle aria-controls={setlistCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={setlistCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <SetlistFilterComponent
                                                            CatalogId={setlistCatalog.Id}
                                                            Filter={setlistCatalog.Filter}
                                                            setSetlistFilter={setSetlistFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    <Form onChange={handleShowAddSetlist}>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId={setlistCatalogDef.ShowAddSetlistCheckBox.ControlId}>
                                                                <Form.Check type="switch" checked={showModal} label={setlistCatalogDef.ShowAddSetlistCheckBox.Label} />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>

                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>

                                    </Navbar>

                                    <InfiniteScroll
                                        dataLength={setlistCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={setlistCatalog.Values.size < setlistCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={setlistCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(setlistCatalog.Values.values()).map((setlist, index) => (
                                            <SetlistCatalogNodeComponent
                                                setlist={setlist}
                                                index={index}
                                                catalogId={setlistCatalog.Id}
                                                pushCatalogsOrder={pushCatalogsOrder}
                                                key={setlist.Id}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {setlistCatalog.OData.Count}
                            </Col>
                        </Row>


                    </ContainerCss>
                </Col>


            </Row>
        </Container>
    </div>
}

export default SetlistCatalogComponent;