import { FilterSetlistActionProps } from "..";
import { CatalogTypes, ISetlist, ISetlistCatalog, ISetlistCatalogOptions, ISetlistFilter, MetaProps } from "../../models"
import { CatalogBase } from "./catalogBase";

export class SetlistCatalog extends CatalogBase<ISetlist, ISetlistFilter, ISetlistCatalogOptions> implements ISetlistCatalog {
    private constructor({ filter, oData, options, refresh, setlists }: { filter: ISetlistFilter; oData: MetaProps; options: ISetlistCatalogOptions;  refresh?: boolean; setlists?: ISetlist[] }) {
        super(
            SetlistCatalog.CatalogId,
            CatalogTypes["Setlist Catalog"].toString(),
            CatalogTypes["Setlist Catalog"],
            filter,
            oData,
            options,
            refresh,
            setlists
        )
    }

    private static Default = ({ refresh, options = {} }: { refresh: boolean, options?: ISetlistCatalogOptions }): ISetlistCatalog =>
        new SetlistCatalog(
            {
                filter: FilterSetlistActionProps.Default({}).filter,
                oData: { NextLink: "", Count: 0 },
                options,
                refresh,
                setlists: []
            })

    public static Create = (): ISetlistCatalog => SetlistCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ISetlistCatalogOptions): ISetlistCatalog =>
        SetlistCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["Setlist Catalog"].toString()}_id`
}