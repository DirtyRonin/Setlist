import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";
import { FilterSetlistHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistHtmlAttributes";
import { FilterSetlistActionProps } from "mapping";
import { IFilterSetlistActionProps, ISetlistFilter } from "models";
import { IsFilterableString } from "utils";

export interface ISetlistFilterProps {
    CatalogId: string;
    Filter: ISetlistFilter;
    setSetlistFilter(props: IFilterSetlistActionProps): void
}

export const SetlistFilterComponent = (props: ISetlistFilterProps) => {
    const { Filter, CatalogId, setSetlistFilter } = props;

    const { SearchTitleInput } = FilterSetlistHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter = {
            Title: elements[SearchTitleInput.ControlId].value,
        }

        const setlistFilter = FilterSetlistActionProps.Create({
            setlistCatalogId: CatalogId, filter, refresh: true
        })

        setlistFilter.refresh = IsFilterableString(Filter.Title, setlistFilter.filter.Title) ? true : false

        if (setlistFilter.refresh) {
            setSetlistFilter(setlistFilter)
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