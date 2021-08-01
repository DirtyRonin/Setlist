import { FilterSetlistSongActionProps } from "..";
import { CatalogTypes, ISetlistSong, ISetlistSongCatalog, ISetlistSongCatalogOptions, ISetlistSongFilter, ODataProps } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SetlistSongCatalog extends CatalogBase<ISetlistSong, ISetlistSongFilter, ISetlistSongCatalogOptions> implements ISetlistSongCatalog {
    private constructor({ filter, oData, options, refresh, setlistSongs }: { filter: ISetlistSongFilter; oData: ODataProps; options: ISetlistSongCatalogOptions; refresh?: boolean; setlistSongs?: Map<string, ISetlistSong>; }) {
        super(
            SetlistSongCatalog.CatalogId,
            CatalogTypes["SetlistSong Catalog"].toString(),
            CatalogTypes["SetlistSong Catalog"],
            filter,
            oData,
            options,
            refresh,
            setlistSongs
        )
    }

    private static Default = ({ refresh, options = {} }: { refresh: boolean, options?: ISetlistSongCatalogOptions }): ISetlistSongCatalog =>
        new SetlistSongCatalog(
            {
                filter: FilterSetlistSongActionProps.Default(SetlistSongCatalog.CatalogId).filter,
                oData: { NextLink: "", Count: 0, Context: "" },
                options,
                refresh,
                setlistSongs: new Map<string, ISetlistSong>()
            })

    public static Create = (): ISetlistSongCatalog => SetlistSongCatalog.Default({ refresh: false })

    public static CreateAndUpdate = (options?: ISetlistSongCatalogOptions): ISetlistSongCatalog =>
        SetlistSongCatalog.Default({ refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["SetlistSong Catalog"].toString()}_id`
}