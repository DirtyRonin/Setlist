import React from "react"
import { Col, Form, FormControlProps } from "react-bootstrap";

import { FilterSongHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes"
import { ISongFilter, IFilterSongActionProps } from "models";
import { IsFilterableString } from "utils";
import { FilterSongActionProps } from "mapping";

export interface ISongFilterProps {
    filter: ISongFilter;
    setSongFilter(props: IFilterSongActionProps): void
}

export const SongFilterComponent = (props: ISongFilterProps) => {
    const { filter, setSongFilter } = props;

    const htmlConfig = FilterSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: ISongFilter = { ...filter, Query: elements[htmlConfig.SearchQueryInput.ControlId].value, }

        const songFilter = FilterSongActionProps.Create(_filter, true)

        songFilter.refresh = IsFilterableString(filter.Query, songFilter.filter.Query) ?? false

        if (songFilter.refresh) {
            setSongFilter(songFilter)
        }
    }

    return (

        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={htmlConfig.SearchQueryInput.ControlId}>
                    <Form.Control type="search" placeholder={htmlConfig.SearchQueryInput.Placeholder} defaultValue={filter.Query} />
                </Form.Group>
            </Form.Row>
        </Form>

    )
}
