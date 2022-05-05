import { FilterCustomEventActionProps } from "..";
import { CatalogTypes, ICustomEvent, ICustomEventCatalog, ICustomEventCatalogOptions, ICustomEventFilter, MetaProps } from "../../models";
import { CatalogBase } from "./catalogBase";

export class CustomEventCatalog extends CatalogBase<ICustomEvent, ICustomEventFilter, ICustomEventCatalogOptions> implements ICustomEventCatalog {
    
    private constructor({ filter, oData, options, refresh, customEvents }: { filter: ICustomEventFilter; oData: MetaProps; options: ICustomEventCatalogOptions; refresh?: boolean; customEvents?: ICustomEvent[] }) {
        super(
            CustomEventCatalog.CatalogId,
            'Custom Event',
            CatalogTypes["CustomEvent Catalog"],
            filter,
            oData,
            options,
            refresh,
            customEvents
        )
        
    }

    private static Default = ({ refresh, options = {} }: { refresh: boolean, options?: ICustomEventCatalogOptions }): ICustomEventCatalog =>
        new CustomEventCatalog(
            {
                filter: FilterCustomEventActionProps.Default().filter,
                oData: { NextLink: "", Count: 0 },
                options,
                refresh,
                customEvents: [],
               
            })

    public static Create = (): ICustomEventCatalog => CustomEventCatalog.Default({ refresh: true })

    public static CreateAndUpdate = (options?: ICustomEventCatalogOptions): ICustomEventCatalog =>
        CustomEventCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["CustomEvent Catalog"].toString()}_id`
}