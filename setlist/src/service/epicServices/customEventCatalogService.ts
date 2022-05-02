import { IFilterCustomEventActionProps, IFilterCustomEventActionResult, INextLinkActionProps, ICustomEvent, ILocation, ISetlist, ICustomEventEntityActionProps } from "models"
import { IsMiminumStringLength } from "utils"
import { UnwrappResponse } from "mapping/ResponseWrapper";
import { CreateCustomEventRequestAsync, DeleteCustomEventRequestAsync, GetCustomEventByIdRequestAsync, GetCustomEventdByQueryRequestAsync, GetCustomEventsRequestAsync, UpdateCustomEventRequestAsync } from "api/customEventApi";

export const fetchCustomEventCatalogAsync = async ({ filter: { query } }: IFilterCustomEventActionProps): Promise<IFilterCustomEventActionResult> => {

    const response = IsMiminumStringLength(query)
        ? await GetCustomEventdByQueryRequestAsync(query)
        : await GetCustomEventsRequestAsync()

    return UnwrappResponse(response)
}

export const fetchCustomEventCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterCustomEventActionResult> => {

    const response = await GetCustomEventsRequestAsync(props.nextLink);
    return UnwrappResponse(response);
}

export const addCustomEventToCustomEventCatalogAsync = async (props: ICustomEventEntityActionProps): Promise<ICustomEvent> =>
    await CreateCustomEventRequestAsync(props.value)

export const editCustomEventInCatalogAsync = async (props: ICustomEventEntityActionProps): Promise<ICustomEvent> =>
    await UpdateCustomEventRequestAsync(props.value)

export const deleteCustomEventInCatalogAsync = async ({ value: { id } }: ICustomEventEntityActionProps): Promise<number> =>
    await DeleteCustomEventRequestAsync(id)

export const fetchCustomEventById = async (id: number): Promise<ICustomEvent> =>
    await GetCustomEventByIdRequestAsync(id);