import React from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"
import { SongModalHtmlAttributesConfiguration } from "../../Configuration";
import { IModal, ModalTypes, defaultModal, ISongEntityActionProps, ISong, IModalSong } from "../../models";
import { Song } from "../../mapping";
import { IsModalReadonly } from "../../Util";

export interface ISongModalComponent {
    modal: IModalSong
    setSongModal(props: IModal): void
    executeSongModalAction(props: ISongEntityActionProps): void
}

export const SongModalComponent = (props: ISongModalComponent) => {

    const { modal, setSongModal, executeSongModalAction } = props

    const songDef = SongModalHtmlAttributesConfiguration;

    const handleCloseModal = () => {
        setSongModal(defaultModal);
    }

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const song = GetSongForModalType(modal.type, elements)

        if (modal.catalogId)
            executeSongModalAction({ value: song, catalogId: modal.catalogId } as ISongEntityActionProps)
    };

    const GetSongForModalType = (type: ModalTypes, elements: any) => {
        const song = {
            ...Song.EmptySong(),
            Artist: elements[songDef.Artist.ControlId].value,
            Title: elements[songDef.Title.ControlId].value,
            Genre: elements[songDef.Genre.ControlId].value
        } as ISong

        if (type !== ModalTypes.New) {
            song.Id = modal.value.Id
        }

        return song;
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
                        <Form.Group as={Col} md="4" controlId={songDef.Title.ControlId}>
                            <Form.Label>{songDef.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Title} placeholder={songDef.Title.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={songDef.Artist.ControlId}>
                            <Form.Label>{songDef.Artist.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Artist} placeholder={songDef.Artist.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={songDef.Genre.ControlId}>
                            <Form.Label>{songDef.Genre.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Genre} placeholder={songDef.Genre.Placeholder}></Form.Control>
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