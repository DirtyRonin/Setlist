import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";

import { INextLinkActionProps, ModalTypes } from "models";
import { BandCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandHtmlAttributes";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles";
import { FilterBandActionProps } from "mapping";
import { BandCatalogProps } from "store/containers/catalogs/BandCatalogContainer";
import BandCatalogNodeComponent from "components/nodes/bandCatalogNode";
import { BandFilterComponent } from "components/filters";
import AddButton from "components/common/AddButton/addButton";

const BandCatalogComponent = (props: BandCatalogProps): JSX.Element => {
    const {
        bandcatalog,
        history,

        setBandFilter,
        fetchBandCatalog,
        fetchBandCatalogNextLink,
        setModal,
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

    const handleShowAddBand = () => {

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
                                <Header >
                                    <HeaderTitle>Bands</HeaderTitle>

                                    <HeaderOptions>
                                        <SearchFilterCss>
                                            <BandFilterComponent
                                                filter={bandcatalog.Filter}
                                                setBandFilter={setBandFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewBand" onClick={handleShowAddBand}>New Band</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={bandCatalogDef.NodeList.ControlId} >
                                    {bandcatalog.OData.Count}
                                    <InfiniteScroll
                                        dataLength={bandcatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={bandcatalog.Values.size < bandcatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
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
                                <AddButton onClick={handleShowAddBand} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>

    );
};

export default BandCatalogComponent;
