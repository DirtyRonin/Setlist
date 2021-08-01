import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { FilterSetlistSongHtmlAttributesConfiguration } from "../../Configuration";
import { FilterSetlistSongActionProps } from "../../mapping";
import { IFilterSetlistSongActionProps, ISetlistSongFilter } from "../../models";
import { IsFilterableString } from "../../Util";

export interface ISetlistSongFilterProps {
    CatalogId: string;
    Filter: ISetlistSongFilter;
    setSetlistSongFilter(props: IFilterSetlistSongActionProps): void
}

export const SetlistSongFilterComponent = (props: ISetlistSongFilterProps) => {
    const { Filter, CatalogId, setSetlistSongFilter } = props;

    const { SearchTitleInput } = FilterSetlistSongHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter = {
            Title: elements[SearchTitleInput.ControlId].value,
        }

        const setlistSongFilter = FilterSetlistSongActionProps.Create({
            setlistSongCatalogId: CatalogId, filter, refresh: true
        })

        setlistSongFilter.refresh = IsFilterableString(Filter.Title, setlistSongFilter.filter.Title) ? true : false

        if (setlistSongFilter.refresh) {
            setSetlistSongFilter(setlistSongFilter)
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