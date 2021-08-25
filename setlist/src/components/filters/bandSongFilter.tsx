import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { IBandSongFilter, IFilterBandSongActionProps } from "../../models";
import { FilterBandSongHtmlAttributesConfiguration } from "../../Configuration";
import { FilterBandSongActionProps } from "../../mapping";
import { IsFilterableString } from "../../utils";
import { SongFilterTemplate } from "./songFilterTemplate";

export interface IBandSongFilterProps {
    bandId: string;
    filter: IBandSongFilter;
    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
}

export const BandSongFilterComponent = (props: IBandSongFilterProps) => {
    const { filter, bandId, fetchBandSongCatalog } = props;

    const htmlConfig = FilterBandSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const _filter: IBandSongFilter = {
            Title: elements[htmlConfig.SearchTitleInput.ControlId].value,
            Artist: elements[htmlConfig.SearchArtistInput.ControlId].value,
            Genre: elements[htmlConfig.SearchGenreInput.ControlId].value,
            Nineties: elements[htmlConfig.SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[htmlConfig.SearchEvergreenCheckBox.ControlId].checked,
            BandId: bandId
        } 

        const bandSongFilter = FilterBandSongActionProps.Create(bandId, _filter, true)

        bandSongFilter.refresh =
            filter.Evergreen !== bandSongFilter.filter.Evergreen ? true :
                filter.Nineties !== bandSongFilter.filter.Nineties ? true :
                    IsFilterableString(filter.Title, bandSongFilter.filter.Title) ? true :
                        IsFilterableString(filter.Artist, bandSongFilter.filter.Artist) ? true :
                            IsFilterableString(filter.Genre, bandSongFilter.filter.Genre) ? true :
                                false

        if (bandSongFilter.refresh) {
            fetchBandSongCatalog(bandSongFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig,filter)}
        </Form>
    )
}
