import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import styled from "styled-components";
import { CatalogTypes, IModalSong, IBandSongCatalog, IModalBandSong, DisplayIn, Catalog, IModal, ModalTypes, IComponentOrder, IReferencedCatalog, IEntityActionProps } from "./models";


import { AppProps } from "./store";
import { SongModalComponent } from "./components/modals/songModal";
import { IModalBand } from "./models/modals/modelBand";
import { BandModalComponent } from "./components/modals/bandModal";

import { BandSongModalComponent } from "./components/modals/bandSongModal";
import BandSongCatalogComponent from "./components/catalogs/bandSongCatalog";
import MenuTopComponent from "./components/layout/menuTop";
import BandCatalogContainer, { IOwnBandCatalogProps } from "./store/containers/catalogs/BandCatalogContainer"
import SongCatalogContainer from "./store/containers/catalogs/SongCatalogContainer"
import { AddToCatalogModalComponent } from "./components/modals/addToCatalogModal";
import { SongCatalog } from "./mapping";

const AppContainer = styled.div`
    display: flex;
    height: 500px;
`;



export const App = (props: AppProps): JSX.Element => {

    const {
        catalogState: { modal, componentsOrder },

        songModalActionsProvider,
        bandModalActionsProvider,
        bandSongModalActionsProvider,

        fetchBandSongCatalog,
        fetchBandSongCatalogNextLink,

        closeSongsCatalog,
        openSongsCatalog,

        openBandsCatalog,
        closeBandsCatalog,

        popCatalogsOrder,
        setModal


    } = props;

    useEffect(() => {
    }, []);

    const onDragEnd = (): void => { };

    const IsBandCatalogContainer = (value: any): value is IOwnBandCatalogProps => true

    const GetComponent = (refProps: IOwnBandCatalogProps): JSX.Element => {
        if (IsBandCatalogContainer(refProps)) {
            return <BandCatalogContainer bandCatalogId={refProps.bandCatalogId} ownNodeProps={refProps.ownNodeProps} />
        } else { return <div></div> }
    }

    const findLatestComponentOrder = (displayType: DisplayIn): IComponentOrder | undefined =>
        componentsOrder && componentsOrder.length > 0 ?
            componentsOrder.filter(order => order.displayIn === displayType).slice(-1)[0] :
            undefined

    const renderComponents = (): JSX.Element[] => {
        const components: JSX.Element[] = []

        const newestCatalogComponent = findLatestComponentOrder(DisplayIn.Main)
        if (newestCatalogComponent) {
            const catalog = newestCatalogComponent.value as Catalog

            if (catalog.CatalogType === CatalogTypes["Song Catalog"]) {
                components.push(<SongCatalogContainer catalogId={catalog.Id} />);
            }
            else if (catalog.CatalogType === CatalogTypes["Band Catalog"]) {
                components.push(GetComponent({bandCatalogId: catalog.Id , ownNodeProps: undefined }));
            }
            else if (catalog.CatalogType === CatalogTypes["BandSong Catalog"]) {
                components.push(
                    <BandSongCatalogComponent
                        fetchBandSongCatalog={fetchBandSongCatalog}
                        fetchBandSongCatalogNextLink={fetchBandSongCatalogNextLink}
                        key={catalog.Id}
                        showModal={modal.show}
                        bandSongCatalog={catalog as IBandSongCatalog}
                        setModal={setModal}
                    />
                )
            }
        }

        if (components.length === 1) {
            const newestModalComponent = findLatestComponentOrder(DisplayIn.Modal)
            if (newestModalComponent) {
                const modal = newestModalComponent.value as IModal
                if (modal.type === ModalTypes.Add && modal.referencedCatalog) {
                    components.push(
                        <SongModalComponent
                            catalog={GetComponent(modal.referencedCatalog)}
                            modal={modal as IModalSong}
                            popCatalogsOrder={popCatalogsOrder}
                            executeSongModalAction={songModalActionsProvider[modal.type]}
                        />


                        // <AddToCatalogModalComponent
                        //     BandCatalogComponent={<BandCatalogContainer />}
                        //     modal={modal as IModalSong}
                        //     popCatalogsOrder={popCatalogsOrder}
                        //     executeSongModalAction={songModalActionsProvider[modal.type]}
                        // />
                    )
                }
                else if (modal.catalogType === CatalogTypes["Song Catalog"]) {
                    components.push(<SongModalComponent
                        modal={modal as IModalSong}
                        popCatalogsOrder={popCatalogsOrder}
                        executeSongModalAction={songModalActionsProvider[modal.type]}
                    />)
                }

                else if (modal.catalogType === CatalogTypes["Band Catalog"]) {
                    components.push(<BandModalComponent
                        modal={modal as IModalBand}
                        popCatalogsOrder={popCatalogsOrder}
                        executeBandModalAction={bandModalActionsProvider[modal.type]}
                    />)
                }
                else if (modal.catalogType === CatalogTypes["BandSong Catalog"]) {
                    components.push(<BandSongModalComponent
                        modal={modal as IModalBandSong}
                        popCatalogsOrder={popCatalogsOrder}
                        executeBandSongModalAction={bandSongModalActionsProvider[modal.type]}
                    />)
                }

            }


        }
        return components
    }






    return (
        <div>
            <Container fluid>
                <MenuTopComponent
                    componentsOrder={componentsOrder}
                    openSongsCatalog={openSongsCatalog}
                    closeSongsCatalog={closeSongsCatalog}
                    openBandsCatalog={openBandsCatalog}
                    closeBandsCatalog={closeBandsCatalog}
                />
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <AppContainer data-testid="DragDropContext">
                            <DragDropContext onDragEnd={onDragEnd}>{renderComponents()}</DragDropContext>
                        </AppContainer>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>




        </div>
    );
};