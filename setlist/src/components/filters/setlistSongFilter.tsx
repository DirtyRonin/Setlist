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
            Title: elements[htmlConfig.SearchTitleInput.ControlId].value,
            Artist: elements[htmlConfig.SearchArtistInput.ControlId].value,
            Genre: elements[htmlConfig.SearchGenreInput.ControlId].value,
            Nineties: elements[htmlConfig.SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[htmlConfig.SearchEvergreenCheckBox.ControlId].checked,
            SetlistId: setlistId
        }

        const setlistSongFilter = FilterSetlistSongActionProps.Create({ filter: _filter, refresh: true })

        setlistSongFilter.refresh = 
        filter.Evergreen !== setlistSongFilter.filter.Evergreen ? true :
                filter.Nineties !== setlistSongFilter.filter.Nineties ? true :
                    IsFilterableString(filter.Title, setlistSongFilter.filter.Title) ? true :
                        IsFilterableString(filter.Artist, setlistSongFilter.filter.Artist) ? true :
                            IsFilterableString(filter.Genre, setlistSongFilter.filter.Genre) ? true :
                                false


        if (setlistSongFilter.refresh) {
            setSetlistSongFilter(setlistSongFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig,filter)}
        </Form>
    )
}