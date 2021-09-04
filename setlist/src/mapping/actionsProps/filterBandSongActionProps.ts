import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "models";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;

    constructor(filter: IBandSongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Create(filter: IBandSongFilter, refresh: boolean): IFilterBandSongActionProps {
        return new FilterBandSongActionProps(filter, refresh)
    }
    
    public static Default(bandId: string): IFilterBandSongActionProps {

        const filter: IBandSongFilter = {
            Query: "",
            Artist: "",
            Genre: "",
            Evergreen: false,
            Nineties: false,
            BandId: bandId
        }

        return FilterBandSongActionProps.Create(filter, true)
    }


    public static CreateFromCatalog(catalog: IBandSongCatalog) {
        const { Filter, Refresh, BandId } = catalog
        const newfilter = { ...Filter, BandId }

        return  FilterBandSongActionProps.Create(newfilter, Refresh)
    }
}