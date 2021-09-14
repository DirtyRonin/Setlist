import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "models";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: IBandSongFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Default(bandId: string): IFilterBandSongActionProps {

        const filter: IBandSongFilter = {
            Query: "",
            BandId: bandId,
            Evergreen:false,
            Nineties:false
        }

        return FilterBandSongActionProps.Create({ filter, refresh: true })
    }

    public static Create({ filter, refresh }: { filter: IBandSongFilter; refresh: boolean; }): IFilterBandSongActionProps {
        return new FilterBandSongActionProps({ filter, refresh })
    }
    


    public static CreateFromCatalog(catalog: IBandSongCatalog) {
        const { Filter, Refresh, BandId } = catalog
        const newfilter = { ...Filter, BandId }

        return  FilterBandSongActionProps.Create({ filter: newfilter, refresh: Refresh })
    }
}