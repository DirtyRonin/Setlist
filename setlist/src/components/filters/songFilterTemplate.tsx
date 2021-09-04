import React from "react"
import { Form, Col } from "react-bootstrap";

import { IBandSongFilter, ISetlistSongFilter, ISongFilter } from "models";
import { FilterSongHtmlAttributesConfigurationType } from "configuration/HtmlAttributesConfigs/songHtmlAttributes";

export const SongFilterTemplate = (html: FilterSongHtmlAttributesConfigurationType, filter: ISongFilter | IBandSongFilter | ISetlistSongFilter) => {
    return (
        <div>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchTitleInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchTitleInput.Placeholder} defaultValue={filter.Query} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchArtistInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchArtistInput.Placeholder} defaultValue={filter.Artist} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchGenreInput.ControlId}>
                    <Form.Control type="search" placeholder={html.SearchGenreInput.Placeholder} defaultValue={filter.Genre} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchNinetiesCheckBox.ControlId}>
                    <Form.Check type="switch" label={html.SearchNinetiesCheckBox.Label} defaultChecked={filter.Nineties} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={html.SearchEvergreenCheckBox.ControlId}>
                    <Form.Check type="switch" label={html.SearchEvergreenCheckBox.Label} defaultChecked={filter.Evergreen} />
                </Form.Group>
            </Form.Row>
        </div>
    )
}