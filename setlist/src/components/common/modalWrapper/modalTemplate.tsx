
import React, { FunctionComponent } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

interface IModalTemplateProps {
    title: string
    handleCloseModal: () => void
    // handleOnClick(event: React.FormEvent<FormControlProps>): void
    // actionButton: {
    //     isVisible: boolean
    //     label: string
    // }
}

const ModalTemplate: FunctionComponent<IModalTemplateProps> = ({ title, handleCloseModal, children }) => {
    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            {children}

            {/* <Form onSubmit={handleOnClick} method="GET">
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    {isVisible && <Button variant="primary" type="submit" >{label}</Button>}
                </Modal.Footer>
            </Form> */}
        </Modal.Dialog>
    </Modal>
}

export default ModalTemplate