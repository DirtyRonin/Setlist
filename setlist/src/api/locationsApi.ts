import Axios, { AxiosResponse } from "axios";
import { defaultHeader, EndpointConfiguration } from "../Configuration";
import { IOdataWrapper } from "../models";
import { ILocationResource } from "../resource";

const locationsEndpoint = EndpointConfiguration.Locations;

export const GetLocationRequestAsync = async (url: string): Promise<IOdataWrapper<ILocationResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<ILocationResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}