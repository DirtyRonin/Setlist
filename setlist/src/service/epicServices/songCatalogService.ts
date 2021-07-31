import { nameof } from "ts-simple-nameof"

import { ISong, IFilterSongActionProps, ISongEntityActionProps, INextLinkActionProps, IComponentOrder,  IFilterSongActionResult, DisplayIn } from "../../models";
import { ReadSongsAsync, CreateSongAsync, UpdateSongAsync, DeleteSongAsync } from "..";
import { SongCatalog } from "../../mapping";
import { QueryBuilder, IsMiminumStringLength } from "../../Util";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";

export const createEmptySongCatalog = (): IComponentOrder => ({
    id: SongCatalog.CatalogId,
    displayIn: DisplayIn.Main,
    value: SongCatalog.CreateAndUpdate()
});

export const fetchSongCatalogAsync = async (props: IFilterSongActionProps): Promise<IFilterSongActionResult> => {
    const { filter: Filter } = props
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

    return await GetFilterSongActionResult(filter)
}

export const fetchSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSongActionResult> =>
    await GetFilterSongActionResult(props.nextLink)

const GetFilterSongActionResult = async (filterQuery: string): Promise<IFilterSongActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadSongsAsync(filterQuery);

    return {
        Values: Values?.reduce((map, song) => {
            map.set(song.Id, song)
            return map
        }, new Map<string, ISong>()),
        OData: { NextLink, Context, Count }
    }
}

export const addSongToSongCatalogAsync = async (props: ISongEntityActionProps): Promise<ISong> =>
    await CreateSongAsync(props.value)

export const editSongInCatalogAsync = async (props: ISongEntityActionProps): Promise<ISong> =>
    await UpdateSongAsync(props.value)

export const deleteSongInCatalogAsync = async (props: ISongEntityActionProps): Promise<string> =>
    (await (DeleteSongAsync(props.value.Id))).Id

