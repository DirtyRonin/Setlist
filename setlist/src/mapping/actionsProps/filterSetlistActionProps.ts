import { IFilterSetlistActionProps, ISetlistCatalog, ISetlistFilter } from "../../models";

export class FilterSetlistActionProps implements IFilterSetlistActionProps {
    filter: ISetlistFilter;
    refresh: boolean;
    catalogId: string;

    constructor({ setlistCatalogId, filter, refresh }: { setlistCatalogId: string; filter: ISetlistFilter; refresh: boolean; }) {
        this.catalogId = setlistCatalogId
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ setlistCatalogId, filter, refresh }: { setlistCatalogId: string; filter: ISetlistFilter; refresh: boolean; }): IFilterSetlistActionProps =>
        new FilterSetlistActionProps({ setlistCatalogId, filter, refresh })

    public static Default = (setlistCatalogId: string = ""): IFilterSetlistActionProps =>
        FilterSetlistActionProps.Create(
            {
                setlistCatalogId,
                filter: {
                    Title: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (setlistCatalog: ISetlistCatalog): IFilterSetlistActionProps => {
        const { Id, Filter, Refresh } = setlistCatalog;
        return new FilterSetlistActionProps({ setlistCatalogId: Id, filter: Filter, refresh: Refresh });
    }


}