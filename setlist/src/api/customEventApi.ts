import { EndpointConfiguration } from "configuration";
import { CustomEvent } from "mapping";
import { UnwrappPivot, WrappResponse } from "mapping/ResponseWrapper";
import { ICustomEvent, IResponseWrapper, ISong } from "models";
import validator from "validator";
import api from "./baseApi";

const customEventsEndpoint = EndpointConfiguration.CustomEvents;

type CustomEventPivot = Omit<ICustomEvent, 'date'> & {
    date: string
}

export const GetCustomEventsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<ICustomEvent>> => {

    const url = nextlink ?? customEventsEndpoint.GetEndpointUrl()

    return await getRequest(url);
}

export const GetCustomEventdByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<ICustomEvent>> => {

    const url = `${customEventsEndpoint.GetEndpointUrl()}Search/${query}`

    return await getRequest(url);
}

async function getRequest(url: string): Promise<IResponseWrapper<ICustomEvent>> {
    const response = await api().get<CustomEventPivot>(url);

    const result = UnwrappPivot(response, convertToCustomEvent);

    return result;
}

export const GetCustomEventByIdRequestAsync = async (id: number): Promise<ICustomEvent> => {
    const response = await api().get(`${customEventsEndpoint.GetEndpointUrl()}/${id}`)
    const result = convertToCustomEvent(response.data);
    return result
}

export async function CreateCustomEventRequestAsync(customEvent: ICustomEvent): Promise<ICustomEvent> {
    const response = await api().post(customEventsEndpoint.GetEndpointUrl!(), customEvent)
    const result = convertToCustomEvent(response.data);
    return result
}

export async function DeleteCustomEventRequestAsync(id: number): Promise<number> {
    return (await api().delete<number>(`${customEventsEndpoint.GetEndpointUrl!()}/${id}`)).data;
}

export async function UpdateCustomEventRequestAsync(customEvent: ICustomEvent): Promise<ICustomEvent> {

    const {location,
        band,
        setlist,
        ...rest} = customEvent

    const response = await api().put(`${customEventsEndpoint.GetEndpointUrl!()}/${customEvent.id}`, rest)
    const result = convertToCustomEvent(response.data);
    return result
}


const convertToCustomEvent = (response: CustomEventPivot): ICustomEvent => ({ ...response, date: new Date(response.date.toString()) })
