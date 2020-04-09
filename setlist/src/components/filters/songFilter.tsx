import React from "react"
import { Form, Row, Col, InputGroup, Button, FormControlProps, Navbar } from "react-bootstrap";

import { FilterSongHtmlAttributesConfiguration } from "../../Configuration"
import { ISongFilter, IFilterSongActionProps } from "../../models";
import { IsFilterableString } from "../../Util";
import { AlignRightCss } from "../../styles";
import { FilterSongActionProps } from "../../mapping";

export interface ISongFilterProps {
    CatalogId: string;
    Filter: ISongFilter;
    FetchSongCatalog(props: IFilterSongActionProps): void
}

export const SongFilterComponent = (props: ISongFilterProps) => {
    const { Filter, CatalogId, FetchSongCatalog } = props;

    const htmlConfig = FilterSongHtmlAttributesConfiguration;

    const { SearchTitleInput, SearchArtistInput, SearchGenreInput, SearchNinetiesCheckBox, SearchEvergreenCheckBox, SearchButton } = FilterSongHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        console.log("checked that handleFilter")

        const elements: any = (event.target as any).form.elements;

        const filter = {
            Title: elements[SearchTitleInput.ControlId].value,
            Artist: elements[SearchArtistInput.ControlId].value,
            Genre: elements[SearchGenreInput.ControlId].value,
            Nineties: elements[SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[SearchEvergreenCheckBox.ControlId].checked,
        }

        const songFilter = FilterSongActionProps.Create(CatalogId, filter, true)

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
            <Form.Row>
                <Form.Group as={Col} controlId={SearchTitleInput.ControlId}>
                    <Form.Control type="search" placeholder={SearchTitleInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={SearchArtistInput.ControlId}>
                    <Form.Control type="search" placeholder={SearchArtistInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={SearchGenreInput.ControlId}>
                    <Form.Control type="search" placeholder={SearchGenreInput.Placeholder} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={SearchNinetiesCheckBox.ControlId}>
                    <Form.Check type="switch" label={SearchNinetiesCheckBox.Label} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId={SearchEvergreenCheckBox.ControlId}>
                    <Form.Check type="switch" label={SearchEvergreenCheckBox.Label} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
