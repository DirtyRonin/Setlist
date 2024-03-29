import { FilterSetlistSongActionProps } from "..";
import { CatalogTypes, ISetlistSong, ISetlistSongCatalog, ISetlistSongCatalogOptions, ISetlistSongFilter, MetaProps } from "../../models";
import { CatalogBase } from "./catalogBase";

export class SetlistSongCatalog extends CatalogBase<ISetlistSong, ISetlistSongFilter, ISetlistSongCatalogOptions> implements ISetlistSongCatalog {

    SetlistId: number;
    totalCount: number;


    private constructor({ setlistId, filter, oData, options, refresh, setlistSongs, totalCount }: { setlistId: number, filter: ISetlistSongFilter; oData: MetaProps; options: ISetlistSongCatalogOptions; refresh?: boolean; setlistSongs?: ISetlistSong[]; totalCount: number }) {
        super(
            SetlistSongCatalog.CatalogId,
            CatalogTypes["SetlistSong Catalog"].toString(),
            CatalogTypes["SetlistSong Catalog"],
            filter,
            oData,
            options,
            refresh,
            setlistSongs,
        )
        this.SetlistId = setlistId
        this.totalCount = totalCount
    }

    private static Default = ({ setlistId, refresh, options = {} }: { setlistId: number, refresh: boolean, options?: ISetlistSongCatalogOptions }): ISetlistSongCatalog =>
        new SetlistSongCatalog(
            {
                setlistId,
                filter: FilterSetlistSongActionProps.Default(setlistId).filter,
                oData: { NextLink: "", Count: 0 },
                options,
                refresh,
                setlistSongs: [],
                totalCount: 0
            })

    public static Create = (setlistId: number): ISetlistSongCatalog => SetlistSongCatalog.Default({ setlistId, refresh: false })

    public static CreateAndUpdate = (setlistId: number, options?: ISetlistSongCatalogOptions): ISetlistSongCatalog =>
        SetlistSongCatalog.Default({ setlistId, refresh: true, options })

    public static CatalogId: string = `${CatalogTypes["SetlistSong Catalog"].toString()}_id`
}