import { ISongFilter, IFilterSongActionProps, ISongCatalog } from "../../models";

export class FilterSongActionProps implements IFilterSongActionProps {

    filter: ISongFilter;
    refresh: boolean;

    constructor(filter: ISongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Default(): IFilterSongActionProps {
        return FilterSongActionProps.Create({
            Title: "",
            Artist: "",
            Genre: "",
            Evergreen: false,
            Nineties: false
        }, true)
    }

    public static Create(filter: ISongFilter, refresh: boolean): IFilterSongActionProps {
        return new FilterSongActionProps(filter, refresh)
    }

    public static CreateFromSongCatalog(songCatalog: ISongCatalog) {
        const { Filter, Refresh } = songCatalog
        return new FilterSongActionProps(Filter, Refresh)
    }
}