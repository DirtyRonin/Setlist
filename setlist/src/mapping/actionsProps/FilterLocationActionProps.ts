import { IFilterLocationActionProps, ILocationCatalog, ILocationFilter } from "../../models";

export class FilterLocationActionProps implements IFilterLocationActionProps {
    catalogId: string;
    filter: ILocationFilter;
    refresh: boolean;

    constructor({ locationCatalogId, filter, refresh }: { locationCatalogId: string; filter: ILocationFilter; refresh: boolean; }) {
        this.catalogId = locationCatalogId
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ locationCatalogId, filter, refresh }: { locationCatalogId: string; filter: ILocationFilter; refresh: boolean; }): IFilterLocationActionProps =>
        new FilterLocationActionProps({ locationCatalogId, filter, refresh })

    public static Default = (locationCatalogId: string = ""): IFilterLocationActionProps =>
        FilterLocationActionProps.Create(
            {
                locationCatalogId,
                filter: {
                    Name: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (locationCatalog: ILocationCatalog): IFilterLocationActionProps => {
        const { Id, Filter, Refresh } = locationCatalog;
        return new FilterLocationActionProps({ locationCatalogId: Id, filter: Filter, refresh: Refresh });
    }
}