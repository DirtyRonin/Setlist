import React from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { SetlistModalHtmlAttributesConfiguration } from "../../Configuration";
import { Setlist } from "../../mapping";
import { IModalSetlist, ISetlist, ISetlistEntityActionProps, ModalTypes } from "../../models";
import { IsModalReadonly } from "../../Util";

export interface ISetlistModalComponent {
    modal: IModalSetlist
    popCatalogsOrder(): void
    executeSetlistModalAction(props: ISetlistEntityActionProps): void
}

export const SetlistModalComponent = (props: ISetlistModalComponent) => {

    const { modal, popCatalogsOrder , executeSetlistModalAction } = props

    const setlistModalDef = SetlistModalHtmlAttributesConfiguration

    const handleCloseModal = () => {
        popCatalogsOrder();
    }

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const setlist = GetSetlistForModalType(modal.type, elements)

        if (modal.catalogId)
            executeSetlistModalAction({ value: setlist, catalogId: modal.catalogId } as ISetlistEntityActionProps)

        if (modal.type !== "New")
            handleCloseModal()
    };

    const GetSetlistForModalType = (type: ModalTypes, elements: any): ISetlist => {
        const setlist = {
            ...Setlist.EmptySetlist(),
            Title: elements[setlistModalDef.Title.ControlId].value,
            Comment: elements[setlistModalDef.Comment.ControlId].value,
        } as ISetlist

        if (type !== "New") {
            setlist.Id = modal.value.Id
        }

        return setlist;
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
                    <Form.Group as={Col} md="4" controlId={setlistModalDef.Title.ControlId}>
                        <Form.Label>{setlistModalDef.Title.Label}</Form.Label>
                        <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Title} placeholder={setlistModalDef.Title.Placeholder}></Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId={setlistModalDef.Comment.ControlId}>
                        <Form.Label>{setlistModalDef.Comment.Label}</Form.Label>
                        <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Comment} placeholder={setlistModalDef.Comment.Placeholder}></Form.Control>
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