import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "../../models";
import { BandSongCatalog } from "../SongCatalog";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;
    catalogId: string;

    constructor(parentId: string, filter: IBandSongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
        this.catalogId = BandSongCatalog.GetCatalogId(parentId)
    }

    public static Default(parentId: string): IFilterBandSongActionProps {

        const filter: IBandSongFilter = {
            Title: "",
            ParentId: parentId
        }

        return FilterBandSongActionProps.Create(parentId, filter, true)
    }

    public static Create(parentId: string, filter: IBandSongFilter, refresh: boolean): IFilterBandSongActionProps {
        return new FilterBandSongActionProps(parentId, filter, refresh)
    }

    public static CreateFromCatalog(catalog: IBandSongCatalog) {
        const { Id, Filter, Refresh } = catalog
        return new FilterBandSongActionProps(Id, Filter, Refresh)
    }
}