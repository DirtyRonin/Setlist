import React, { useEffect, useState } from "react";
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
import { GetSetlistByIdRequestAsync } from "api/setlistApi";


const SetlistSongCatalogComponent = (props: SetlistSongCatalogProps): JSX.Element => {

    const {
        setlistSongCatalog,
        history,

        setSetlistSongFilter,
        fetchSetlistSongCatalog,
        fetchSetlistSongCatalogNextLink,
        setModal,
        setSetlistSongsOrder
    } = props

    useEffect(() => {
        const filter = FilterSetlistSongActionProps.CreateFromCatalog(setlistSongCatalog)
        fetchSetlistSongCatalog(filter)
        fetchSetlist(filter.filter.SetlistId)
    }, []);

    useEffect(() => {
        if (setlistSongCatalog.Refresh) {
            const filter = FilterSetlistSongActionProps.CreateFromCatalog(setlistSongCatalog)
            fetchSetlistSongCatalog(filter)
        }
    }, [setlistSongCatalog.Refresh]);

    const fetchSetlist = (id: number) => {
        GetSetlistByIdRequestAsync(id).then(
            result => {
                const { customEventId, title } = result;
                setCuomstEventId(+ customEventId)
                setSetlistTitle(title)
            })
    }

    const [customEventId, setCuomstEventId] = useState(0)
    const [setlistTitle, setSetlistTitle] = useState('')


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
            search: `?$type=${type}&$setlistId=${setlistSongCatalog.SetlistId}&$customEventId=${customEventId}`,
            state: { background: history.location }
        })
    }

    const handleShowAddSetlistSong = () => createModal(ModalTypes.Add, '/AddSetlistSongFromSongs')
    const handleShowCompareWithPriorSetlists = () => createModal(ModalTypes.Add, '/setlistEditorModal')

    return <div >

        <Container fluid>
            <Row>
                <Col >
                    <ContainerCss >
                        <Row>
                            <Col>
                                <Header >
                                    <HeaderTitle>{setlistTitle}</HeaderTitle>

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
                                            <MenuItem value="NewSetlistSong" onClick={handleShowCompareWithPriorSetlists}>Compare with Prior Setlists</MenuItem>
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
                                                setSetlistSongsOrder={setSetlistSongsOrder}
                                                setlistSong={setlistSong}
                                                index={index}
                                                key={`${setlistSongCatalog.Id}_${setlistSong.songId}`}
                                                setModal={setModal}
                                                history={history}
                                                setlistSongsCount={setlistSongCatalog.Meta.Count}
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