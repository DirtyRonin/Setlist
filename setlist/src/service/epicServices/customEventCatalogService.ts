import { nameof } from "ts-simple-nameof"

import { CustomEvent } from "mapping";
import { CreateCustomEventAsync, DeleteCustomEventAsync, ReadCustomEventAsync, UpdateCustomEventAsync } from "service"
import { IFilterCustomEventActionProps, IFilterCustomEventActionResult, ICustomEvent, INextLinkActionProps, IBand, ILocation, ISetlist, ICustomEventEntityActionProps } from "models"
import { IsMiminumStringLength, QueryBuilder, FilterBuilder } from "utils"

const bandExpand = `${nameof<ICustomEvent>(x => x.Band)}`
const locationExpand = `${nameof<ICustomEvent>(x => x.Location)}`
const setlistExpand = `${nameof<ICustomEvent>(x => x.Setlist)}`

export const fetchCustomEventCatalogAsync = async (props: IFilterCustomEventActionProps): Promise<IFilterCustomEventActionResult> => {

    const { filter: Filter } = props




    const result: FilterBuilder | undefined = (IsMiminumStringLength(Filter.Query)) ?
        new FilterBuilder().or(() =>
            new FilterBuilder().containsFilterExpression(nameof<ICustomEvent>(x => x.Title), Filter.Query).or(
                () => new FilterBuilder().containsFilterExpression(`${bandExpand}/${nameof<IBand>(x => x.Title)}`, Filter.Query).or(
                    () => new FilterBuilder().containsFilterExpression(`${locationExpand}/${nameof<ILocation>(x => x.Name)}`, Filter.Query).or(
                        () => new FilterBuilder().containsFilterExpression(`${setlistExpand}/${nameof<ISetlist>(x => x.Title)}`, Filter.Query
                        )
                    ))))
        : undefined

    let query = new QueryBuilder().count()

    if (result)
        query.filter(() => result)

    query = query.orderBy(`${nameof<ICustomEvent>(x => x.Title)}`)

    query.expand(`${bandExpand},${nameof<ICustomEvent>(x => x.Location)},${nameof<ICustomEvent>(x => x.Setlist)}`)

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

export const addCustomEventToCustomEventCatalogAsync = async (props: ICustomEventEntityActionProps): Promise<ICustomEvent> => {
    let query = new QueryBuilder()
    query.expand(`${bandExpand},${locationExpand},${setlistExpand}`)
    const filter = query.toQuery()
    return await CreateCustomEventAsync(props.value,filter)
}

export const editCustomEventInCatalogAsync = async (props: ICustomEventEntityActionProps): Promise<ICustomEvent> => {
    let query = new QueryBuilder()
    query.expand(`${bandExpand},${locationExpand},${setlistExpand}`)
    const filter = query.toQuery()

    return await UpdateCustomEventAsync(props.value, filter)
}


export const deleteCustomEventInCatalogAsync = async (props: ICustomEventEntityActionProps): Promise<string> =>
    (await (DeleteCustomEventAsync(props.value.Id))).Id

export const fetchCustomEventById = async (id: string): Promise<ICustomEvent> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<ICustomEvent>(x => x.Id), 'eq', id))

    query.expand(`${bandExpand},${locationExpand},${setlistExpand}`)
    const filter = query.toQuery()

    const customEvent = (await GetFilterCustomEventActionResult(filter)).Values.get(id) ?? CustomEvent.EmptyCustomEvent()
    return customEvent
}