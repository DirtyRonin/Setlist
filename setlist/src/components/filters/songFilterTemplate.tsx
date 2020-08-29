import React from "react"
import { Form, Row, Col, InputGroup, Button, FormControlProps, Navbar } from "react-bootstrap";
import { FilterSongHtmlAttributesConfigurationType } from "../../Configuration";

export const SongFilterTemplate = (html : FilterSongHtmlAttributesConfigurationType) => {
    return (
        <div>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchTitleInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchTitleInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchArtistInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchArtistInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchGenreInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchGenreInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchNinetiesCheckBox.ControlId}>
                    <Form.Check type="switch" label={html.SearchNinetiesCheckBox.Label} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchEvergreenCheckBox.ControlId}>
                    <Form.Check type="switch" label={html.SearchEvergreenCheckBox.Label} />
                </Form.Group>
            </Form.Row>
        </div>
    )
}