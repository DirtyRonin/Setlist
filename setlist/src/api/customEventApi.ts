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