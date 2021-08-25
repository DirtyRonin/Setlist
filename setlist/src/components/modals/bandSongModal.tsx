import React, { useEffect, useState } from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"

import { BandSongModalHtmlAttributesConfiguration } from "configuration";
import { ModalTypes, IBandSong, bandSongModalActions } from "models";
import { BandSong } from "mapping";
import { mapQuery, GetModalTypeByString, IsModalReadonly } from "utils";
import { fetchBandSongById } from "service";

export interface IBandSongModalComponent {
    handleCloseModal(): void
    bandSongModalActionsProvider: bandSongModalActions
    query: string
}

const BandSongModalComponent = (props: IBandSongModalComponent) => {

    const { query, handleCloseModal, bandSongModalActionsProvider } = props

    const [bandSong, setBandSong] = useState(BandSong.EmptyBandSong())
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<ModalTypes>(ModalTypes.None)
    const [id, setId] = useState('')

    const htmlConfig = BandSongModalHtmlAttributesConfiguration;

    useEffect(() => {
        if (query) {
            const mapped = mapQueryRoute(query)

            setType(mapped.type)
            setId(mapped.id)
            setIsLoading(true)


            fetchBandSongById(mapped.id).then(result => {
                setBandSong(result)
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

    const handlePopularityOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        const Popularity: number = +target.value

        if (bandSong.Popularity !== Popularity) {
            setBandSong({
                ...bandSong,
                Popularity
            })
        }
    }

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const _bandSong = GetBandSongForModalType(type, elements)
        const executeBandSongModalAction = bandSongModalActionsProvider[type]

        executeBandSongModalAction({ value: _bandSong })

        if (type !== "New")
            handleCloseModal()
    };

    const GetBandSongForModalType = (type: ModalTypes, elements: any) => {
        const _bandSong = {
            ...bandSong,
            Popularity: +elements[htmlConfig.Popularity.ControlId].value
        } as IBandSong

        if (type !== "New") {
            _bandSong.Id = id
        }

        return _bandSong;
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
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Title.ControlId}>
                            <Form.Label>{htmlConfig.Title.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={bandSong.Song.Title} placeholder={htmlConfig.Title.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Artist.ControlId}>
                            <Form.Label>{htmlConfig.Artist.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={bandSong.Song.Artist} placeholder={htmlConfig.Artist.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Genre.ControlId}>
                            <Form.Label>{htmlConfig.Genre.Label}</Form.Label>
                            <Form.Control readOnly={true} type="text" defaultValue={bandSong.Song.Genre} placeholder={htmlConfig.Genre.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Popularity.ControlId}>
                            <Form.Label>{htmlConfig.Popularity.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="number" value={bandSong.Popularity} onChange={handlePopularityOnChange} />
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

export default BandSongModalComponent