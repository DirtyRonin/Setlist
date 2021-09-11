import { FilterLocationActionProps } from "mapping";
import { CatalogTypes, ILocation, ILocationCatalog, ILocationCatalogOptions, ILocationFilter, ODataProps } from "models";
import { CatalogBase } from "mapping/SongCatalog/catalogBase";

export class LocationCatalog extends CatalogBase<ILocation, ILocationFilter, ILocationCatalogOptions> implements ILocationCatalog {

    private constructor({ filter, oData, options, refresh, locations }: { filter: ILocationFilter; oData: ODataProps; options: ILocationCatalogOptions; refresh?: boolean; locations?: Map<string, ILocation>; }) {
        super(
            LocationCatalog.CatalogId,
            CatalogTypes["Location Catalog"].toString(),
            CatalogTypes["Location Catalog"],
            filter,
            oData,
            options,
            refresh,
            locations,
        )

    }

    private static Default = ({ refresh, options = {} }: { refresh: boolean, options?: ILocationCatalogOptions }): ILocationCatalog =>
        new LocationCatalog(
            {
                filter: FilterLocationActionProps.Default().filter,
                oData: { NextLink: "", Count: 0, Context: "" },
                options,
                refresh,
                locations: new Map<string, ILocation>(),
            })

    public static Create = (): ILocationCatalog => LocationCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ILocationCatalogOptions): ILocationCatalog =>
        LocationCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["Location Catalog"].toString()}_id`
}