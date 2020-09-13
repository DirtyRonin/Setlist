import React from "react";
import { Button, Navbar, Nav, Form, FormControl, Col, FormControlProps } from "react-bootstrap";
import { IStatusSongCatalogActionProps, CatalogTypes, IStatusBandCatalogActionProps, DisplayIn, IComponentOrder, NodeTypes } from "../../models";
import { SongCatalog, BandCatalog } from "../../mapping";
import { DropDownFilterComponent } from "./DropDownFilter";
import DropDownFilter from "../../store/subStores/subContainers/DropDownFilterContainer"

export interface IMenuTopProps {
    componentsOrder: IComponentOrder[]
    openSongsCatalog(props: IStatusSongCatalogActionProps): void
    closeSongsCatalog(props: IStatusSongCatalogActionProps): void
    openBandsCatalog(props: IStatusBandCatalogActionProps): void
    closeBandsCatalog(props: IStatusBandCatalogActionProps): void

}

const MenuTopComponent = (props: IMenuTopProps): JSX.Element => {

    const {
        componentsOrder,
        closeSongsCatalog,
        openSongsCatalog,
        openBandsCatalog,
        closeBandsCatalog,
    } = props

    const songCatalogMenuId = `MenuId_${SongCatalog.CatalogId}`
    const bandCatalogMenuId = `MenuId_${BandCatalog.CatalogId}`


    const isCatalogOpen = (catalogId: string): boolean =>
        componentsOrder[-1] && componentsOrder[-1].id === catalogId


    const isSongCatalogOpen = isCatalogOpen(SongCatalog.CatalogId)
    const isBandCatalogOpen = isCatalogOpen(BandCatalog.CatalogId)

    const handleSongCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[songCatalogMenuId].checked

        const props: IStatusSongCatalogActionProps = { show, catalogType: CatalogTypes["Song Catalog"], catalogId: SongCatalog.CatalogId, displayIn: DisplayIn.Main, nodeType: NodeTypes.Edit }
        if (props.show) {
            openSongsCatalog(props)
        }
        else {
            closeSongsCatalog(props);
        }
    }

    const handleBandCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[bandCatalogMenuId].checked

        const props: IStatusBandCatalogActionProps = { show, catalogType: CatalogTypes["Band Catalog"], catalogId: BandCatalog.CatalogId, displayIn: DisplayIn.Main, nodeType: NodeTypes.Edit }
        if (props.show) {
            openBandsCatalog(props)
        }
        else {
            closeBandsCatalog(props);
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                    <DropDownFilter />
                    <Form.Row>
                        <Form.Group as={Col} controlId={songCatalogMenuId}  >
                            <Form.Check type="switch" checked={isSongCatalogOpen} label="Songs" onChange={handleSongCatalogStatus} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={bandCatalogMenuId}  >
                            <Form.Check type="switch" checked={isBandCatalogOpen} label="Bands" onChange={handleBandCatalogStatus} />
                        </Form.Group>
                    </Form.Row>

                </Form>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form >


            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuTopComponent