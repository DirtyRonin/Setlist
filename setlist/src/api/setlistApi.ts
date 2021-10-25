import { WrappResponse } from "mapping/ResponseWrapper";
import { EndpointConfiguration } from "../Configuration";
import { IResponseWrapper, ISetlist } from "../models";
import api from "./baseApi";

const setlistsEndpoint = EndpointConfiguration.Setlist;

export const GetSetlistsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<ISetlist>> => {
    const url = nextlink ?? setlistsEndpoint.GetEndpointUrl()

    const response = await api().get(url);

    const result: IResponseWrapper<ISetlist> = WrappResponse(response);

    return result;
}

export const GetSetlistdByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<ISetlist>> => {

    const url = `${setlistsEndpoint.GetEndpointUrl()}Search/${query}`

    const response = await api().get(url);

    const result: IResponseWrapper<ISetlist> = WrappResponse(response);

    return result;
}

export const GetSetlistByIdRequestAsync = async (id: number): Promise<ISetlist> =>
    (await api().get(`${setlistsEndpoint.GetEndpointUrl()}/${id}`)).data

export const CreateSetlistRequestAsync = async (setlist: ISetlist): Promise<ISetlist> =>
    (await api().post<ISetlist>(setlistsEndpoint.GetEndpointUrl!(), setlist)).data

export const DeleteSetlistRequestAsync = async (setlistId: number): Promise<number> =>
    (await api().delete<number>(`${setlistsEndpoint.GetEndpointUrl!()}/${setlistId}`)).data

export const UpdateSetlistRequestAsync = async (setlist: ISetlist): Promise<ISetlist> =>
    (await api().put<ISetlist>(`${setlistsEndpoint.GetEndpointUrl!()}/${setlist.id}`, setlist)).data

export async function GetSetlistsWithPivotBySongId(songId: number): Promise<IResponseWrapper<ISetlist>> {
    const response = await api().get(`${setlistsEndpoint.GetEndpointUrl()}HaveSong/${songId}`)
    const result: IResponseWrapper<ISetlist> = WrappResponse(response);

    return result;
}

export async function FilterSetlistsWithPivotBySongId(songId: number, query: string): Promise<IResponseWrapper<ISetlist>> {
    const response = await api().get(`${setlistsEndpoint.GetEndpointUrl()}HaveSongSearch/${songId}/${query}`)
    const result: IResponseWrapper<ISetlist> = WrappResponse(response);

    return result;
}
