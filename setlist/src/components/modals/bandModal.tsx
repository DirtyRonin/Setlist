import React from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"
import { BandModalHtmlAttributesConfiguration } from "../../Configuration";
import { IModal, ModalTypes, defaultModal, IBandEntityActionProps, IBand } from "../../models";
import { Band } from "../../mapping";
import { IModalBand } from "../../models/modals/modelBand";
import { IsModalReadonly } from "../../Util";

export interface IBandModalComponent {
    modal: IModalBand
    setModal(props: IModal): void
    executeBandModalAction(props: IBandEntityActionProps): void
}

export const BandModalComponent = (props: IBandModalComponent) => {

    const { modal, setModal, executeBandModalAction } = props

    const bandModalDef = BandModalHtmlAttributesConfiguration;

    const handleCloseModal = () => {
        setModal(defaultModal);
    }

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const band = GetBandForModalType(modal.type, elements)

        if (modal.catalogId)
            executeBandModalAction({ value: band, catalogId: modal.catalogId } as IBandEntityActionProps)
    };

    const GetBandForModalType = (type: ModalTypes, elements: any):IBand => {
        const band = {
            ...Band.EmptyBand(),
            Title: elements[bandModalDef.Title.ControlId].value,
        } as IBand

        if (type != ModalTypes.New) {
            band.Id = modal.value.Id
        }

        return band;
    }

    const IsReadonly = IsModalReadonly(modal.type)

    return <Modal show={modal.show} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{modal.type}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={hanldeOnClick} method="GET">
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={bandModalDef.Title.ControlId}>
                            <Form.Label>{bandModalDef.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Title} placeholder={bandModalDef.Title.Placeholder}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" type="submit" >{modal.type}</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    </Modal>
}