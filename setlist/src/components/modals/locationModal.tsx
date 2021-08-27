import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { ILocation, locationModalActions, ModalTypes } from "models";
import { fetchLocationById } from "service";
import { Location } from "mapping";
import { LocationModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/locationHtmlAttributes";
import { mapQuery, GetModalTypeByString, IsModalReadonly } from "utils";

export interface ILocationModalComponent {
    handleCloseModal(): void
    locationModalActionsProvider: locationModalActions
    query: string
}

const LocationModalComponent = ({ handleCloseModal, locationModalActionsProvider, query }: ILocationModalComponent) => {

    const [location, setLocation] = useState(Location.EmptyLocation())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchLocationById(mapped.id).then(result => {
                setLocation(result)
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

    const htmlConfig = LocationModalHtmlAttributesConfiguration;

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _song = GetLocationForModalType(type, elements)
        const executeLocationModalAction = locationModalActionsProvider[type]

        executeLocationModalAction({ value: _song })

        if (type !== "New")
            handleCloseModal()
    };

    const GetLocationForModalType = (type: ModalTypes, elements: any) => {
        const _location: ILocation = {
            ...location,
            Name: elements[htmlConfig.Name.ControlId].value,
            Address: elements[htmlConfig.Address.ControlId].value,
        }

        if (type !== "New") {
            _location.Id = id
        }

        return _location;
    }

    const IsReadonly = IsModalReadonly(type)

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog >
            <Modal.Header closeButton>
                <Modal.Title>{type}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={hanldeOnClick} method="GET">
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Name.ControlId}>
                            <Form.Label>{htmlConfig.Name.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={location.Name} placeholder={htmlConfig.Name.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Address.ControlId}>
                            <Form.Label>{htmlConfig.Address.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={location.Address} placeholder={htmlConfig.Address.Placeholder}></Form.Control>
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

export default LocationModalComponent