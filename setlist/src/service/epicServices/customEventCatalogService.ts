import { nameof } from "ts-simple-nameof"
import { ReadCustomEventAsync } from ".."
import { IFilterCustomEventActionProps, IFilterCustomEventActionResult, ICustomEvent, INextLinkActionProps } from "../../models"

import { IsMiminumStringLength, QueryBuilder ,FilterBuilder } from "../../utils"

export const fetchCustomEventCatalogAsync = async (props: IFilterCustomEventActionProps): Promise<IFilterCustomEventActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ICustomEvent>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<ICustomEvent>(x => x.Title)}`)

    const filter = query.toQuery()

    return await GetFilterCustomEventActionResult(filter)
}

export const fetchCustomEventCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterCustomEventActionResult> =>
    await GetFilterCustomEventActionResult(props.nextLink)

const GetFilterCustomEventActionResult = async (filterQuery: string): Promise<IFilterCustomEventActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadCustomEventAsync(filterQuery);

    return {
        Values: Values?.reduce((map, customEvent) => {
            map.set(customEvent.Id, customEvent)
            return map
        }, new Map<string, ICustomEvent>()),
        OData: { NextLink, Context, Count }
    }
}