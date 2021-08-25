import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"
import { BandModalHtmlAttributesConfiguration } from "configuration";
import { ModalTypes, IBand } from "models";
import { Band } from "mapping";
import { bandModalActions } from "models/modals/modelBand";
import { GetModalTypeByString, IsModalReadonly } from "utils";
import { mapQuery } from "utils/routeQueryHelper";
import { fetchBandById } from "service";

export interface IBandModalComponent {
    handleCloseModal(): void
    bandModalActionsProvider: bandModalActions
    query: string
}

const BandModalComponent = (props: IBandModalComponent) => {

    const { query, handleCloseModal, bandModalActionsProvider } = props


    const [band, setBand] = useState(Band.EmptyBand())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchBandById(mapped.id).then(result => {
                setBand(result)
                setIsLoading(false)
            })
        }
    }, [])

    //query: "?$type=Read&$id=80968fa2-312c-469f-9115-619d2fef06d5"

    const mapQueryRoute = (query: String) => {
        const args = mapQuery(query)
        const _type = GetModalTypeByString(args.get('type') ?? '')
        const _id = args.get('id') ?? ''

        return { type: _type, id: _id }
    }

    const bandModalDef = BandModalHtmlAttributesConfiguration;

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _band = GetBandForModalType(type, elements)
        const executeBandModalAction = bandModalActionsProvider[type]

        executeBandModalAction({ value: _band })

        if (type !== "New")
            handleCloseModal()
    };

    const GetBandForModalType = (type: ModalTypes, elements: any): IBand => {
        const _band = {
            ...band,
            Title: elements[bandModalDef.Title.ControlId].value,
        } as IBand

        if (type !== "New") {
            _band.Id = id
        }

        return _band;
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
                        <Form.Group as={Col} md="4" controlId={bandModalDef.Title.ControlId}>
                            <Form.Label>{bandModalDef.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={band.Title} placeholder={bandModalDef.Title.Placeholder}></Form.Control>
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
export default BandModalComponent