import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";

import { INextLinkActionProps } from "models";
import { FilterBandSongActionProps } from "mapping";
import { BandSongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles/catalogStyle";

import { BandSongCatalogProps } from "store/containers/catalogs/BandSongCatalogContainer";
import { BandFilterComponent } from "components/filters";
import BandSongCatalogNodeComponent from "components/nodes/bandSongCatalogNode";
import AddButton from "components/common/AddButton/addButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BandSongCatalogComponent = (props: BandSongCatalogProps): JSX.Element => {

    const {
        bandSongCatalog,
        history,

        setBandSongFilter,
        fetchBandSongCatalog,
        fetchBandSongCatalogNextLink,
        setModal,
    } = props

    useEffect(() => {
        const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongCatalog)
        fetchBandSongCatalog(filter)
    }, []);

    useEffect(() => {
        if (bandSongCatalog.Refresh) {
            const filter = FilterBandSongActionProps.CreateFromCatalog(bandSongCatalog)
            fetchBandSongCatalog(filter)
        }

    }, [bandSongCatalog.Refresh]);

    const bandSongCatalogDef = BandSongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { OData } = bandSongCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandSongCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddBandSong = () => {

        // setModal({ showModal: true })

        // const type: ModalTypes = ModalTypes.New
        // const pathName: string = '/bandSongModal'

        // history.push({
        //     pathname: pathName,
        //     search: `?$type=${type}`,
        //     state: { background: history.location }
        // })
    }

    return <div >

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
                                                filter={bandSongCatalog.Filter}
                                                setBandFilter={setBandSongFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewBandSong" onClick={handleShowAddBandSong}>New Band</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={bandSongCatalogDef.NodeList.ControlId} >
                                    {bandSongCatalog.OData.Count}
                                    <InfiniteScroll
                                        dataLength={bandSongCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={bandSongCatalog.Values.size < bandSongCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={bandSongCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(bandSongCatalog.Values.values()).map((bandSong, index) => (
                                            <BandSongCatalogNodeComponent
                                                bandSong={bandSong}
                                                index={index}
                                                key={bandSong.Id}
                                                setModal={setModal}
                                                history={history}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddBandSong} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default BandSongCatalogComponent;