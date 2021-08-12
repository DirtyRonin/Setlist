import React from "react"
import { IModalSong, IModal, ISongEntityActionProps, defaultModal } from "../../models"
import { Modal, Button } from "react-bootstrap"
import AddSongToBand from "./AddItemTo/band/AddSongToBand"

export interface IAddToCatalogModalComponent {
    modal: IModalSong
    popCatalogsOrder(): void
    executeSongModalAction(props: ISongEntityActionProps): void
    BandCatalogComponent: JSX.Element
    userid:string
}



export const AddToCatalogModalComponent = (props: IAddToCatalogModalComponent) => {
    const { modal, popCatalogsOrder, executeSongModalAction, BandCatalogComponent,userid } = props

    const handleCloseModal = () => {
        popCatalogsOrder();
    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Test</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <AddSongToBand 
                song={modal.value}
                userId={userid}
            />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>

        </Modal.Dialog>
    </Modal>
}