import { ISongFilter, IFilterSongActionProps } from "../../models";

export class FilterSongActionProps implements IFilterSongActionProps {

    Filter: ISongFilter;
    Refresh: boolean;

    constructor(filter: ISongFilter, toBeUpdated: boolean) {
        this.Filter = filter
        this.Refresh = toBeUpdated

    }

    public static Default(): IFilterSongActionProps {

        const filter: ISongFilter = {
            Title: "",
            Artist: "",
            Genre: "",
            Evergreen: false,
            Nineties: false
        }

        return FilterSongActionProps.Create(filter, true)
    }

    public static Create(filter: ISongFilter, toBeUpdated: boolean): IFilterSongActionProps {
        const filterProps = new FilterSongActionProps(filter, toBeUpdated)
        const { Filter, Refresh: ToBeUpdated } = filterProps

        return { Filter, Refresh: ToBeUpdated }
    }
}