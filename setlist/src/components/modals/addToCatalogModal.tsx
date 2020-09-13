import React from "react"
import { IModalSong, IModal, ISongEntityActionProps, defaultModal } from "../../models"
import { Modal, Button } from "react-bootstrap"

export interface IAddToCatalogModalComponent {
    modal: IModalSong
    popCatalogsOrder(): void
    executeSongModalAction(props: ISongEntityActionProps): void
    BandCatalogComponent: JSX.Element
}



export const AddToCatalogModalComponent = (props: IAddToCatalogModalComponent) => {
    const { modal, popCatalogsOrder, executeSongModalAction, BandCatalogComponent } = props

    const handleCloseModal = () => {
        popCatalogsOrder();
    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Test</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {BandCatalogComponent}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>

        </Modal.Dialog>
    </Modal>
}