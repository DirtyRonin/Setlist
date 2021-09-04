import { IFilterLocationActionProps, ILocationCatalog, ILocationFilter } from "models";

export class FilterLocationActionProps implements IFilterLocationActionProps {
    
    filter: ILocationFilter;
    refresh: boolean;

    constructor({  filter, refresh }: {  filter: ILocationFilter; refresh: boolean; }) {
        
        this.filter = filter
        this.refresh = refresh
    }

    public static Create = ({ filter, refresh }: { filter: ILocationFilter; refresh: boolean; }): IFilterLocationActionProps =>
        new FilterLocationActionProps({  filter, refresh })

    public static Default = (): IFilterLocationActionProps =>
        FilterLocationActionProps.Create(
            {
                
                filter: {
                    Query: '',
                },
                refresh: true
            })

    public static CreateFromCatalog = (locationCatalog: ILocationCatalog): IFilterLocationActionProps => {
        const {  Filter, Refresh } = locationCatalog;
        return new FilterLocationActionProps({  filter: Filter, refresh: Refresh });
    }
}