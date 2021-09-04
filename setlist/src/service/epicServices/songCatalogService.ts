import { nameof } from "ts-simple-nameof"

import { ISong, IFilterSongActionProps, ISongEntityActionProps, INextLinkActionProps, IFilterSongActionResult } from "models";
import { ReadSongsAsync, CreateSongAsync, UpdateSongAsync, DeleteSongAsync } from "service";
import { Song } from "mapping";
import { QueryBuilder, IsMiminumStringLength, FilterBuilder } from "utils";

export const fetchSongCatalogAsync = async (props: IFilterSongActionProps): Promise<IFilterSongActionResult> => {
    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Title), Filter.Query))
    }
    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Artist), Filter.Query))
    }
    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Genre), Filter.Query))
    }
    // if (Filter.Nineties) {
    //     filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Nineties), 'eq', Filter.Nineties))
    // }
    // if (Filter.Evergreen) {
    //     filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Evergreen), 'eq', Filter.Evergreen))
    // }

    //reduce all filter builders to one with all the fragments
    const result = filters.reduce((prev, current) => {
        const stuff = prev.or(()=>current)
        return stuff
    },new FilterBuilder())

    if (filters.length) {
        // concat the fragments with or and give it to the query
        query.filter(() => new FilterBuilder().or(() => result))
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

export const fetchSongById = async (id: string): Promise<ISong> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<ISong>(x => x.Id), 'eq',id))
    const filter = query.toQuery()

    const song = (await GetFilterSongActionResult(filter)).Values.get(id) ?? Song.EmptySong()
    return song
}

