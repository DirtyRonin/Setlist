import { ICatalogState } from "../../store";
import { FilterBandActionProps, BandCatalog } from "../../mapping";
import { IHashTable, QueryBuilder, IsMiminumStringLength, HashTableHelper } from "../../Util";
import { Catalog, IFilterBandActionProps, IBand, IBandCatalog, INextLinkActionProps, IEntityActionProps, IBandEntityActionProps, IStatusBandCatalogActionProps, IComponentOrder, NodeTypes, DisplayIn, IFilterBandActionResult } from "../../models";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";
import { nameof } from "ts-simple-nameof";
import { ReadBandsAsync, CreateBandAsync, UpdateBandAsync, DeleteBandAsync } from "..";

// export const createEmptyBandCatalog_New = (catalogs: IHashTable<Catalog>): IBandCatalog => {
//     const catalog = HashTableHelper.Do(catalogs).FindLastOrDefault()
//     const defaultActionProps = FilterBandActionProps.Default(catalog.Id)
//     return BandCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {}, catalog.NodeType);
// }

export const createEmptyBandCatalog = (): IComponentOrder => ({
    id: BandCatalog.CatalogId,
    displayIn: DisplayIn.Main,
    value: BandCatalog.CreateAndUpdate(NodeTypes.Edit)
})

// export const createEmptyBandCatalog = (props: IStatusBandCatalogActionProps, catalogState: ICatalogState): ICatalogState => {
//     const { componentsOrder } = catalogState
//     const { catalogId, displayIn, nodeType } = props

//     const defaultActionProps = FilterBandActionProps.Default(BandCatalog.CatalogId)

//     const bandCatalog = BandCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {}, nodeType);

//     const newComponentsOrder: IComponentOrder[] = [...componentsOrder]

//     newComponentsOrder.push({
//         id: catalogId,
//         displayIn,
//         value: bandCatalog
//     } as IComponentOrder)

//     return { ...catalogState, componentsOrder: newComponentsOrder } as ICatalogState
// }

export const closeBandCatalog = (props: IStatusBandCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

    const { componentsOrder } = catalogState

    const bandCatalogId = BandCatalog.CatalogId;

    const newComponentsOrder: Array<IComponentOrder> = componentsOrder.filter(order => order.id !== bandCatalogId)

    return { ...catalogState, componentsOrder: newComponentsOrder } as ICatalogState
}

export const fetchBandCatalogAsync = async (props: IFilterBandActionProps): Promise<IFilterBandActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<IBand>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<IBand>(x => x.Title)}`)

    const filter = query.toQuery()

    return await GetFilterBandActionResult(filter)
}

export const fetchBandCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandActionResult> =>
    await GetFilterBandActionResult(props.nextLink)


const GetFilterBandActionResult = async (filterQuery: string): Promise<IFilterBandActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadBandsAsync(filterQuery);

    return {
        Values: Values?.reduce((map, band) => {
            map.set(band.Id, band)
            return map
        }, new Map<string, IBand>()),
        OData: { NextLink, Context, Count }
    }
}

export const addBandToBandCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value: song, catalogId: songCatalogId } = props as IBandEntityActionProps
    const newSong = await CreateBandAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] } as IBandCatalog;

    const newSongs: Map<string, IBand> = new Map([[newSong.Id, newSong]]);

    currentCatalog.Values.forEach((song, key) =>
        newSongs.set(key, song)
    )

    return {
        ...currentCatalog,
        Values: newSongs
    } as Catalog;
};

export const editBandInCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value, catalogId } = props as IBandEntityActionProps
    const updatedValue: IBand = await UpdateBandAsync(value)

    const currentCatalog = { ...catalogs[catalogId] } as IBandCatalog;
    currentCatalog.Values.set(updatedValue.Id, updatedValue);

    return currentCatalog
}

export const deleteBandInCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value, catalogId: songCatalogId } = props as IBandEntityActionProps
    const deletedValue: IBand = await DeleteBandAsync(value.Id)

    const currentCatalog = { ...catalogs[songCatalogId] }
    currentCatalog.Values.delete(deletedValue.Id);

    return currentCatalog
}
