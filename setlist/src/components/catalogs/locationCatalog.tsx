import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MenuDivider, MenuHeader,Menu,    MenuItem } from "@szhsin/react-menu";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LocationCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/locationHtmlAttributes";
import { FilterLocationActionProps } from "mapping";
import { INextLinkActionProps, ModalTypes } from "models";
import { LocationCatalogProps } from "store/containers/catalogs/LocationCatalogContainer";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles";
import LocationCatalogNodeComponent from "components/nodes/locationCatalogNode";
import { LocationFilterComponent } from "components/filters/LocationFilter";
import AddButton from "components/common/AddButton/addButton";

const LocationCatalogComponent = ({
    locationCatalog,
    history,
    setLocationFilter,
    fetchLocationCatalog,
    fetchLocationCatalogNextLink,
    setModal,
}: LocationCatalogProps): JSX.Element => {

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
        const { Meta: OData } = locationCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchLocationCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddLocation = () => {
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
                                <Header >
                                    <HeaderTitle>Locations</HeaderTitle>
                                    <HeaderOptions>
                                        <SearchFilterCss>
                                            <LocationFilterComponent
                                                filter={locationCatalog.Filter}
                                                setLocationFilter={setLocationFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewLocation" onClick={handleShowAddLocation}>New Location</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={locationCatalogDef.NodeList.ControlId} >
                                    {locationCatalog.Meta.Count}
                                    <InfiniteScroll
                                        dataLength={locationCatalog.Values.length}
                                        next={handleScrollDown}
                                        hasMore={locationCatalog.Values.length < locationCatalog.Meta.Count}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget={locationCatalogDef.NodeList.ControlId}
                                        style={InfinitScrollCss}
                                    >
                                        {Array.from(locationCatalog.Values.values()).map((location, index) => (
                                            <LocationCatalogNodeComponent
                                                location={location}
                                                index={index}
                                                key={location.id}
                                                history={history}
                                                setModal={setModal}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddLocation} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default LocationCatalogComponent