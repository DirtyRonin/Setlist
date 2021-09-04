import { IFilterCustomEventActionProps, ICustomEventCatalog, ICustomEventFilter } from "../../models";

export class FilterCustomEventActionProps implements IFilterCustomEventActionProps {

    filter: ICustomEventFilter;
    refresh: boolean;

    constructor({ filter, refresh }: { filter: ICustomEventFilter; refresh: boolean; }) {
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ filter, refresh }: { filter: ICustomEventFilter; refresh: boolean; }): IFilterCustomEventActionProps =>
        new FilterCustomEventActionProps({ filter, refresh })

    public static Default = (): IFilterCustomEventActionProps =>
        FilterCustomEventActionProps.Create(
            {

                filter: {
                    Query: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (customEventCatalog: ICustomEventCatalog): IFilterCustomEventActionProps => {
        const { Filter, Refresh } = customEventCatalog;
        return new FilterCustomEventActionProps({ filter: Filter, refresh: Refresh });
    }
}