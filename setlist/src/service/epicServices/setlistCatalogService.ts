import { nameof } from "ts-simple-nameof"
import { CreateSetlistAsync, ReadSetlistAsync } from ".."
import { IFilterSetlistActionProps, IFilterSetlistActionResult, INextLinkActionProps, ISetlist, ISetlistEntityActionProps } from "../../models"

import { IsMiminumStringLength, QueryBuilder ,FilterBuilder } from "../../Util"


export const fetchSetlistCatalogAsync = async (props: IFilterSetlistActionProps): Promise<IFilterSetlistActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISetlist>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<ISetlist>(x => x.Title)}`)

    const filter = query.toQuery()

    return await GetFilterSetlistActionResult(filter)
}

export const fetchSetlistCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterSetlistActionResult> =>
    await GetFilterSetlistActionResult(props.nextLink)

const GetFilterSetlistActionResult = async (filterQuery: string): Promise<IFilterSetlistActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadSetlistAsync(filterQuery);

    return {
        Values: Values?.reduce((map, setlist) => {
            map.set(setlist.Id, setlist)
            return map
        }, new Map<string, ISetlist>()),
        OData: { NextLink, Context, Count }
    }
}

export const addSetlistToSetlistCatalogAsync = async (props: ISetlistEntityActionProps): Promise<ISetlist> =>
    await CreateSetlistAsync(props.value)



