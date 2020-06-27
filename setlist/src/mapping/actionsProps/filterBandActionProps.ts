import { IBandFilter, IBandCatalog, IFilterBandActionProps } from "../../models";

export class FilterBandActionProps implements IFilterBandActionProps {

    filter: IBandFilter;
    refresh: boolean;
    catalogId: string;

    constructor(bandCatalogId: string, filter: IBandFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
        this.catalogId = bandCatalogId
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