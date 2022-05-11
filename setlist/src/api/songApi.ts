import { IResponseWrapper, ISong } from "models";
import { EndpointConfiguration } from "configuration";
import { WrappResponse as WrappResponse } from "mapping/ResponseWrapper";
import api from "./baseApi";
import { Song } from "mapping/song";
import { ISongResource } from "resource";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<ISong>> => {
    const url = nextlink ?? songsEndpoint.GetEndpointUrl()

    const response = await api().get(url);

    const result: IResponseWrapper<ISongResource> = WrappResponse(response);

    const newValues = result.Values.map(x => Song.FromResource(x))

    return { ...result, Values: newValues };
}

export const GetSongdByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<ISong>> => {

    const url = `${songsEndpoint.GetEndpointUrl()}Search/${query}`

    const response = await api().get(url);

    const result: IResponseWrapper<ISongResource> = WrappResponse(response);

    const newValues = result.Values.map(x => Song.FromResource(x))

    return { ...result, Values: newValues };
}

export const GetSongByIdRequestAsync = async (id: number): Promise<ISong> =>
    (await api().get(`${songsEndpoint.GetEndpointUrl()}/${id}`)).data

export const CreateSongRequestAsync = async (song: ISong): Promise<ISong> => {
    const result = await api().post<ISongResource>(songsEndpoint.GetEndpointUrl!(), Song.ToResource(song))
    const newSong = Song.FromResource({ ...result.data });
    return newSong;
}


export const DeleteSongRequestAsync = async (songId: number): Promise<number> =>
    (await api().delete<number>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`)).data

export const UpdateSongRequestAsync = async (song: ISong): Promise<ISong> => {
    const result = await api().put<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${song.id}`, song)
    const updatedSong = Song.FromResource({ ...result.data });
    return updatedSong;
}

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