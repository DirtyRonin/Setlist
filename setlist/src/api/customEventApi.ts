import Axios, { AxiosResponse } from "axios";
import { defaultHeader, EndpointConfiguration } from "../Configuration";
import { IOdataWrapper } from "../models";
import { ICustomEventResource } from "../resource";

const customEventsEndpoint = EndpointConfiguration.CustomEvents;

export const GetCustomEventRequestAsync = async (url: string): Promise<IOdataWrapper<ICustomEventResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<ICustomEventResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

export const CreateCustomEventRequestAsync = async (customEvent: ICustomEventResource, expand:string = ''): Promise<AxiosResponse<ICustomEventResource>> => {
    return await Axios.post<ICustomEventResource>(`${customEventsEndpoint.GetEndpointUrl!()}/${expand}`, customEvent, {
        headers: defaultHeader
    });
}

export const DeleteCustomEventRequestAsync = async (customEventId: string): Promise<AxiosResponse<ICustomEventResource>> =>
    await Axios.delete<ICustomEventResource>(`${customEventsEndpoint.GetEndpointUrl!()}/${customEventId}`, {
        headers: defaultHeader
    });

export const UpdateCustomEventRequestAsync = async (customEvent: ICustomEventResource, expand:string = ''): Promise<AxiosResponse<ICustomEventResource>> =>
    await Axios.put<ICustomEventResource>(`${customEventsEndpoint.GetEndpointUrl!()}/${customEvent.Id}${expand}`, customEvent, {
        headers: defaultHeader
    });