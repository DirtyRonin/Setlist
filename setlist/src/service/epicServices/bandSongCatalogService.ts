import { IFilterBandSongActionProps, IBandSong, ISong, INextLinkActionProps, IComponentOrder, DisplayIn, IFilterBandSongActionResult } from "../../models";
import { BandSongCatalog } from "../../mapping";
import {  QueryBuilder, IsMiminumStringLength,FilterBuilder } from "../../Util";
import { nameof } from "ts-simple-nameof";
import { ReadBandSongsAsync } from "..";

export const createEmptyBandSongCatalog = (bandId: string): IComponentOrder => ({
    id: BandSongCatalog.GetCatalogId(bandId),
    displayIn: DisplayIn.Main,
    value: BandSongCatalog.CreateAndUpdate(bandId)
});


// export const createEmptyBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

//     const { componentsOrder } = catalogState
//     const { bandId, displayIn, nodeType } = props;

//     const defaultActionProps = FilterBandSongActionProps.Default(bandId)

//     const bandCatalog = componentsOrder && componentsOrder.length > 0 ?
//         componentsOrder.filter(order => order.id === 'Band Catalog_id').slice(-1)[0] :
//         undefined

//     //get bandSong Title only until it will be delievered by fetch
//     const parentName = bandCatalog ? bandCatalog.id : 'Default Value'

//     const bandSongCatalog = BandSongCatalog.CreateAndUpdate(bandId, defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {}, nodeType, undefined, parentName);

//     const newComponentsOrder: IComponentOrder[] = [...componentsOrder]

//     newComponentsOrder.push({
//         id: bandSongCatalog.Id,
//         displayIn,
//         value: bandSongCatalog
//     } as IComponentOrder)

//     return { ...catalogState, componentsOrder: newComponentsOrder } as ICatalogState

//     // const newCatalogs: IHashTable<Catalog> = { ...catalogs, [bandSongCatalog.Id]: bandSongCatalog };

//     // const newCatalogsOrder: Array<string> = [...catalogsOrder, bandSongCatalog.Id]

//     // return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
// }

export const fetchBandSongCatalogAsync = async (props: IFilterBandSongActionProps): Promise<IFilterBandSongActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    const songExpand = `${nameof<IBandSong>(x => x.Song)}`

    filters.push(new FilterBuilder().filterGuidExpression(nameof<IBandSong>(x => x.BandId), 'eq', Filter.BandId))

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Title)}`, Filter.Title))
    }
    if (IsMiminumStringLength(Filter.Artist)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Artist)}`, Filter.Artist))
    }
    if (IsMiminumStringLength(Filter.Genre)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Genre)}`, Filter.Genre))
    }
    if (Filter.Nineties) {
        filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Nineties)}`, 'eq', Filter.Nineties))
    }
    if (Filter.Evergreen) {
        filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Evergreen)}`, 'eq', Filter.Evergreen))
    }
    // example expand and filter
    // https://stackoverflow.com/questions/51525409/odata-multiple-expands-and-filter
    // e.g. https://localhost:5001/odata/BandSongs/?$expand=Song&$filter=song/title eq 'No Limit'
    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    //query = query.orderBy(`${nameof<IBandSong>(x => x.Song.Title)}`)

    query.expand(songExpand)

    const filter = query.toQuery()

    return await GetFilterSongActionResult(filter);
}

const GetFilterSongActionResult = async (filterQuery: string): Promise<IFilterBandSongActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadBandSongsAsync(filterQuery);

    return {
        Values: Values?.reduce((map, bandSong) => {
            map.set(bandSong.Id, bandSong)
            return map
        }, new Map<string, IBandSong>()),
        OData: { NextLink, Context, Count }
    }
}

export const fetchBandSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandSongActionResult> =>
    await GetFilterSongActionResult(props.nextLink)

// export const fetchBandSongCatalogNextLinkAsync = async (props: INextLinkActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
//     if (catalogs == null) { throw ("catalogs are null") }

//     const { NextLink, Values, Context, Count } = await ReadBandSongsAsync(props.nextLink);

//     const prevBandSongCatalog = { ...catalogs[props.catalogId] } as IBandSongCatalog

//     const newSongCatalog = BandSongCatalog.AddValues(prevBandSongCatalog, Values);
//     return BandSongCatalog.UpdateOData(newSongCatalog, { NextLink, Context, Count })
// }

// export const closeBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

//     const { bandId: parentId } = props;
//     const { catalogs, catalogsOrder: catalogsOrder, modal } = catalogState

//     const bandSongCatalogId = BandSongCatalog.GetCatalogId(parentId);

//     const newCatalogs: IHashTable<Catalog> = { ...catalogs };
//     delete newCatalogs[bandSongCatalogId];

//     const newCatalogsOrder: Array<string> = catalogsOrder.filter(order => order !== bandSongCatalogId)

//     return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
// }

// export const addBandSongToSongCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
//     if (catalogs == null) { throw ("catalogs are null") }

//     const { value: bandSong, catalogId: bandSongCatalogId } = props as IBandSongEntityActionProps
//     const newBandSong = await CreateBandSongAsync(bandSong)

//     const currentCatalog = { ...catalogs[bandSongCatalogId] } as IBandSongCatalog;

//     const newBandSongs: Map<string, IBandSong> = new Map([[newBandSong.Id, newBandSong]]);

//     currentCatalog.Values.forEach((bandSong, key) =>
//         newBandSongs.set(key, bandSong)
//     )

//     return {
//         ...currentCatalog,
//         Values: newBandSongs
//     } as Catalog;
// };