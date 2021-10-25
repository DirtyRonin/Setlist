import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "models";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: IBandSongFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ filter, refresh }: { filter: IBandSongFilter; refresh: boolean; }): IFilterBandSongActionProps =>
        new FilterBandSongActionProps({ filter, refresh })

    public static Default = (bandId: number): IFilterBandSongActionProps =>
        FilterBandSongActionProps.Create({
            filter: {
                Query: "",
                bandId: bandId,
                Evergreen: false,
                Nineties: false
            }, refresh: true
        })

    public static CreateFromCatalog = ({ Filter, Refresh, bandId: BandId }: IBandSongCatalog) =>
        FilterBandSongActionProps.Create({ filter: { ...Filter, bandId: BandId }, refresh: Refresh })

}