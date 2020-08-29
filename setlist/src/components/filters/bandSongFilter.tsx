import React from "react";
import { FormControlProps, Form, Col } from "react-bootstrap";

import { IBandSongFilter, IFilterBandSongActionProps } from "../../models";
import { FilterBandSongHtmlAttributesConfiguration } from "../../Configuration";
import { FilterBandSongActionProps } from "../../mapping";
import { IsFilterableString } from "../../Util";
import { SongFilterTemplate } from "./songFilterTemplate";


export interface IBandSongFilterProps {
    bandId: string;
    Filter: IBandSongFilter;
    fetchBandSongCatalog(props: IFilterBandSongActionProps): void
}

export const BandSongFilterComponent = (props: IBandSongFilterProps) => {
    const { Filter, bandId, fetchBandSongCatalog } = props;

    const htmlConfig = FilterBandSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter: IBandSongFilter = {
            Title: elements[htmlConfig.SearchTitleInput.ControlId].value,
            Artist: elements[htmlConfig.SearchArtistInput.ControlId].value,
            Genre: elements[htmlConfig.SearchGenreInput.ControlId].value,
            Nineties: elements[htmlConfig.SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[htmlConfig.SearchEvergreenCheckBox.ControlId].checked,
            BandId: bandId
        } 

        const bandSongFilter = FilterBandSongActionProps.Create(bandId, filter, true)

        bandSongFilter.refresh =
            Filter.Evergreen !== bandSongFilter.filter.Evergreen ? true :
                Filter.Nineties !== bandSongFilter.filter.Nineties ? true :
                    IsFilterableString(Filter.Title, bandSongFilter.filter.Title) ? true :
                        IsFilterableString(Filter.Artist, bandSongFilter.filter.Artist) ? true :
                            IsFilterableString(Filter.Genre, bandSongFilter.filter.Genre) ? true :
                                false

        if (bandSongFilter.refresh) {
            fetchBandSongCatalog(bandSongFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig)}
        </Form>
    )
}
