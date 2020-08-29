import React from "react"
import { Form, Row, Col, InputGroup, Button, FormControlProps, Navbar } from "react-bootstrap";

import { FilterSongHtmlAttributesConfiguration } from "../../Configuration"
import { ISongFilter, IFilterSongActionProps } from "../../models";
import { IsFilterableString } from "../../Util";
import { AlignRightCss } from "../../styles";
import { FilterSongActionProps } from "../../mapping";
import { SongFilterTemplate } from "./songFilterTemplate";

export interface ISongFilterProps {
    CatalogId: string;
    Filter: ISongFilter;
    FetchSongCatalog(props: IFilterSongActionProps): void
}

export const SongFilterComponent = (props: ISongFilterProps) => {
    const { Filter, CatalogId, FetchSongCatalog } = props;

    const htmlConfig = FilterSongHtmlAttributesConfiguration;

    const handleFilter = (event: React.FormEvent<FormControlProps>) => {
        // event.preventDefault();

        const elements: any = (event.target as any).form.elements;

        const filter: ISongFilter = {
            Title: elements[htmlConfig.SearchTitleInput.ControlId].value,
            Artist: elements[htmlConfig.SearchArtistInput.ControlId].value,
            Genre: elements[htmlConfig.SearchGenreInput.ControlId].value,
            Nineties: elements[htmlConfig.SearchNinetiesCheckBox.ControlId].checked,
            Evergreen: elements[htmlConfig.SearchEvergreenCheckBox.ControlId].checked,
        }

        const songFilter = FilterSongActionProps.Create(CatalogId, filter, true)

        songFilter.refresh =
            Filter.Evergreen !== songFilter.filter.Evergreen ? true :
                Filter.Nineties !== songFilter.filter.Nineties ? true :
                    IsFilterableString(Filter.Title, songFilter.filter.Title) ? true :
                        IsFilterableString(Filter.Artist, songFilter.filter.Artist) ? true :
                            IsFilterableString(Filter.Genre, songFilter.filter.Genre) ? true :
                                false

        if (songFilter.refresh) {
            FetchSongCatalog(songFilter)
        }
    }

    return (
        <Form onChange={handleFilter} >
            {SongFilterTemplate(htmlConfig)}
        </Form>
    )
}
