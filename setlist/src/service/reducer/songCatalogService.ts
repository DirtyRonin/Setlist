import { nameof } from "ts-simple-nameof"

import { ISongCatalog, ISong, IFilterSongActionProps, ISongEntityActionProps, INextLinkActionProps, Catalog, IEntityActionProps, IStatusSongCatalogActionProps, IComponentOrder, NodeTypes } from "../../models";
import { IHashTable, HashTableHelper } from "../../Util/HashTable";
import { ReadSongsAsync, CreateSongAsync, UpdateSongAsync, DeleteSongAsync } from "..";
import { SongCatalog, FilterSongActionProps } from "../../mapping";
import { QueryBuilder, IsMiminumStringLength } from "../../Util";
import { ICatalogState } from "../../store";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";

export const createEmptySongCatalog_New = (catalogs: IHashTable<Catalog>): ISongCatalog => {
    const catalog = HashTableHelper.Do(catalogs).FindLastOrDefault()
    const defaultActionProps = FilterSongActionProps.Default(catalog.Id)
    return SongCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, { ShowAddSong: false }, NodeTypes.Edit);
}

export const createEmptySongCatalog = (props: IStatusSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {
    const { componentsOrder } = catalogState
    const { catalogId, displayIn, nodeType } = props

    const defaultActionProps = FilterSongActionProps.Default(catalogId)

    const songCatalog = SongCatalog.Create(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, { ShowAddSong: false }, nodeType);

    // const newCatalogs: IHashTable<Catalog> = {...catalogs,[songCatalog.Id] : songCatalog} ;

    // const newCatalogsOrder: Array<string> = [...catalogsOrder,songCatalog.Id]

    const newComponentsOrder: IComponentOrder[] = [...componentsOrder]

    newComponentsOrder.push({
        id: catalogId,
        displayIn,
        value: songCatalog
    } as IComponentOrder)


    return { ...catalogState, componentsOrder: newComponentsOrder } as ICatalogState
};

export const closeSongCatalog = (props: IStatusSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

    const { componentsOrder } = catalogState

    const songCatalogId = SongCatalog.CatalogId;

    const newComponentsOrder: Array<IComponentOrder> = componentsOrder.filter(order => order.id !== songCatalogId)

    return { ...catalogState, componentsOrder: newComponentsOrder } as ICatalogState
}

export const fetchSongCatalogAsync = async (props: IFilterSongActionProps, catalogs: IHashTable<Catalog>): Promise<ISongCatalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { filter: Filter, catalogId: SongCatalogId } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Title), Filter.Title))
    }
    if (IsMiminumStringLength(Filter.Artist)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Artist), Filter.Artist))
    }
    if (IsMiminumStringLength(Filter.Genre)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Genre), Filter.Genre))
    }
    if (Filter.Nineties) {
        filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Nineties), 'eq', Filter.Nineties))
    }
    if (Filter.Evergreen) {
        filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Evergreen), 'eq', Filter.Evergreen))
    }


    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<ISong>(x => x.Artist)},${nameof<ISong>(x => x.Title)}`)

    // query.select('My Properties')
    const filter = query.toQuery()

    const { NextLink, Values, Context, Count } = await ReadSongsAsync(filter);

    const prevSongCatalog = { ...catalogs[SongCatalogId] } as ISongCatalog

    const mappedValues = Values?.reduce((map, song) => {
        map.set(song.Id, song)
        return map
    }, new Map<string, ISong>())

    return SongCatalog.Create(Filter, { NextLink, Context, Count }, prevSongCatalog.CatalogOptions, prevSongCatalog.NodeType, mappedValues);
}

export const fetchSongCatalogNextLinkAsync = async (props: INextLinkActionProps, catalogs: IHashTable<Catalog>): Promise<ISongCatalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { NextLink, Values, Context, Count } = await ReadSongsAsync(props.nextLink);

    const prevSongCatalog = { ...catalogs[props.catalogId] } as ISongCatalog

    let newSongCatalog = SongCatalog.AddValues(prevSongCatalog, Values);
    return SongCatalog.UpdateOData(newSongCatalog, { NextLink, Context, Count })
}





export const addSongToSongCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value: song, catalogId: songCatalogId } = props as ISongEntityActionProps
    const newSong = await CreateSongAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] } as ISongCatalog;

    const newSongs: Map<string, ISong> = new Map([[newSong.Id, newSong]]);

    currentCatalog.Values.forEach((song, key) =>
        newSongs.set(key, song)
    )

    return {
        ...currentCatalog,
        Values: newSongs
    } as Catalog;
};

export const editSongInCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value: song, catalogId: songCatalogId } = props as ISongEntityActionProps
    const updatedSong: ISong = await UpdateSongAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] } as ISongCatalog;
    currentCatalog.Values.set(updatedSong.Id, updatedSong);

    return currentCatalog
}

export const deleteSongInCatalogAsync = async (props: IEntityActionProps, catalogs: IHashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value: song, catalogId: songCatalogId } = props as ISongEntityActionProps
    const deletedSong: ISong = await DeleteSongAsync(song.Id)

    const currentCatalog = { ...catalogs[songCatalogId] }
    currentCatalog.Values.delete(deletedSong.Id);

    return currentCatalog
}