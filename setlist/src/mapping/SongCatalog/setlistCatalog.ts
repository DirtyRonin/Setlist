import { FilterSetlistActionProps } from "..";
import { CatalogTypes, ISetlist, ISetlistCatalog, ISetlistCatalogOptions, ISetlistFilter, ODataProps } from "../../models"
import { CatalogBase } from "./catalogBase";

export class SetlistCatalog extends CatalogBase<ISetlist, ISetlistFilter, ISetlistCatalogOptions> implements ISetlistCatalog {
    private constructor({ filter, oData, options, refresh, setlists }: { filter: ISetlistFilter; oData: ODataProps; options: ISetlistCatalogOptions;  refresh?: boolean; setlists?: Map<string, ISetlist>; }) {
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

    private static Default = ({ refresh, options = {} }: { refresh: boolean, options?: ISetlistCatalogOptions }): SetlistCatalog =>
        new SetlistCatalog(
            {
                filter: FilterSetlistActionProps.Default(SetlistCatalog.CatalogId).filter,
                oData: { NextLink: "", Count: 0, Context: "" },
                options,
                refresh,
                setlists: new Map<string, ISetlist>()
            })

    public static Create = (): ISetlistCatalog => SetlistCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ISetlistCatalogOptions): ISetlistCatalog =>
        SetlistCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["Setlist Catalog"].toString()}_id`
}