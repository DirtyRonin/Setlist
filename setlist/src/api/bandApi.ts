import { WrappResponse } from "mapping/ResponseWrapper";

import { EndpointConfiguration } from "../Configuration";
import { IBand, IResponseWrapper } from "../models";
import api from "./baseApi";

const bandsEndpoint = EndpointConfiguration.Bands;

export const GetBandsRequestAsync = async (nextlink?: string): Promise<IResponseWrapper<IBand>> => {
    const url = nextlink ?? bandsEndpoint.GetEndpointUrl()

    const response = await api().get(url);

    const result: IResponseWrapper<IBand> = WrappResponse(response);

    return result;
}

export const GetBanddByQueryRequestAsync = async (query: string): Promise<IResponseWrapper<IBand>> => {

    const url = `${bandsEndpoint.GetEndpointUrl()}Search/${query}`

    const response = await api().get(url);

    const result: IResponseWrapper<IBand> = WrappResponse(response);

    return result;
}

export const GetBandByIdRequestAsync = async (id: number): Promise<IBand> =>
    (await api().get(`${bandsEndpoint.GetEndpointUrl()}/${id}`)).data

export const CreateBandRequestAsync = async (band: IBand): Promise<IBand> =>
    (await api().post<IBand>(bandsEndpoint.GetEndpointUrl!(), band)).data

export const DeleteBandRequestAsync = async (bandId: number): Promise<number> =>
    (await api().delete<number>(`${bandsEndpoint.GetEndpointUrl!()}/${bandId}`)).data

export const UpdateBandRequestAsync = async (band: IBand): Promise<IBand> =>
    (await api().put<IBand>(`${bandsEndpoint.GetEndpointUrl!()}/${band.id}`, band)).data

export async function GetBandsWithPivotBySongId(songId: number): Promise<IResponseWrapper<IBand>> {
    const response = await api().get(`${bandsEndpoint.GetEndpointUrl()}HaveSong/${songId}`)
    const result: IResponseWrapper<IBand> = WrappResponse(response);

    return result;
}

export async function FilterBandsWithPivotBySongId(songId: number, query: string): Promise<IResponseWrapper<IBand>> {
    const response = await api().get(`${bandsEndpoint.GetEndpointUrl()}HaveSongSearch/${songId}/${query}`)
    const result: IResponseWrapper<IBand> = WrappResponse(response);

    return result;
}



