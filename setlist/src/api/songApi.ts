import Axios, { AxiosResponse } from "axios";
import isURL from 'validator/lib/isURL';

import { ISong, IOdataWrapper } from "../models";
import { EndpointConfiguration, defaultHeader, OdataPostHeader } from "../Configuration";
import { ISongResource } from "../resource";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (url: string): Promise<IOdataWrapper<ISongResource>> => {
    
    const result = await Axios.get(url, {
        headers: defaultHeader
    });
    // const result = await Axios.get(`${songsEndpoint.GetEndpointUrl()}/${url.toLowerCase()}`, {
    //     headers: defaultHeader
    // });

    const Odata: IOdataWrapper<ISongResource> = {
        Values: result.data.value,
        Context: result.data["@odata.context"],
        Count: result.data["@odata.count"],
        NextLink: result.data["@odata.nextLink"],
    }

    return Odata;
}

// return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
//     prev[current.id] = current;
//     return prev;
// }, {} as HashTable<any>);


export const CreateSongRequestAsync = async (song: ISongResource): Promise<AxiosResponse<ISongResource>> => {
    const saveSong = { ...song, Id: "" }

    return await Axios.post<ISongResource>(songsEndpoint.GetEndpointUrl!(), song, {
        headers: defaultHeader
    });
}

export const DeleteSongRequestAsync = async (songId: string): Promise<AxiosResponse<ISongResource>> =>
    await Axios.delete<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });
