import React from "react"
import { Form, FormControlProps } from "react-bootstrap";

import { FilterSongHtmlAttributesConfiguration } from "configuration/HtmlAttributesConfigs/songHtmlAttributes"
import { ISongFilter, IFilterSongActionProps } from "models";
import { IsFilterableString } from "utils";
import { FilterSongActionProps } from "mapping";
import { SongFilterTemplate } from "./songFilterTemplate";

export interface ISongFilterProps {
    filter: ISongFilter;
    setSongFilter(props: IFilterSongActionProps): void
}

export const SongFilterComponent = (props: ISongFilterProps) => {
    const { filter, setSongFilter } = props;

    const htmlConfig = FilterSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: ISongFilter = {
            Title: elements[htmlConfig.SearchTitleInput.ControlId].value,
            Artist: elements[htmlConfig.SearchArtistInput.ControlId].value,
            Genre: elements[htmlConfig.SearchGenreInput.ControlId].value,
            Nineties: elements[htmlConfig.SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[htmlConfig.SearchEvergreenCheckBox.ControlId].checked,
        }

        const songFilter = FilterSongActionProps.Create( _filter, true)

        songFilter.refresh =
            filter.Evergreen !== songFilter.filter.Evergreen ? true :
                filter.Nineties !== songFilter.filter.Nineties ? true :
                    IsFilterableString(filter.Title, songFilter.filter.Title) ? true :
                        IsFilterableString(filter.Artist, songFilter.filter.Artist) ? true :
                            IsFilterableString(filter.Genre, songFilter.filter.Genre) ? true :
                                false

        if (songFilter.refresh) {
            setSongFilter(songFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig,filter)}
        </Form>
    )
}
