import React from "react"
import { IModalSong, IModal, ISongEntityActionProps, defaultModal } from "../../models"
import { Modal, Button } from "react-bootstrap"

export interface IAddToCatalogModalComponent {
    modal: IModalSong
    setModal(props: IModal): void
    executeSongModalAction(props: ISongEntityActionProps): void
    BandCatalogComponent: JSX.Element
}

export const AddToCatalogModalComponent = (props: IAddToCatalogModalComponent) => {
    const { modal, setModal, executeSongModalAction, BandCatalogComponent } = props

    const handleCloseModal = () => {
        setModal(defaultModal);
    }

    return <Modal show={true} >
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