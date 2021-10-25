import { UnwrappPivot } from "mapping/ResponseWrapper";
import { SetlistSong } from "mapping/setlistSong";
import { Song } from "mapping/song";
import validator from "validator";

import { EndpointConfiguration } from "configuration";
import { IResponseWrapper, ISetlistSong, ISong } from "models";
import api from "./baseApi";

const setlistSongsEndpoint = EndpointConfiguration.SetlistSong;

type SetlistSongPivot = ISong & {
    "pivot": {
        "setlistId": number
        "created_at": Date
        "songId": number
        "updated_at": Date
    }
}

export const GetSetlistSongsRequestAsync = async (setlistIdOrNextlink: string): Promise<IResponseWrapper<ISetlistSong>> => {
    const url = validator.isNumeric(setlistIdOrNextlink)
        ? `${setlistSongsEndpoint.GetEndpointUrl()}/${setlistIdOrNextlink}` 
        : setlistIdOrNextlink 

    return await getRequest(url);
}

export const GetSetlistSongdByQueryRequestAsync = async (setlistId: number, query: string): Promise<IResponseWrapper<ISetlistSong>> => {

    const url = `${setlistSongsEndpoint.GetEndpointUrl()}Search/${setlistId}/${query}`

    return await getRequest(url);
}

async function getRequest(url: string): Promise<IResponseWrapper<ISetlistSong>> {
    const response = await api().get<SetlistSongPivot>(url);

    const result = UnwrappPivot(response, convertToSetlistSong);

    return result;
}

export const GetSetlistSongByIdRequestAsync = async (setlistId: number, songId: number): Promise<ISetlistSong> => {
    const response = await api().get(`${setlistSongsEndpoint.GetEndpointUrl()}/${setlistId}/${songId}`)
    const result = convertToSetlistSong(response.data);
    return result
}

export async function CreateSetlistSongRequestAsync(setlistSong: ISetlistSong): Promise<ISetlistSong> {
    const response = await api().post(setlistSongsEndpoint.GetEndpointUrl!(), setlistSong)
    const result = convertToSetlistSong(response.data);
    return result
}

export async function DeleteSetlistSongRequestAsync(setlistId: number, songId: number): Promise<number> {
    return (await api().delete<number>(`${setlistSongsEndpoint.GetEndpointUrl!()}/${setlistId}/${songId}`)).data;
}

export async function UpdateSetlistSongRequestAsync(setlistSong: ISetlistSong): Promise<ISetlistSong> {
    const response = await api().put(`${setlistSongsEndpoint.GetEndpointUrl!()}/${setlistSong.setlistId}`, setlistSong)
    const result = convertToSetlistSong(response.data);
    return result
}

export async function AddSongToSetlistRequestAsync(setlistSong: ISetlistSong): Promise<boolean> {
    const response = await api().post(`${setlistSongsEndpoint.GetEndpointUrl()}AddSong`, setlistSong)
    
    return response.data
}

const convertToSetlistSong = (response: SetlistSongPivot): ISetlistSong =>
    SetlistSong.Create(
        {
            setlistId: response.pivot.setlistId,
            songId: response.pivot.songId,
            song: Song.Create({
                ...response
            })
        }
    )