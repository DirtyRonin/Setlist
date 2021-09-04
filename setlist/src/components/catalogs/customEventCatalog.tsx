import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, FormControlProps } from "react-bootstrap";
import { MenuDivider, MenuHeader,Menu,    MenuItem } from "@szhsin/react-menu";
import InfiniteScroll from "react-infinite-scroll-component";


import { CustomEventCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes";
import { FilterCustomEventActionProps } from "mapping";
import { INextLinkActionProps } from "models";
import { CustomEventCatalogProps } from "store/containers/catalogs/CustomEventCatalogContainer";
import CustomEventCatalogNodeComponent from "components/nodes/customEventCatalogNode";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss, SongFilterCss } from "styles";
import AddButton from "components/common/AddButton/addButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomEventFilterComponent from "components/filters/CustomEventFilter";

const CustomEventCatalogComponent = (props: CustomEventCatalogProps): JSX.Element => {


    const {
        customEventCatalog,
        fetchCustomEventCatalog,
        fetchCustomEventCatalogNextLink,
        setCustomEventFilter,
        setModal,
        history
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

    const handleScrollDown = (): void => {
        const { OData } = customEventCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchCustomEventCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddCustomEvent = () => {

    }

    return <div>
        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                                <Header >
                                    <HeaderTitle>Songs</HeaderTitle>

                                    <HeaderOptions>
                                        <SearchFilterCss>
                                            <CustomEventFilterComponent
                                                filter={customEventCatalog.Filter}
                                                setCustomEventFilter={setCustomEventFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewCustomEvent" onClick={handleShowAddCustomEvent}>New Custom Event</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={customEventCatalogDef.NodeList.ControlId} >
                                    {customEventCatalog.OData.Count}
                                    <InfiniteScroll
                                        dataLength={customEventCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={customEventCatalog.Values.size < customEventCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget={customEventCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(customEventCatalog.Values.values()).map((customEvent, index) => (
                                            <CustomEventCatalogNodeComponent
                                                customEvent={customEvent}
                                                index={index}
                                                setModal={setModal}
                                                history={history}
                                                key={customEvent.Id}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddCustomEvent} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default CustomEventCatalogComponent