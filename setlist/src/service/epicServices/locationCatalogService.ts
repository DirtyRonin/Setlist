import { nameof } from "ts-simple-nameof"
import { ReadLocationAsync } from ".."
import { IFilterLocationActionProps, IFilterLocationActionResult, ILocation, INextLinkActionProps } from "../../models"

import { IsMiminumStringLength, QueryBuilder ,FilterBuilder } from "../../Util"

export const fetchLocationCatalogAsync = async (props: IFilterLocationActionProps): Promise<IFilterLocationActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Name)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ILocation>(x => x.Name), Filter.Name))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<ILocation>(x => x.Name)}`)

    const filter = query.toQuery()

    return await GetFilterLocationActionResult(filter)
}

export const fetchLocationCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterLocationActionResult> =>
    await GetFilterLocationActionResult(props.nextLink)

const GetFilterLocationActionResult = async (filterQuery: string): Promise<IFilterLocationActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadLocationAsync(filterQuery);

    return {
        Values: Values?.reduce((map, location) => {
            map.set(location.Id, location)
            return map
        }, new Map<string, ILocation>()),
        OData: { NextLink, Context, Count }
    }
}