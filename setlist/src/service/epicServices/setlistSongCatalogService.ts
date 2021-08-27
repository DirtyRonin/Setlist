import { SetlistSong } from "mapping"
import { nameof } from "ts-simple-nameof"

import { CreateSetlistSongAsync, DeleteSetlistSongAsync, ReadSetlistSongAsync, UpdateSetlistSongAsync } from "service"
import { IFilterSetlistSongActionProps, IFilterSetlistSongActionResult, INextLinkActionProps, ISetlistSong, ISetlistSongEntityActionProps, ISong } from "models"
import { FilterBuilder, IsMiminumStringLength, QueryBuilder } from "utils"

export const fetchSetlistSongCatalogAsync = async (props: IFilterSetlistSongActionProps): Promise<IFilterSetlistSongActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    const songExpand = `${nameof<ISetlistSong>(x => x.Song)}`

    filters.push(new FilterBuilder().filterGuidExpression(nameof<ISetlistSong>(x => x.SetlistId), 'eq', Filter.SetlistId))

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

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${songExpand}/${nameof<ISong>(x => x.Title)}`)

    query.expand(songExpand)

    const filter = query.toQuery()

    return await GetFilterSetlistSongActionResult(filter)
}

const GetFilterSetlistSongActionResult = async (filterQuery: string): Promise<IFilterSetlistSongActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadSetlistSongAsync(filterQuery);

    return {
        Values: Values?.reduce((map, setlist) => {
            map.set(setlist.Id, setlist)
            return map
        }, new Map<string, ISetlistSong>()),
        OData: { NextLink, Context, Count }
    }
}

export const fetchSetlistSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSetlistSongActionResult> =>
    await GetFilterSetlistSongActionResult(props.nextLink)

export const NewSetlistSong = async (props: ISetlistSongEntityActionProps): Promise<ISetlistSong> =>
    await CreateSetlistSongAsync(props.value)

export const editSetlistSongInCatalogAsync = async (props: ISetlistSongEntityActionProps): Promise<ISetlistSong> =>
    await UpdateSetlistSongAsync(props.value)

export const deleteSetlistSongInCatalogAsync = async (props: ISetlistSongEntityActionProps): Promise<string> =>
    (await (DeleteSetlistSongAsync(props.value.Id))).Id

export const fetchSetlistSongById = async (id: string): Promise<ISetlistSong> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<ISetlistSong>(x => x.Id), 'eq', id))

    const songExpand = `${nameof<ISetlistSong>(x => x.Song)}`
    query.expand(songExpand)

    const filter = query.toQuery()

    const setlistSong = (await GetFilterSetlistSongActionResult(filter)).Values.get(id) ?? SetlistSong.EmptySetlistSong()
    return setlistSong
}
