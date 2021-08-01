import { IFilterSetlistSongActionProps, ISetlistSongCatalog, ISetlistSongFilter } from "../../models";

export class FilterSetlistSongActionProps implements IFilterSetlistSongActionProps {
    filter: ISetlistSongFilter;
    refresh: boolean;
    catalogId: string;

    constructor({ setlistSongCatalogId, filter, refresh }: { setlistSongCatalogId: string; filter: ISetlistSongFilter; refresh: boolean; }) {
        this.catalogId = setlistSongCatalogId
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ setlistSongCatalogId, filter, refresh }: { setlistSongCatalogId: string; filter: ISetlistSongFilter; refresh: boolean; }): IFilterSetlistSongActionProps =>
        new FilterSetlistSongActionProps({ setlistSongCatalogId, filter, refresh })

    public static Default = (setlistSongCatalogId: string = ""): IFilterSetlistSongActionProps =>
        FilterSetlistSongActionProps.Create(
            {
                setlistSongCatalogId,
                filter: {
                    Title: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (setlistSongCatalog: ISetlistSongCatalog): IFilterSetlistSongActionProps => {
        const { Id, Filter, Refresh } = setlistSongCatalog;

        return FilterSetlistSongActionProps.Create({
            setlistSongCatalogId: Id,
            filter: Filter,
            refresh: Refresh
        })
    }
}