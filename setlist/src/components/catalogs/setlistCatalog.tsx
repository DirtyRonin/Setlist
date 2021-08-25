import React from "react";
import { useEffect } from "react";
import { Col, Container, Navbar, Row, FormControlProps, Button } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";

import { SetlistCatalogHtmlAttributesConfiguration } from "configuration";
import { ContainerCss, NodeListCss, SongFilterCss } from "styles";
import { FilterSetlistActionProps } from "mapping";
import { SetlistCatalogProps } from "store/containers/catalogs/SetlistCatalogContainer";
import { INextLinkActionProps, ModalTypes } from "models";
import { SetlistFilterComponent } from "components/filters";
import SetlistCatalogNodeComponent from "components/nodes/setlistCatalogNode";




const SetlistCatalogComponent = (props: SetlistCatalogProps): JSX.Element => {
    const {
        setlistCatalog,
        history,

        setSetlistFilter,
        fetchSetlistCatalog,
        fetchSetlistCatalogNextLink,
        setModal,
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

    const handleShowAddSetlist = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();
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
                                <NodeListCss id={setlistCatalogDef.NodeList.ControlId} >
                                    <Navbar sticky="top" collapseOnSelect expand={false} bg="light" variant="light">
                                        <Navbar.Brand >{setlistCatalog.Title}</Navbar.Brand>
                                        <Navbar.Toggle aria-controls={setlistCatalogDef.Navbar.ControlId} />
                                        <Navbar.Collapse id={setlistCatalogDef.Navbar.ControlId}>
                                            <Row>
                                                <Col sm="6">
                                                    <SongFilterCss>
                                                        <SetlistFilterComponent
                                                            CatalogId={setlistCatalog.Id}
                                                            Filter={setlistCatalog.Filter}
                                                            setSetlistFilter={setSetlistFilter}
                                                        />
                                                    </SongFilterCss>
                                                </Col>
                                                <Col sm="6">
                                                    <Button variant="secondary" onClick={handleShowAddSetlist}>New Setlist</Button>
                                                </Col>
                                            </Row>
                                        </Navbar.Collapse>
                                    </Navbar>
                                    <InfiniteScroll
                                        dataLength={setlistCatalog.Values.size}
                                        next={handleScrollDown}
                                        hasMore={setlistCatalog.Values.size < setlistCatalog.OData.Count}
                                        loader={<h4>Loading...</h4>}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        scrollableTarget={setlistCatalogDef.NodeList.ControlId}
                                    >
                                        {Array.from(setlistCatalog.Values.values()).map((setlist, index) => (
                                            <SetlistCatalogNodeComponent
                                                setlist={setlist}
                                                key={setlist.Id}
                                                index={index}
                                                history={history}
                                                setModal={setModal}
                                            />
                                        ))}
                                    </InfiniteScroll>
                                </NodeListCss>
                                {setlistCatalog.OData.Count}
                            </Col>
                        </Row>
                    </ContainerCss>
                </Col>
            </Row>
        </Container>
    </div>
}

export default SetlistCatalogComponent;