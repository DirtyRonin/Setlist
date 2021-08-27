import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { Setlist } from "mapping";
import { ISetlist, ModalTypes, setlistModalActions } from "models";
import { GetModalTypeByString, IsModalReadonly, mapQuery } from "utils";
import { fetchSetlistById } from "service";
import { SetlistModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistHtmlAttributes";

export interface ISetlistModalComponent {
    handleCloseModal(): void
    setlistModalActionsProvider: setlistModalActions
    query: string
}

const SetlistModalComponent = (props: ISetlistModalComponent) => {

    const { query, handleCloseModal, setlistModalActionsProvider } = props

    const [setlist, setSetlist] = useState(Setlist.EmptySetlist())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchSetlistById(mapped.id).then(result => {
                setSetlist(result)
                setIsLoading(false)
            })
        }
    }, [])

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? ''

        return { type: _type, id: _id }
    }


    const setlistModalDef = SetlistModalHtmlAttributesConfiguration

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _setlist = GetSetlistForModalType(type, elements)
        const executeSetlistModalAction = setlistModalActionsProvider[type]

        executeSetlistModalAction({ value: _setlist })

        if (type !== "New")
            handleCloseModal()
    };

    const GetSetlistForModalType = (type: ModalTypes, elements: any): ISetlist => {
        const _setlist = {
            ...setlist,
            Title: elements[setlistModalDef.Title.ControlId].value,
            Comment: elements[setlistModalDef.Comment.ControlId].value,
        } as ISetlist

        if (type !== "New") {
            _setlist.Id = id
        }

        return _setlist;
    }

    const IsReadonly = IsModalReadonly(type)

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{type}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={hanldeOnClick} method="GET">
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={setlistModalDef.Title.ControlId}>
                            <Form.Label>{setlistModalDef.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={setlist.Title} placeholder={setlistModalDef.Title.Placeholder}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={setlistModalDef.Comment.ControlId}>
                            <Form.Label>{setlistModalDef.Comment.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={setlist.Comment} placeholder={setlistModalDef.Comment.Placeholder}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" type="submit" >{type}</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    </Modal>
}

export default SetlistModalComponent