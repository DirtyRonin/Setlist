import { FilterLocationActionProps } from "mapping";
import { CatalogTypes, ILocation, ILocationCatalog, ILocationCatalogOptions, ILocationFilter, MetaProps } from "models";
import { CatalogBase } from "mapping/SongCatalog/catalogBase";

export class LocationCatalog extends CatalogBase<ILocation, ILocationFilter, ILocationCatalogOptions> implements ILocationCatalog {

    private constructor({ filter, oData, options, refresh, locations }: { filter: ILocationFilter; oData: MetaProps; options: ILocationCatalogOptions; refresh?: boolean; locations?: ILocation[]; }) {
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
                oData: { NextLink: "", Count: 0 },
                options,
                refresh,
                locations: [],
            })

    public static Create = (): ILocationCatalog => LocationCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ILocationCatalogOptions): ILocationCatalog =>
        LocationCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["Location Catalog"].toString()}_id`
}