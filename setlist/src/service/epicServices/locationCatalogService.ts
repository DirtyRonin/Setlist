import { nameof } from "ts-simple-nameof"
import { CreateLocationAsync, DeleteLocationAsync, ReadLocationAsync, UpdateLocationAsync } from "service"
import { IFilterLocationActionProps, IFilterLocationActionResult, ILocation, ILocationEntityActionProps, INextLinkActionProps } from "models"
import { Location } from "mapping";

import { IsMiminumStringLength, QueryBuilder ,FilterBuilder } from "utils"

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

export const addLocationToLocationCatalogAsync = async (props: ILocationEntityActionProps): Promise<ILocation> =>
    await CreateLocationAsync(props.value)

export const editLocationInCatalogAsync = async (props: ILocationEntityActionProps): Promise<ILocation> =>
    await UpdateLocationAsync(props.value)

export const deleteLocationInCatalogAsync = async (props: ILocationEntityActionProps): Promise<string> =>
    (await (DeleteLocationAsync(props.value.Id))).Id

export const fetchLocationById = async (id: string): Promise<ILocation> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<ILocation>(x => x.Id), 'eq',id))
    const filter = query.toQuery()

    const location = (await GetFilterLocationActionResult(filter)).Values.get(id) ?? Location.EmptyLocation()
    return location
}