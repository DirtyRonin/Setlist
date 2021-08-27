import React from "react"
import { Form,Col, FormControlProps } from "react-bootstrap";

import { ILocationFilter, IFilterLocationActionProps } from "models";
import { FilterLocationHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/locationHtmlAttributes";
import { FilterLocationActionProps } from "mapping";
import { IsFilterableString } from "utils";

export interface ILocationFilterProps {
    filter: ILocationFilter;
    setLocationFilter(props: IFilterLocationActionProps): void
}

export const LocationFilterComponent = ({ filter, setLocationFilter }: ILocationFilterProps) => {

    const htmlConfig = FilterLocationHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: ILocationFilter = {
            Name: elements[htmlConfig.SearchNameInput.ControlId].value
        }

        const locationFilter = FilterLocationActionProps.Create({ filter: _filter, refresh: true })

        locationFilter.refresh = IsFilterableString(filter.Name, locationFilter.filter.Name) ? true : false

        if (locationFilter.refresh) {
            setLocationFilter(locationFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={htmlConfig.SearchNameInput.ControlId}>
                    <Form.Control type="search" placeholder={htmlConfig.SearchNameInput.Placeholder} defaultValue={filter.Name} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}