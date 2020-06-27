import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "../../models";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;
    catalogId: string;

    constructor(catalogId: string, filter: IBandSongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
        this.catalogId = catalogId
    }

    public static Default(catalogId: string): IFilterBandSongActionProps {

        const filter: IBandSongFilter = {
            Title: "",
            ParentId: catalogId
        }

        return FilterBandSongActionProps.Create(catalogId,filter, true)
    }

    public static Create(catalogId: string,filter: IBandSongFilter, refresh: boolean): IFilterBandSongActionProps {
        return new FilterBandSongActionProps(catalogId,filter, refresh)
    }

    public static CreateFromCatalog(catalog:IBandSongCatalog){
        const {Id,Filter,Refresh} = catalog
        return new FilterBandSongActionProps(Id,Filter,Refresh)
    }
}