import { nameof } from "ts-simple-nameof"
import { IFilterLocationActionProps, IFilterLocationActionResult, ILocation, ILocationEntityActionProps, INextLinkActionProps } from "models"

import { IsMiminumStringLength, QueryBuilder, FilterBuilder } from "utils"
import { CreateLocationRequestAsync, DeleteLocationRequestAsync, GetLocationByIdRequestAsync, GetLocationdByQueryRequestAsync, GetLocationsRequestAsync, UpdateLocationRequestAsync } from "api/locationsApi";
import { UnwrappResponse } from "mapping/ResponseWrapper";

export const fetchLocationCatalogAsync = async ({ filter }: IFilterLocationActionProps): Promise<IFilterLocationActionResult> => {

    const response = IsMiminumStringLength(filter.Query)
        ? await GetLocationdByQueryRequestAsync(filter.Query)
        : await GetLocationsRequestAsync()

    return UnwrappResponse(response)
}

export const fetchLocationCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterLocationActionResult> => {

    const response = await GetLocationsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

const GetFilterLocationActionResult = async (filterQuery: string): Promise<IFilterLocationActionResult> => {
    const { NextLink, Values, Count } = await GetLocationsRequestAsync(filterQuery);

    return {
        Values: Values?.reduce((map, location) => {
            map.set(location.id, location)
            return map
        }, new Map<string, ILocation>()),
        Meta: { NextLink, Count }
    }
}

export const addLocationToLocationCatalogAsync = async (props: ILocationEntityActionProps): Promise<ILocation> =>
    await CreateLocationRequestAsync(props.value)

export const editLocationInCatalogAsync = async (props: ILocationEntityActionProps): Promise<ILocation> =>
    await UpdateLocationRequestAsync(props.value)

export const deleteLocationInCatalogAsync = async (props: ILocationEntityActionProps): Promise<number> =>
    await DeleteLocationRequestAsync(props.value.id)

export const fetchLocationById = async (id: number): Promise<ILocation> =>
    await GetLocationByIdRequestAsync(id)

export const IsLocationExistingByName = async (name: string): Promise<boolean> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterExpression(`tolower(${nameof<ILocation>(x => x.name)})`, 'eq', name))
    const filter = query.toQuery()

    const isExisting = (await GetFilterLocationActionResult(filter)).Values.size > 0
    return isExisting
}