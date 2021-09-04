import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { IBandFilter, IFilterBandActionProps } from "models";
import { FilterBandHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/bandHtmlAttributes";
import { FilterBandActionProps } from "mapping";
import { IsFilterableString } from "utils";


export interface IBandFilterProps {
    filter: IBandFilter;
    setBandFilter(props: IFilterBandActionProps): void
}

export const BandFilterComponent = (props: IBandFilterProps) => {
    const { filter, setBandFilter } = props;

    const { SearchQueryInput } = FilterBandHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: IBandFilter = { ...filter, Query: elements[SearchQueryInput.ControlId].value }

        const bandFilter = FilterBandActionProps.Create(_filter, true)

        bandFilter.refresh = IsFilterableString(filter.Query, bandFilter.filter.Query) ? true : false

        if (bandFilter.refresh) {
            setBandFilter(bandFilter)
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
