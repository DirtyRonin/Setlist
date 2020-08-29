import { IFilterBandSongActionProps, IBandSongFilter, IBandSongCatalog } from "../../models";
import { BandSongCatalog } from "../SongCatalog";

export class FilterBandSongActionProps implements IFilterBandSongActionProps {

    filter: IBandSongFilter;
    refresh: boolean;
    catalogId: string;

    constructor(catalogId: string, filter: IBandSongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
        this.catalogId = catalogId
    }

    public static Default(bandId: string): IFilterBandSongActionProps {

        const filter: IBandSongFilter = {
            Title: "",
            Artist: "",
            Genre: "",
            Evergreen: false,
            Nineties: false,
            BandId: bandId
        }

        return FilterBandSongActionProps.Create(FilterBandSongActionProps.CatalogId(bandId), filter, true)
    }

    public static Create(bandId: string, filter: IBandSongFilter, refresh: boolean): IFilterBandSongActionProps {
        return new FilterBandSongActionProps(FilterBandSongActionProps.CatalogId(bandId), filter, refresh)
    }

    public static CreateFromCatalog(catalog: IBandSongCatalog) {
        const { Id, Filter, Refresh } = catalog
        return new FilterBandSongActionProps(Id, Filter, Refresh)
    }

    public static CatalogId = (bandId: string): string => BandSongCatalog.GetCatalogId(bandId)

}