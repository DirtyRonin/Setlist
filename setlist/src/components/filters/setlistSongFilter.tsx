import React from "react";
import { FormControlProps, Form } from "react-bootstrap";

import { FilterSetlistSongHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/setlistSongHtmlAttributes";
import { FilterSetlistSongActionProps } from "mapping";
import { IFilterSetlistSongActionProps, ISetlistSongFilter } from "models";
import { IsFilterableString } from "utils";
import { SongFilterTemplate } from "components/filters/songFilterTemplate";

export interface ISetlistSongFilterProps {
    setlistId: string;
    filter: ISetlistSongFilter;
    setSetlistSongFilter(props: IFilterSetlistSongActionProps): void
}

export const SetlistSongFilterComponent = (props: ISetlistSongFilterProps) => {
    const { filter, setlistId, setSetlistSongFilter } = props;

    const htmlConfig = FilterSetlistSongHtmlAttributesConfiguration

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: ISetlistSongFilter = {
            ...filter,
            Query: elements[htmlConfig.SearchTitleInput.ControlId].value,
            SetlistId: setlistId
        }

        const setlistSongFilter = FilterSetlistSongActionProps.Create({ filter: _filter, refresh: true })

        setlistSongFilter.refresh =IsFilterableString(filter.Query, setlistSongFilter.filter.Query) ? true :false

        if (setlistSongFilter.refresh) {
            setSetlistSongFilter(setlistSongFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig, filter)}
        </Form>
    )
}