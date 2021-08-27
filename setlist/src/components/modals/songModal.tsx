import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { ModalTypes, ISong, songModalActions } from "models";
import { Song } from "mapping";
import { fetchSongById } from "service";
import { mapQuery } from "utils/routeQueryHelper";
import { GetModalTypeByString ,IsModalReadonly} from "utils";
import { SongModalHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";

export interface ISongModalComponent {
    handleCloseModal(): void
    songModalActionsProvider: songModalActions
    query: string
}

const SongModalComponent = (props: ISongModalComponent) => {

    const { query, handleCloseModal, songModalActionsProvider } = props

    const [song, setSong] = useState(Song.EmptySong())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchSongById(mapped.id).then(result => {
                setSong(result)
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

    const songDef = SongModalHtmlAttributesConfiguration;

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _song = GetSongForModalType(type, elements)
        const executeSongModalAction = songModalActionsProvider[type]

        executeSongModalAction({ value: _song } )

        if (type !== "New")
            handleCloseModal()
    };

    const GetSongForModalType = (type: ModalTypes, elements: any) => {
        const _song = {
            ...song,
            Artist: elements[songDef.Artist.ControlId].value,
            Title: elements[songDef.Title.ControlId].value,
            Genre: elements[songDef.Genre.ControlId].value
        } as ISong

        if (type !== "New") {
            _song.Id = id
        }

        return _song;
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
                        <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                            <Form.Label>{songDef.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={song.Title} placeholder={songDef.Title.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                            <Form.Label>{songDef.Artist.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={song.Artist} placeholder={songDef.Artist.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={songDef.Genre.ControlId}>
                            <Form.Label>{songDef.Genre.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={song.Genre} placeholder={songDef.Genre.Placeholder}></Form.Control>
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

export default SongModalComponent