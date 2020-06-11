import { IBandFilter, IBandCatalog, IFilterBandActionProps } from "../../models";

export class FilterBandActionProps implements IFilterBandActionProps {

    Filter: IBandFilter;
    Refresh: boolean;
    BandCatalogId: string;

    constructor(bandCatalogId: string, filter: IBandFilter, refresh: boolean) {
        this.Filter = filter
        this.Refresh = refresh
        this.BandCatalogId = bandCatalogId
    }

    public static Default(bandCatalogId: string): IFilterBandActionProps {

        const filter: IBandFilter = {
            Title: ""
        }

        return FilterBandActionProps.Create(bandCatalogId,filter, true)
    }

    public static Create(bandCatalogId: string,filter: IBandFilter, refresh: boolean): IFilterBandActionProps {
        return new FilterBandActionProps(bandCatalogId,filter, refresh)
    }

    public static CreateFromCatalog(bandCatalog:IBandCatalog){
        const {Id,Filter,Refresh} = bandCatalog
        return new FilterBandActionProps(Id,Filter,Refresh)
    }
}