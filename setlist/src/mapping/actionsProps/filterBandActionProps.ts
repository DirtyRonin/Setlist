import { IBandFilter, IBandCatalog, IFilterBandActionProps } from "models";

export class FilterBandActionProps implements IFilterBandActionProps {

    filter: IBandFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: IBandFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Default = ({ songId = 0 }: { songId?: number}): IFilterBandActionProps => {

        const filter: IBandFilter = {
            Query: "",
            SongId: songId,
        }

        return FilterBandActionProps.Create({ filter, refresh: true })
    }

    public static Create({ filter, refresh }: { filter: IBandFilter; refresh: boolean; }): IFilterBandActionProps {
        return new FilterBandActionProps({ filter, refresh })
    }

    public static CreateFromCatalog(bandCatalog: IBandCatalog) {
        const { Filter, Refresh } = bandCatalog
        return new FilterBandActionProps({ filter: Filter, refresh: Refresh })
    }
}