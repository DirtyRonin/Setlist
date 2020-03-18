import Axios, { AxiosResponse } from "axios";
import { ISong } from "../models";
import { EndpointConfiguration, defaultHeader, OdataPostHeader } from "../Configuration";
import { ISongResource } from "../resources";
import { IOdataWrapper } from ".";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (): Promise<ISongResource[]> =>{
    const result = await Axios.get<IOdataWrapper<ISongResource[]>>(songsEndpoint.GetEndpointUrl!(), {
        headers: defaultHeader
    });

    return result.data.value;
}

// return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
//     prev[current.id] = current;
//     return prev;
// }, {} as HashTable<any>);


export const CreateSongRequestAsync = async (song: ISongResource): Promise<AxiosResponse<ISongResource>> =>{
    const saveSong = {...song,Id:""}

   return await Axios.post<ISongResource>(songsEndpoint.GetEndpointUrl!(), song, {
        headers: defaultHeader
    });
}

export const DeleteSongRequestAsync = async (songId: string): Promise<AxiosResponse<ISongResource>> =>
    await Axios.delete<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });
