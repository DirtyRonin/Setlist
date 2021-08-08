import { IFilterCustomEventActionProps, ICustomEventCatalog, ICustomEventFilter } from "../../models";

export class FilterCustomEventActionProps implements IFilterCustomEventActionProps {
    catalogId: string;
    filter: ICustomEventFilter;
    refresh: boolean;

    constructor({ customEventCatalogId, filter, refresh }: { customEventCatalogId: string; filter: ICustomEventFilter; refresh: boolean; }) {
        this.catalogId = customEventCatalogId
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ customEventCatalogId, filter, refresh }: { customEventCatalogId: string; filter: ICustomEventFilter; refresh: boolean; }): IFilterCustomEventActionProps =>
        new FilterCustomEventActionProps({ customEventCatalogId, filter, refresh })

    public static Default = (customEventCatalogId: string = ""): IFilterCustomEventActionProps =>
        FilterCustomEventActionProps.Create(
            {
                customEventCatalogId,
                filter: {
                    Title: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (customEventCatalog: ICustomEventCatalog): IFilterCustomEventActionProps => {
        const { Id, Filter, Refresh } = customEventCatalog;
        return new FilterCustomEventActionProps({ customEventCatalogId: Id, filter: Filter, refresh: Refresh });
    }
}