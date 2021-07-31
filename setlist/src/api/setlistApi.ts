import Axios, { AxiosResponse } from "axios";
import { defaultHeader, EndpointConfiguration } from "../Configuration";
import { IOdataWrapper } from "../models";
import { ISetlistResource } from "../resource";

const setlistEndpoint = EndpointConfiguration.Setlist;

export const GetSetlistRequestAsync = async (url: string): Promise<IOdataWrapper<ISetlistResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<ISetlistResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

export const CreateSetlistRequestAsync = async (setlist: ISetlistResource): Promise<AxiosResponse<ISetlistResource>> => {
    return await Axios.post<ISetlistResource>(setlistEndpoint.GetEndpointUrl!(), setlist, {
        headers: defaultHeader
    });
}