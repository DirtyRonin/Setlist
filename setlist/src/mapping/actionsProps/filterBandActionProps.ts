import { IBandFilter, IBandCatalog, IFilterBandActionProps } from "../../models";

export class FilterBandActionProps implements IFilterBandActionProps {

    filter: IBandFilter;
    refresh: boolean;

    constructor( filter: IBandFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Default(): IFilterBandActionProps {

        const filter: IBandFilter = {
            Query: ""
        }

        return FilterBandActionProps.Create(filter, true)
    }

    public static Create(filter: IBandFilter, refresh: boolean): IFilterBandActionProps {
        return new FilterBandActionProps(filter, refresh)
    }

    public static CreateFromCatalog(bandCatalog:IBandCatalog){
        const {Filter,Refresh} = bandCatalog
        return new FilterBandActionProps(Filter,Refresh)
    }
}