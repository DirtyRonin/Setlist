import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import InfiniteScroll from "react-infinite-scroll-component";


import { CustomEventCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes";
import { FilterCustomEventActionProps } from "mapping";
import { INextLinkActionProps, ModalTypes } from "models";
import { CustomEventCatalogProps } from "store/containers/catalogs/CustomEventCatalogContainer";
import CustomEventCatalogNodeComponent from "components/nodes/customEventCatalogNode";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";
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
        setSetlistIdForSetlistSong,
        history
    } = props;

    useEffect(() => {
        if (customEventCatalog.Refresh) {
            const filter = FilterCustomEventActionProps.CreateFromCatalog(customEventCatalog)
            fetchCustomEventCatalog(filter)
        }
    }, [customEventCatalog.Refresh])

    const customEventCatalogDef = CustomEventCatalogHtmlAttributesConfiguration

    const handleScrollDown = (): void => {
        const { Meta: OData } = customEventCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchCustomEventCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddCustomEvent = () => {
        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/customEventModal'

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
                                    {customEventCatalog.Meta.Count}
                                    <InfiniteScroll
                                        dataLength={customEventCatalog.Values.length}
                                        next={handleScrollDown}
                                        hasMore={customEventCatalog.Values.length < customEventCatalog.Meta.Count}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget={customEventCatalogDef.NodeList.ControlId}
                                        style={InfinitScrollCss}
                                    >
                                        {customEventCatalog.Values.map((customEvent, index) => (
                                            <CustomEventCatalogNodeComponent
                                                setSetlistIdForSetlistSong={setSetlistIdForSetlistSong}
                                                customEvent={customEvent}
                                                index={index}
                                                setModal={setModal}
                                                history={history}
                                                key={customEvent.id}
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