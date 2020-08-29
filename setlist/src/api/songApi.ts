import Axios, { AxiosResponse } from "axios";

import { IOdataWrapper } from "../models";
import { EndpointConfiguration, defaultHeader } from "../Configuration";
import { ISongResource } from "../resource";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (url: string): Promise<IOdataWrapper<ISongResource>> => {

    const result = await Axios.get(url, {
        headers: defaultHeader
    });

    const Odata: IOdataWrapper<ISongResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

export const CreateSongRequestAsync = async (song: ISongResource): Promise<AxiosResponse<ISongResource>> => {
    return await Axios.post<ISongResource>(songsEndpoint.GetEndpointUrl!(), song, {
        headers: defaultHeader
    });
}

export const DeleteSongRequestAsync = async (songId: string): Promise<AxiosResponse<ISongResource>> =>
    await Axios.delete<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });

export const UpdateSongRequestAsync = async (song: ISongResource): Promise<AxiosResponse<ISongResource>> =>
    await Axios.put<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${song.Id}`, song, {
        headers: defaultHeader
    });
