import { ISongFilter, IFilterSongActionProps, ISongCatalog } from "../../models";

export class FilterSongActionProps implements IFilterSongActionProps {

    filter: ISongFilter;
    refresh: boolean;

    constructor(filter: ISongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Default({ bandId = 0, setlistId = 0 }: { bandId?: number; setlistId?: number }): IFilterSongActionProps {
        return FilterSongActionProps.Create({
            filter: {
                Query: "",
                bandId: bandId,
                SetlistId: setlistId,
                Evergreen: false,
                Nineties: false
            }, refresh: true
        })
    }

    public static Create({ filter, refresh }: { filter: ISongFilter; refresh: boolean; }): IFilterSongActionProps {
        return new FilterSongActionProps(filter, refresh)
    }

    public static CreateFromSongCatalog(songCatalog: ISongCatalog) {
        const { Filter, Refresh } = songCatalog
        return new FilterSongActionProps(Filter, Refresh)
    }
}