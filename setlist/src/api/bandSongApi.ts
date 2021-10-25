import { EndpointConfiguration } from "configuration";
import { BandSong, Song } from "mapping";
import { UnwrappPivot, WrappResponse } from "mapping/ResponseWrapper";
import { IBandSong, IResponseWrapper, ISong } from "models";
import validator from "validator";
import api from "./baseApi";

const bandSongsEndpoint = EndpointConfiguration.Bandsongs;

type BandSongPivot = ISong & {
    "pivot": {
        "bandId": number
        "created_at": Date
        "popularity": number
        "songId": number
        "updated_at": Date
    }
}

export const GetBandSongsRequestAsync = async (bandIdOrNextlink: string): Promise<IResponseWrapper<IBandSong>> => {
    const url = validator.isNumeric(bandIdOrNextlink)
        ? `${bandSongsEndpoint.GetEndpointUrl()}/${bandIdOrNextlink}` // is bandId
        : bandIdOrNextlink //ia nextlink

        return await getRequest(url);
}

export const GetBandSongdByQueryRequestAsync = async (bandId: number, query: string): Promise<IResponseWrapper<IBandSong>> => {

    const url = `${bandSongsEndpoint.GetEndpointUrl()}Search/${bandId}/${query}`

    return await getRequest(url);
}

async function getRequest(url: string): Promise<IResponseWrapper<IBandSong>> {
    const response = await api().get<BandSongPivot>(url);

    const result = UnwrappPivot(response, convertToBandSong);

    return result;
}

export const GetBandSongByIdRequestAsync = async (bandId: number, songId: number): Promise<IBandSong> => {
    const response = await api().get(`${bandSongsEndpoint.GetEndpointUrl()}/${bandId}/${songId}`)
    const result = convertToBandSong(response.data);
    return result
}

export async function CreateBandSongRequestAsync(bandSong: IBandSong): Promise<IBandSong> {
    const response = await api().post(bandSongsEndpoint.GetEndpointUrl!(), bandSong)
    const result = convertToBandSong(response.data);
    return result
}

export async function DeleteBandSongRequestAsync(bandId: number, songId: number): Promise<number> {
    return (await api().delete<number>(`${bandSongsEndpoint.GetEndpointUrl!()}/${bandId}/${songId}`)).data;
}

export async function UpdateBandSongRequestAsync(bandSong: IBandSong): Promise<IBandSong> {
    const response = await api().put(`${bandSongsEndpoint.GetEndpointUrl!()}/${bandSong.bandId}`, bandSong)
    const result = convertToBandSong(response.data);
    return result
}

export async function AddSongToBandRequestAsync(bandSong: IBandSong): Promise<boolean> {
    const response = await api().post(`${bandSongsEndpoint.GetEndpointUrl()}AddSong`, bandSong)
    
    return response.data
}

const convertToBandSong = (response: BandSongPivot): IBandSong =>
    BandSong.Create(
        {
            bandId: response.pivot.bandId,
            songId: response.pivot.songId,
            song: Song.Create({
                ...response
            }),
            popularity: response.pivot.popularity
        }
    )




