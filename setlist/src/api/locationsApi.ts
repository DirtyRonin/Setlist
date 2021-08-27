import Axios, { AxiosResponse } from "axios";
import { defaultHeader, EndpointConfiguration } from "configuration";
import { IOdataWrapper } from "models";
import { ILocationResource } from "resource";

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

export const CreateLocationRequestAsync = async (location: ILocationResource): Promise<AxiosResponse<ILocationResource>> => {
    return await Axios.post<ILocationResource>(locationsEndpoint.GetEndpointUrl!(), location, {
        headers: defaultHeader
    });
}

export const DeleteLocationRequestAsync = async (locationId: string): Promise<AxiosResponse<ILocationResource>> =>
    await Axios.delete<ILocationResource>(`${locationsEndpoint.GetEndpointUrl!()}/${locationId}`, {
        headers: defaultHeader
    });

export const UpdateLocationRequestAsync = async (location: ILocationResource): Promise<AxiosResponse<ILocationResource>> =>
    await Axios.put<ILocationResource>(`${locationsEndpoint.GetEndpointUrl!()}/${location.Id}`, location, {
        headers: defaultHeader
    });