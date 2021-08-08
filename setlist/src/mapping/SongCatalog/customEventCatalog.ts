import { FilterCustomEventActionProps } from "..";
import { CatalogTypes, ICustomEvent, ICustomEventCatalog, ICustomEventCatalogOptions, ICustomEventFilter, ODataProps } from "../../models";
import { CatalogBase } from "./catalogBase";

export class CustomEventCatalog extends CatalogBase<ICustomEvent, ICustomEventFilter, ICustomEventCatalogOptions> implements ICustomEventCatalog {
    private constructor({ filter, oData, options, refresh, customEvents }: { filter: ICustomEventFilter; oData: ODataProps; options: ICustomEventCatalogOptions; refresh?: boolean; customEvents?: Map<string, ICustomEvent>; }) {
        super(
            CustomEventCatalog.CatalogId,
            CatalogTypes["CustomEvent Catalog"].toString(),
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
                filter: FilterCustomEventActionProps.Default(CustomEventCatalog.CatalogId).filter,
                oData: { NextLink: "", Count: 0, Context: "" },
                options,
                refresh,
                customEvents: new Map<string, ICustomEvent>()
            })

    public static Create = (): ICustomEventCatalog => CustomEventCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ICustomEventCatalogOptions): ICustomEventCatalog =>
        CustomEventCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["CustomEvent Catalog"].toString()}_id`
}