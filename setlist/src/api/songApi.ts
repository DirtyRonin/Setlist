import { IResponseWrapper, ISong } from "models";
import { EndpointConfiguration } from "configuration";
import { WrappResponse as WrappResponse } from "mapping/ResponseWrapper";
import api from "./baseApi";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<ISong>> => {
    const url = nextlink ?? songsEndpoint.GetEndpointUrl()

    const response = await api().get(url);

    const result: IResponseWrapper<ISong> = WrappResponse(response);

    return result;
}

export const GetSongdByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<ISong>> => {

    const url = `${songsEndpoint.GetEndpointUrl()}Search/${query}`

    const response = await api().get(url);

    const result: IResponseWrapper<ISong> = WrappResponse(response);

    return result;
}

export const GetSongByIdRequestAsync = async (id: number): Promise<ISong> =>
    (await api().get(`${songsEndpoint.GetEndpointUrl()}/${id}`)).data

export const CreateSongRequestAsync = async (song: ISong): Promise<ISong> =>
    (await api().post<ISong>(songsEndpoint.GetEndpointUrl!(), song)).data

export const DeleteSongRequestAsync = async (songId: number): Promise<number> =>
    (await api().delete<number>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`)).data

export const UpdateSongRequestAsync = async (song: ISong): Promise<ISong> =>
    (await api().put<ISong>(`${songsEndpoint.GetEndpointUrl!()}/${song.id}`, song)).data

export async function GetSongdWithPivotBySetlistId(setlistId: number): Promise<IResponseWrapper<ISong>> {
    const response = await api().get(`${songsEndpoint.GetEndpointUrl()}HaveSetlist/${setlistId}`)
    const result: IResponseWrapper<ISong> = WrappResponse(response);

    return result;
}

export async function FilterSongssWithPivotBySetlistId(setlistId: number, query: string): Promise<IResponseWrapper<ISong>> {
    const response = await api().get(`${songsEndpoint.GetEndpointUrl()}HaveSetlistSearch/${setlistId}/${query}`)
    const result: IResponseWrapper<ISong> = WrappResponse(response);

    return result;
}