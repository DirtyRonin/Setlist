import React from "react"
import { Form, Row, Col, InputGroup, Button, FormControlProps, Navbar } from "react-bootstrap";

import { FilterSongHtmlAttributesConfiguration } from "../../Configuration"
import { ISongFilter, IFilterSongActionProps } from "../../models";
import { IsFilterableString } from "../../Util";
import { AlignRightCss } from "../../styles";

export interface ISongFilterProps {
    Filter: ISongFilter;
    FetchSongCatalog(props: IFilterSongActionProps): void
}

export const SongFilterComponent = (props: ISongFilterProps) => {
    const { Filter, FetchSongCatalog } = props;

    const htmlConfig = FilterSongHtmlAttributesConfiguration;

    const { SearchTitleInput, SearchArtistInput, SearchGenreInput, SearchNinetiesCheckBox, SearchEvergreenCheckBox, SearchButton } = FilterSongHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        console.log("checked that handleFilter")

        const elements: any = (event.target as any).form.elements;

        const songFilter: IFilterSongActionProps = {
            Filter: {
                Title: elements[SearchTitleInput.ControlId].value,
                Artist: elements[SearchArtistInput.ControlId].value,
                Genre: elements[SearchGenreInput.ControlId].value,
                Nineties: elements[SearchNinetiesCheckBox.ControlId].checked,
                Evergreen: elements[SearchEvergreenCheckBox.ControlId].checked,
            },
            Refresh: true
        }

        songFilter.Refresh =
            Filter.Evergreen !== songFilter.Filter.Evergreen ? true :
                Filter.Nineties !== songFilter.Filter.Nineties ? true :
                    IsFilterableString(Filter.Title, songFilter.Filter.Title) ? true :
                        IsFilterableString(Filter.Artist, songFilter.Filter.Artist) ? true :
                            IsFilterableString(Filter.Genre, songFilter.Filter.Genre) ? true :
                                false

        if (songFilter.Refresh) {
            FetchSongCatalog(songFilter)
        }
    }



    return (

        <Form onChange={handleFilter} >
            <Row>
                <Col sm="6">
                    <Form.Group controlId={SearchTitleInput.ControlId}>
                        <InputGroup >
                            <Form.Control type="search" placeholder={SearchTitleInput.Placeholder} />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group controlId={SearchArtistInput.ControlId}>
                        <InputGroup >
                            <Form.Control type="search" placeholder={SearchArtistInput.Placeholder} />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Form.Group controlId={SearchGenreInput.ControlId}>
                        <InputGroup >
                            <Form.Control type="search" placeholder={SearchGenreInput.Placeholder} />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm="2">
                    <Form.Group controlId={SearchNinetiesCheckBox.ControlId}>
                        <InputGroup>
                            <Form.Check type="checkbox" label={SearchNinetiesCheckBox.label} />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col sm="2">
                    <Form.Group controlId={SearchEvergreenCheckBox.ControlId}>
                        <InputGroup>
                            <Form.Check type="checkbox" label={SearchEvergreenCheckBox.label} />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>


            </Row>
            <Row>
                <Col >
                    <AlignRightCss>
                        <Button variant="primary" type="submit">{SearchButton.label}</Button>
                    </AlignRightCss>
                </Col>
            </Row>

        </Form>
    )
}
