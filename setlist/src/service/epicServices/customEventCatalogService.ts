import { nameof } from "ts-simple-nameof"

import { CustomEvent } from "mapping";
import { CreateCustomEventAsync, DeleteCustomEventAsync, ReadCustomEventAsync, UpdateCustomEventAsync } from "service"
import { IFilterCustomEventActionProps, IFilterCustomEventActionResult, INextLinkActionProps, ICustomEvent, ILocation, ISetlist, ICustomEventEntityActionProps } from "models"
import { IsMiminumStringLength} from "utils"
import { UnwrappResponse } from "mapping/ResponseWrapper";
import { CreateCustomEventRequestAsync, DeleteCustomEventRequestAsync, GetCustomEventByIdRequestAsync, GetCustomEventdByQueryRequestAsync, GetCustomEventsRequestAsync, UpdateCustomEventRequestAsync } from "api/customEventApi";

export const fetchCustomEventCatalogAsync = async ({ filter :{query,bandId}}: IFilterCustomEventActionProps): Promise<IFilterCustomEventActionResult> => {

    const response = IsMiminumStringLength(query)
        ? await GetCustomEventdByQueryRequestAsync(bandId,query)
        : await GetCustomEventsRequestAsync(bandId.toString())

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

export const deleteCustomEventInCatalogAsync = async ({value:{bandId,locationId,setlistId}}: ICustomEventEntityActionProps): Promise<number> =>
    await DeleteCustomEventRequestAsync(bandId,locationId,setlistId)

export const fetchCustomEventById = async (bandId: number, locationId: number, setlistId: number): Promise<ICustomEvent> =>
    await GetCustomEventByIdRequestAsync(bandId,locationId,setlistId);