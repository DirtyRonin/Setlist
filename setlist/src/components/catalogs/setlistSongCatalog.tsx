import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";

import { ContainerCss, Header, HeaderOptions, HeaderTitle, InfinitScrollCss, NodeListCss, SearchFilterCss } from "styles/catalogStyle";

import { SetlistSongCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistSongHtmlAttributes";

import { FilterSetlistSongActionProps } from "mapping";
import { SetlistSongCatalogProps } from "store/containers/catalogs/SetlistSongCatalogContainer";
import SetlistSongCatalogNodeComponent from "components/nodes/setlistSongCatalogNode";
import { INextLinkActionProps, ModalTypes } from "models";

import AddButton from "components/common/AddButton/addButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetlistSongFilterComponent } from "components/filters";


const SetlistSongCatalogComponent = (props: SetlistSongCatalogProps): JSX.Element => {

    const {
        setlistSongCatalog,
        history,

        setSetlistSongFilter,
        fetchSetlistSongCatalog,
        fetchSetlistSongCatalogNextLink,
        setModal,
    } = props

    useEffect(() => {
        const filter = FilterSetlistSongActionProps.CreateFromCatalog(setlistSongCatalog)
        fetchSetlistSongCatalog(filter)
    }, []);

    useEffect(() => {
        if (setlistSongCatalog.Refresh) {
            const filter = FilterSetlistSongActionProps.CreateFromCatalog(setlistSongCatalog)
            fetchSetlistSongCatalog(filter)
        }

    }, [setlistSongCatalog.Refresh]);

    const htmlConfig = SetlistSongCatalogHtmlAttributesConfiguration

    const handleScrollDown = () => {
        const { Meta: { NextLink } } = setlistSongCatalog
        const actionProps: INextLinkActionProps = { nextLink: NextLink }

        setTimeout(() => {
            fetchSetlistSongCatalogNextLink(actionProps)
        }, 500);

    }

    const createModal = (type: ModalTypes, pathName: string = '/') => {

        setModal({ showModal: true })

        history.push({
            pathname: pathName,
            search: `?$type=${type}&$id=${setlistSongCatalog.SetlistId}`,
            state: { background: history.location }
        })
    }

    const handleShowAddSetlistSong = () => createModal(ModalTypes.Add, '/AddSetlistSongFromSongs')

    return <div >

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                                <Header >
                                    <HeaderTitle>Setlist Songs</HeaderTitle>

                                    <HeaderOptions>
                                        <SearchFilterCss>
                                            <SetlistSongFilterComponent
                                                setlistId={setlistSongCatalog.Id}
                                                filter={setlistSongCatalog.Filter}
                                                setSetlistSongFilter={setSetlistSongFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewSetlistSong" onClick={handleShowAddSetlistSong}>Add Songs</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={htmlConfig.NodeList.ControlId} >
                                    {setlistSongCatalog.Meta.Count}
                                    <InfiniteScroll
                                        dataLength={setlistSongCatalog.Values.length}
                                        next={handleScrollDown}
                                        hasMore={setlistSongCatalog.Values.length < setlistSongCatalog.Meta.Count}
                                        loader={<h4>Loading...</h4>}
                                        style={InfinitScrollCss}
                                        scrollableTarget={htmlConfig.NodeList.ControlId}
                                    >
                                        {setlistSongCatalog.Values.map((setlistSong, index) => (
                                            <SetlistSongCatalogNodeComponent
                                                setlistSong={setlistSong}
                                                index={index}
                                                key={`${setlistSongCatalog.Id}_${setlistSong.songId}`}
                                                setModal={setModal}
                                                history={history}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddSetlistSong} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default SetlistSongCatalogComponent