import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { IBandSongFilter, IFilterBandSongActionProps } from "models";
import { FilterBandSongHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandSongHtmlAttributes";
import { FilterBandSongActionProps } from "mapping";
import { IsFilterableString } from "utils";
import { SongFilterTemplate } from "components/filters/songFilterTemplate";

export interface IBandSongFilterProps {
    bandId: string;
    filter: IBandSongFilter;
    setBandSongFilter(props: IFilterBandSongActionProps): void
}

export const BandSongFilterComponent = (props: IBandSongFilterProps) => {
    const { filter, bandId, setBandSongFilter } = props;

    const {SearchQueryInput} = FilterBandSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: IBandSongFilter = { ...filter, Query: elements[SearchQueryInput.ControlId].value,BandId:bandId }

        const bandSongFilter = FilterBandSongActionProps.Create({ filter: _filter, refresh: true })

        bandSongFilter.refresh = IsFilterableString(filter.Query, bandSongFilter.filter.Query) ? true : false

        if (bandSongFilter.refresh) {
            setBandSongFilter(bandSongFilter)
        }
    }

    return (

        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={SearchQueryInput.ControlId}>
                    <Form.Control type="search" defaultValue={filter.Query} placeholder={SearchQueryInput.Placeholder} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
