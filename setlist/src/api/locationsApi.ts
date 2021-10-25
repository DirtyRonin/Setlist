import { EndpointConfiguration } from "configuration";
import { WrappResponse } from "mapping/ResponseWrapper";
import { ILocation, IResponseWrapper } from "models";
import api from "./baseApi";

const locationsEndpoint = EndpointConfiguration.Locations;

export const GetLocationsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<ILocation>> => {
    const url = nextlink ?? locationsEndpoint.GetEndpointUrl()

    const response = await api().get(url);

    const result: IResponseWrapper<ILocation> = WrappResponse(response);

    return result;
}

export const GetLocationdByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<ILocation>> => {

    const url = `${locationsEndpoint.GetEndpointUrl()}Search/${query}`

    const response = await api().get(url);

    const result: IResponseWrapper<ILocation> = WrappResponse(response);

    return result;
}

export const GetLocationByIdRequestAsync = async (id: number): Promise<ILocation> =>
    (await api().get(`${locationsEndpoint.GetEndpointUrl()}/${id}`)).data

export const CreateLocationRequestAsync = async (location: ILocation): Promise<ILocation> =>
    (await api().post<ILocation>(locationsEndpoint.GetEndpointUrl!(), location)).data

export const DeleteLocationRequestAsync = async (locationId: number): Promise<number> =>
    (await api().delete<number>(`${locationsEndpoint.GetEndpointUrl!()}/${locationId}`)).data

export const UpdateLocationRequestAsync = async (location: ILocation): Promise<ILocation> =>
    (await api().put<ILocation>(`${locationsEndpoint.GetEndpointUrl!()}/${location.id}`, location)).data
