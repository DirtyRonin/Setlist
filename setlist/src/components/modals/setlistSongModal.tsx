import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { ISetlistSong, ModalTypes, setlistSongModalActions } from "models"
import { SetlistSong } from "mapping"
import { mapQuery, GetModalTypeByString } from "utils"
import { SetlistSongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistSongHtmlAttributes"
import { fetchSetlistSongById } from "service"

export interface ISetlistSongModalComponent {
    handleCloseModal(): void
    setlistSongModalActionsProvider: setlistSongModalActions
    query: string
}

const SetlistSongModalComponent= (props : ISetlistSongModalComponent) => {

    const { query, handleCloseModal, setlistSongModalActionsProvider } = props

    const [setlistSong, setSetlistSong] = useState(SetlistSong.EmptySetlistSong())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchSetlistSongById(mapped.id).then(result => {
                setSetlistSong(result)
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

    const htmlConfig = SetlistSongModalHtmlAttributesConfiguration

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _setlistSong = GetSetlistSongForModalType(type, elements)
        const executeSetlistModalAction = setlistSongModalActionsProvider[type]

        executeSetlistModalAction({ value: _setlistSong })

        if (type !== "New")
            handleCloseModal()
    };

    const GetSetlistSongForModalType = (type: ModalTypes, elements: any) => {
        const _setlistSong : ISetlistSong = {
            ...setlistSong
        } 

        if (type !== "New") {
            _setlistSong.Id = id
        }

        return _setlistSong;
    }

    return <Modal show={true} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{type}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={hanldeOnClick} method="GET">
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Title.ControlId}>
                            <Form.Label>{htmlConfig.Title.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={setlistSong.Song.Title} placeholder={htmlConfig.Title.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Artist.ControlId}>
                            <Form.Label>{htmlConfig.Artist.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={setlistSong.Song.Artist} placeholder={htmlConfig.Artist.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Genre.ControlId}>
                            <Form.Label>{htmlConfig.Genre.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={setlistSong.Song.Genre} placeholder={htmlConfig.Genre.Placeholder}></Form.Control>
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

export default SetlistSongModalComponent