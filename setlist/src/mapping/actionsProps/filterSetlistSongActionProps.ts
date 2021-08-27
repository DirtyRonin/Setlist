import { IFilterSetlistSongActionProps, ISetlistSongCatalog, ISetlistSongFilter } from "models";

export class FilterSetlistSongActionProps implements IFilterSetlistSongActionProps {

    filter: ISetlistSongFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: ISetlistSongFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ filter, refresh }: { filter: ISetlistSongFilter; refresh: boolean; }): IFilterSetlistSongActionProps =>
        new FilterSetlistSongActionProps({ filter, refresh })

    public static Default = (setlistId: string): IFilterSetlistSongActionProps =>
        FilterSetlistSongActionProps.Create(
            {
                filter: {
                    Title: '',
                    Artist: "",
                    Genre: "",
                    Evergreen: false,
                    Nineties: false,
                    SetlistId: setlistId
                },
                refresh: true
            })

    public static CreateFromCatalog = ({ Filter, Refresh, SetlistId }: ISetlistSongCatalog): IFilterSetlistSongActionProps =>
        FilterSetlistSongActionProps.Create({
            filter: { ...Filter, SetlistId },
            refresh: Refresh
        })

}