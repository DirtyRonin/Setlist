import React from "react"
import { Modal, Button } from "react-bootstrap"
import { IModal } from "../../models"

export interface ICatalogModal {
    popCatalogsOrder(): void
    catalog: JSX.Element
    modal: IModal
}

export const CatalogModalComponent = (props: ICatalogModal) => {
    const { catalog, modal, popCatalogsOrder } = props

    const handleCloseModal = () => {
        popCatalogsOrder();
    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>{modal.type}</Modal.Title>
            </Modal.Header>
            <div>
                <Modal.Body>
                    {catalog}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </div>
        </Modal.Dialog>
    </Modal>
}