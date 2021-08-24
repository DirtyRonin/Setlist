import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { IBandFilter, IFilterBandActionProps } from "../../models";
import { FilterBandHtmlAttributesConfiguration } from "../../Configuration";
import { FilterBandActionProps } from "../../mapping";
import { IsFilterableString } from "../../utils";


export interface IBandFilterProps {
    CatalogId: string;
    Filter: IBandFilter;
    setBandFilter(props: IFilterBandActionProps): void
}

export const BandFilterComponent = (props: IBandFilterProps) => {
    const { Filter, CatalogId, setBandFilter } = props;

    const { SearchTitleInput } = FilterBandHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter = {
            Title: elements[SearchTitleInput.ControlId].value,
        }

        const bandFilter = FilterBandActionProps.Create(CatalogId, filter, true)

        bandFilter.refresh = IsFilterableString(Filter.Title, bandFilter.filter.Title) ? true : false

        if (bandFilter.refresh) {
            setBandFilter(bandFilter)
        }
    }

    return (

        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={SearchTitleInput.ControlId}>
                    <Form.Control type="search" placeholder={SearchTitleInput.Placeholder} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
