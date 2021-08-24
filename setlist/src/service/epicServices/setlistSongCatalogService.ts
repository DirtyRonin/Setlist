import { nameof } from "ts-simple-nameof"

import { ReadSetlistSongAsync } from ".."
import { IFilterSetlistSongActionProps, IFilterSetlistSongActionResult, ISetlistSong, ISong } from "../../models"
import { FilterBuilder, IsMiminumStringLength, QueryBuilder } from "../../utils"

export const fetchSetlistSongCatalogAsync = async (props: IFilterSetlistSongActionProps): Promise<IFilterSetlistSongActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    const songExpand = `${nameof<ISetlistSong>(x => x.Song)}`

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Title)}`, Filter.Title))
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
