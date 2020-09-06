import { ISongFilter, IFilterSongActionProps, ISongCatalog } from "../../models";

export class FilterSongActionProps implements IFilterSongActionProps {

    filter: ISongFilter;
    refresh: boolean;
    catalogId: string

    constructor(songCatalogId: string, filter: ISongFilter, refresh: boolean) {
        this.filter = filter
        this.refresh = refresh
        this.catalogId = songCatalogId

    }

    public static Default(songCatalogId: string = ""): IFilterSongActionProps {

        const filter: ISongFilter = {
            Title: "",
            Artist: "",
            Genre: "",
            Evergreen: false,
            Nineties: false
        }

        return FilterSongActionProps.Create(songCatalogId,filter, true)
    }

    public static Create(songCatalogId: string,filter: ISongFilter, refresh: boolean): IFilterSongActionProps {
        return new FilterSongActionProps(songCatalogId,filter, refresh)
    }

    public static CreateFromSongCatalog(songCatalog:ISongCatalog){
        const {Id,Filter,Refresh} = songCatalog
        return new FilterSongActionProps(Id,Filter,Refresh)
    }
}