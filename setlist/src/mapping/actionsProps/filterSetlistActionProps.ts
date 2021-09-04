import { IFilterSetlistActionProps, ISetlistCatalog, ISetlistFilter } from "../../models";

export class FilterSetlistActionProps implements IFilterSetlistActionProps {
    filter: ISetlistFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: ISetlistFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ filter, refresh }: { filter: ISetlistFilter; refresh: boolean; }): IFilterSetlistActionProps =>
        new FilterSetlistActionProps({ filter, refresh })

    public static Default = (): IFilterSetlistActionProps =>
        FilterSetlistActionProps.Create({
            filter: {
                Query: ''
            },
            refresh: true
        })

    public static CreateFromCatalog = ({ Filter, Refresh }: ISetlistCatalog): IFilterSetlistActionProps => {
        return new FilterSetlistActionProps({ filter: Filter, refresh: Refresh });
    }
}