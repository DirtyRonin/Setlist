import React from "react"
import { Col, Form, FormControlProps } from "react-bootstrap";

import { FilterCustomEventHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/customEventHtmlAttributes"
import { ICustomEventFilter, IFilterCustomEventActionProps } from "models";
import { IsFilterableString } from "utils";
import { FilterCustomEventActionProps } from "mapping";

interface IProps {
    filter: ICustomEventFilter;
    setCustomEventFilter(props: IFilterCustomEventActionProps): void
}

const CustomEventFilterComponent = (props: IProps) => {
    const { filter, setCustomEventFilter } = props;

    const htmlConfig = FilterCustomEventHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: ICustomEventFilter = { ...filter, query: elements[htmlConfig.SearchQueryInput.ControlId].value, }

        const customEventFilter = FilterCustomEventActionProps.Create({ filter: _filter, refresh: true })

        customEventFilter.refresh = IsFilterableString(filter.query, customEventFilter.filter.query) ?? false

        if (customEventFilter.refresh) {
            setCustomEventFilter(customEventFilter)
        }
    }

    return (

        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={htmlConfig.SearchQueryInput.ControlId}>
                    <Form.Control type="search" placeholder={htmlConfig.SearchQueryInput.Placeholder} defaultValue={filter.query} />
                </Form.Group>
            </Form.Row>
        </Form>

    )
}

export default CustomEventFilterComponent
