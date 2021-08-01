import React from "react";
import { Button, Navbar, Nav, Form, FormControl, Col } from "react-bootstrap";
import { IStatusSongCatalogActionProps, CatalogTypes, IStatusBandCatalogActionProps, DisplayIn, IComponentOrder } from "../../models";
import { SongCatalog, BandCatalog, SetlistCatalog, SetlistSongCatalog } from "../../mapping";
import GlobalBandFilter from "../../store/containers/layoutContainers/GlobalBandFilterContainer"

export interface IMenuTopProps {
    componentsOrder: IComponentOrder[]
    openSongsCatalog(): void
    closeSongsCatalog(): void
    openBandsCatalog(): void
    closeBandsCatalog(): void
    openSetlistCatalog(): void
    closeSetlistCatalog(): void
    openSetlistSongCatalog(): void
    closeSetlistSongCatalog(): void
}

const MenuTopComponent = (props: IMenuTopProps): JSX.Element => {

    const {
        componentsOrder,
        closeSongsCatalog,
        openSongsCatalog,
        openBandsCatalog,
        closeBandsCatalog,
        openSetlistCatalog,
        closeSetlistCatalog,
        openSetlistSongCatalog,
        closeSetlistSongCatalog
    } = props

    const songCatalogMenuId = `MenuId_${SongCatalog.CatalogId}`
    const bandCatalogMenuId = `MenuId_${BandCatalog.CatalogId}`
    const setlistCatalogMenuId = `MenuId_${SetlistCatalog.CatalogId}`
    const setlistSongCatalogMenuId = `MenuId_${SetlistSongCatalog.CatalogId}`


    const isCatalogOpen = (catalogId: string): boolean =>
        componentsOrder[-1] && componentsOrder[-1].id === catalogId


    const isSongCatalogOpen = isCatalogOpen(SongCatalog.CatalogId)
    const isBandCatalogOpen = isCatalogOpen(BandCatalog.CatalogId)
    const isSetlistCatalogOpen = isCatalogOpen(SetlistCatalog.CatalogId)
    const isSetlistSongCatalogOpen = isCatalogOpen(SetlistSongCatalog.CatalogId)

    const handleSongCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[songCatalogMenuId].checked

        const props: IStatusSongCatalogActionProps = { show, catalogType: CatalogTypes["Song Catalog"], catalogId: SongCatalog.CatalogId, displayIn: DisplayIn.Main }
        if (props.show) {
            openSongsCatalog()
        }
        else {
            closeSongsCatalog();
        }
    }

    const handleBandCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[bandCatalogMenuId].checked

        const props: IStatusBandCatalogActionProps = { show, catalogType: CatalogTypes["Band Catalog"], catalogId: BandCatalog.CatalogId, displayIn: DisplayIn.Main }
        if (props.show) {
            openBandsCatalog()
        }
        else {
            closeBandsCatalog();
        }
    }

    const handleSetlistCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[setlistCatalogMenuId].checked

        if (show) {
            openSetlistCatalog()
        }
        else {
            closeSetlistCatalog();
        }
    }

    const handleSetlistSongCatalogStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const elements: any = (event.target as any).form.elements;
        const show: boolean = elements[setlistSongCatalogMenuId].checked

        if (show) {
            openSetlistSongCatalog()
        }
        else {
            closeSetlistSongCatalog();
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                    <GlobalBandFilter />
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
                    <Form.Row>
                        <Form.Group as={Col} controlId={setlistCatalogMenuId}  >
                            <Form.Check type="switch" checked={isSetlistCatalogOpen} label="Setlist" onChange={handleSetlistCatalogStatus} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId={setlistSongCatalogMenuId}  >
                            <Form.Check type="switch" checked={isSetlistSongCatalogOpen} label="SetlistSong" onChange={handleSetlistSongCatalogStatus} />
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