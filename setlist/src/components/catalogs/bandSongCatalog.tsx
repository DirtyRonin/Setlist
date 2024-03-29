import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";

import { INextLinkActionProps, ModalTypes } from "models";
import { FilterBandSongActionProps } from "mapping";
import { BandSongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";

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
        const { Meta: OData } = bandSongCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchBandSongCatalogNextLink(actionProps)
        }, 500);
    }

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${bandSongCatalog.bandId}`,
            state: { background: history.location }
        })
    }

    const handleShowAddBandSong = () => createModal(ModalTypes.Add, '/AddBandSongFromSongs')

    return <div >

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                            <Header >
                                    <HeaderTitle>Band Songs</HeaderTitle>

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
                                            <MenuItem value="NewBandSong" onClick={handleShowAddBandSong}>Add Song</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={bandSongCatalogDef.NodeList.ControlId} >
                                    {bandSongCatalog.Meta.Count}
                                    <InfiniteScroll
                                        dataLength={bandSongCatalog.Values.length}
                                        next={handleScrollDown}
                                        hasMore={bandSongCatalog.Values.length < bandSongCatalog.Meta.Count}
                                        loader={<h4>Loading...</h4>}
                                        style={InfinitScrollCss}
                                        scrollableTarget={bandSongCatalogDef.NodeList.ControlId}
                                    >
                                        {bandSongCatalog.Values.map((bandSong, index) => (
                                            <BandSongCatalogNodeComponent
                                                bandSong={bandSong}
                                                index={index}
                                                key={`${bandSongCatalog.Id}_${bandSong.songId}`}
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