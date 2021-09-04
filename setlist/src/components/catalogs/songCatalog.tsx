import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { INextLinkActionProps, ModalTypes } from "models";
import { FilterSongActionProps } from "mapping";
import { SongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles";

import { SongCatalogProps } from "store/containers/catalogs/SongCatalogContainer";
import { SongFilterComponent } from "components/filters";
import SongCatalogNodeComponent from "components/nodes/songCatalogNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import AddButton from "components/common/AddButton/addButton";

const SongCatalogComponent = (props: SongCatalogProps): JSX.Element => {
    const {
        songCatalog,
        history,

        setSongFilter,
        fetchSongCatalog,
        fetchSongCatalogNextLink,
        setModal,
    } = props;

    //initial refresh
    useEffect(() => {
        const filter = FilterSongActionProps.CreateFromSongCatalog(songCatalog)
        fetchSongCatalog(filter)
    }, []);

    useEffect(() => {
        if (songCatalog.Refresh) {
            const filter = FilterSongActionProps.CreateFromSongCatalog(songCatalog)
            fetchSongCatalog(filter)
        }
    }, [songCatalog.Refresh]);


    const songCatalogDef = SongCatalogHtmlAttributesConfiguration;

    const handleScrollDown = () => {
        const { OData } = songCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchSongCatalogNextLink(actionProps)
        }, 500);
    }

    const handleShowAddSong = () => {
        
        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/songModal'


        history.push({
            pathname: pathName,
            search: `?$type=${type}`,
            state: { background: history.location }
        })
    }

    return (
        // <ContentWrapper>
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
                                            <SongFilterComponent
                                                filter={songCatalog.Filter}
                                                setSongFilter={setSongFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewSong" onClick={handleShowAddSong}>New Song</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={songCatalogDef.NodeList.ControlId} >
                                    {songCatalog.OData.Count}
                                    <InfiniteScroll
                                        dataLength={songCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={songCatalog.Values.size < songCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget={songCatalogDef.NodeList.ControlId}
                                    >

                                        {Array.from(songCatalog.Values.values()).map((song, index) => (
                                            <SongCatalogNodeComponent
                                                history={history}
                                                setModal={setModal}
                                                key={song.Id}
                                                song={song}
                                                index={index}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddSong} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
        // </ContentWrapper>
    );
};

export default SongCatalogComponent;
