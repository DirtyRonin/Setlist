import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";
import { FilterSetlistHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistHtmlAttributes";
import { FilterSetlistActionProps } from "mapping";
import { IFilterSetlistActionProps, ISetlistFilter } from "models";
import { IsFilterableString } from "utils";

interface ISetlistFilterProps {
    Filter: ISetlistFilter;
    setSetlistFilter(props: IFilterSetlistActionProps): void
}

export const SetlistFilterComponent = ({ Filter, setSetlistFilter }: ISetlistFilterProps) => {
    const { SearchQueryInput } = FilterSetlistHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter: ISetlistFilter = { ...Filter, Query: elements[SearchQueryInput.ControlId].value }

        const setlistFilter = FilterSetlistActionProps.Create({ filter, refresh: true })

        setlistFilter.refresh = IsFilterableString(Filter.Query, setlistFilter.filter.Query) ? true : false

        if (setlistFilter.refresh) {
            setSetlistFilter(setlistFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            <Form.Row>
                <Form.Group as={Col} controlId={SearchQueryInput.ControlId}>
                    <Form.Control type="search" placeholder={SearchQueryInput.Placeholder} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}