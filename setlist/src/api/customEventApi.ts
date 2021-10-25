import { EndpointConfiguration } from "configuration";
import { CustomEvent } from "mapping";
import { UnwrappPivot, WrappResponse } from "mapping/ResponseWrapper";
import { ICustomEvent, IResponseWrapper, ISong } from "models";
import validator from "validator";
import api from "./baseApi";

const customEventsEndpoint = EndpointConfiguration.CustomEvents;

type CustomEventPivot = ICustomEvent & {
    "pivot": {
        "bandId": number
        "created_at": Date
        "popularity": number
        "songId": number
        "updated_at": Date
    }
}

export const GetCustomEventsRequestAsync = async (bandIdOrNextlink: string): Promise<IResponseWrapper<ICustomEvent>> => {

    const url = validator.isNumeric(bandIdOrNextlink)
        ? `${customEventsEndpoint.GetEndpointUrl()}/${bandIdOrNextlink}` // is bandId
        : bandIdOrNextlink //ia nextlink

    return await getRequest(url);
}

export const GetCustomEventdByQueryRequestAsync = async (bandId: number, query: string): Promise<IResponseWrapper<ICustomEvent>> => {

    const url = `${customEventsEndpoint.GetEndpointUrl()}Search/${bandId}/${query}`

    return await getRequest(url);
}

async function getRequest(url: string): Promise<IResponseWrapper<ICustomEvent>> {
    const response = await api().get<CustomEventPivot>(url);

    const result = UnwrappPivot(response, convertToCustomEvent);

    return result;
}

export const GetCustomEventByIdRequestAsync = async (bandId: number, locationId: number, setlistId: number): Promise<ICustomEvent> => {
    const response = await api().get(`${customEventsEndpoint.GetEndpointUrl()}/${bandId}/${locationId}/${setlistId}`)
    const result = convertToCustomEvent(response.data);
    return result
}

export async function CreateCustomEventRequestAsync(customEvent: ICustomEvent): Promise<ICustomEvent> {
    const response = await api().post(customEventsEndpoint.GetEndpointUrl!(), customEvent)
    const result = convertToCustomEvent(response.data);
    return result
}

export async function DeleteCustomEventRequestAsync(bandId: number, locationId: number, setlistId: number): Promise<number> {
    return (await api().delete<number>(`${customEventsEndpoint.GetEndpointUrl!()}/${bandId}/${locationId}/${setlistId}`)).data;
}

export async function UpdateCustomEventRequestAsync(customEvent: ICustomEvent): Promise<ICustomEvent> {
    const {bandId,locationId,setlistId}=customEvent
    const response = await api().put(`${customEventsEndpoint.GetEndpointUrl!()}/${bandId}/${locationId}/${setlistId}`, customEvent)
    const result = convertToCustomEvent(response.data);
    return result
}


const convertToCustomEvent = (response: CustomEventPivot): ICustomEvent =>
    CustomEvent.CreateEmpty();