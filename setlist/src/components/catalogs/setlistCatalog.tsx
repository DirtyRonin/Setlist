import React, { useEffect }  from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MenuDivider, MenuHeader, Menu, MenuItem } from "@szhsin/react-menu";
import InfiniteScroll from "react-infinite-scroll-component";


import { SetlistCatalogHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistHtmlAttributes";
import { ContainerCss, Header, HeaderOptions, HeaderTitle, NodeListCss, SearchFilterCss } from "styles";
import { FilterSetlistActionProps } from "mapping";
import { SetlistCatalogProps } from "store/containers/catalogs/SetlistCatalogContainer";
import { INextLinkActionProps, ModalTypes } from "models";
import { SetlistFilterComponent } from "components/filters";
import SetlistCatalogNodeComponent from "components/nodes/setlistCatalogNode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "components/common/AddButton/addButton";




const SetlistCatalogComponent = (props: SetlistCatalogProps): JSX.Element => {
    const {
        setlistCatalog,
        history,

        setSetlistFilter,
        fetchSetlistCatalog,
        fetchSetlistCatalogNextLink,
        setModal,
        setSetlistIdForSetlistSong,
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
        const { OData } = setlistCatalog
        const actionProps: INextLinkActionProps = { nextLink: OData.NextLink }

        setTimeout(() => {
            fetchSetlistCatalogNextLink(actionProps)
        }, 500);

    }

    const handleShowAddSetlist = () => {

        setModal({ showModal: true })

        const type: ModalTypes = ModalTypes.New
        const pathName: string = '/setlistModal'


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
                                            <SetlistFilterComponent
                                                Filter={setlistCatalog.Filter}
                                                setSetlistFilter={setSetlistFilter}
                                            />
                                        </SearchFilterCss>
                                        <Menu menuButton={<div ><FontAwesomeIcon icon={['fas', "ellipsis-h"]} size="1x" /></div>}>
                                            <MenuItem value="Options"  >Options*</MenuItem>
                                            <MenuDivider />
                                            <MenuHeader>Edit</MenuHeader>
                                            <MenuItem value="NewSetlist" onClick={handleShowAddSetlist}>New Setlist</MenuItem>
                                        </Menu>
                                    </HeaderOptions>
                                </Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <NodeListCss id={setlistCatalogDef.NodeList.ControlId} >
                                    {setlistCatalog.OData.Count}
                                    <InfiniteScroll
                                        dataLength={setlistCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={setlistCatalog.Values.size < setlistCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        scrollableTarget={setlistCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(setlistCatalog.Values.values()).map((setlist, index) => (
                                            <SetlistCatalogNodeComponent
                                                setSetlistIdForSetlistSong={setSetlistIdForSetlistSong}
                                                setlist={setlist}
                                                key={setlist.Id}
                                                index={index}
                                                history={history}
                                                setModal={setModal}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                <AddButton onClick={handleShowAddSetlist} />
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default SetlistCatalogComponent;