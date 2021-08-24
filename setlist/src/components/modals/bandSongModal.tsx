import React from "react"
import { Modal, Form, Col, Button, FormControlProps } from "react-bootstrap"
import { BandSongModalHtmlAttributesConfiguration } from "../../Configuration";
import { ModalTypes, IBandSongEntityActionProps, IBandSong, IModalBandSong } from "../../models";
import { BandSong } from "../../mapping";
import { IsModalReadonly } from "../../utils";

export interface IBandSongModalComponent {
    modal: IModalBandSong
    handleCloseModal():void
    executeBandSongModalAction(props: IBandSongEntityActionProps): void
}

export const BandSongModalComponent = (props: IBandSongModalComponent) => {

    const { modal, handleCloseModal, executeBandSongModalAction } = props

    const htmlConfig = BandSongModalHtmlAttributesConfiguration;

    

    const hanldeOnClick = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).elements;

        const bandSong = GetBandSongForModalType(modal.type, elements)

        if (modal.catalogId)
            executeBandSongModalAction({ value: bandSong, catalogId: modal.catalogId } as IBandSongEntityActionProps)
    };

    const GetBandSongForModalType = (type: ModalTypes, elements: any) => {
        const bandSong = {
            ...BandSong.EmptyBandSong(),
            Artist: elements[htmlConfig.Artist.ControlId].value,
            Title: elements[htmlConfig.Title.ControlId].value,
            Genre: elements[htmlConfig.Genre.ControlId].value
        } as IBandSong

        if (type !== "New") {
            bandSong.Id = modal.value.Id
        }

        return bandSong;
    }

    const IsReadonly = IsModalReadonly(modal.type) || (modal.type === "New")

    return <Modal show={modal.show} onHide={handleCloseModal}>
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{modal.type}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={hanldeOnClick} method="GET">
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Title.ControlId}>
                            <Form.Label>{htmlConfig.Title.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Song.Title} placeholder={htmlConfig.Title.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Artist.ControlId}>
                            <Form.Label>{htmlConfig.Artist.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Song.Artist} placeholder={htmlConfig.Artist.Placeholder}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId={htmlConfig.Genre.ControlId}>
                            <Form.Label>{htmlConfig.Genre.Label}</Form.Label>
                            <Form.Control readOnly={IsReadonly} type="text" defaultValue={modal.value.Song.Genre} placeholder={htmlConfig.Genre.Placeholder}></Form.Control>
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