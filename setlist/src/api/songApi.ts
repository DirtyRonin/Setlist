import Axios, { AxiosResponse } from "axios";
import { ISong } from "../models";
import { EndpointConfiguration, defaultHeader, OdataPostHeader } from "../Configuration";
import { ISongResource } from "../resources";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetSongsRequestAsync = async (): Promise<AxiosResponse<ISongResource[]>> =>
    await Axios.get<ISongResource[]>(songsEndpoint.GetEndpointUrl!(), {
        headers: defaultHeader
    });

// return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
//     prev[current.id] = current;
//     return prev;
// }, {} as HashTable<any>);


export const CreateSongRequestAsync = async (song: ISongResource): Promise<AxiosResponse<ISongResource>> =>
    await Axios.post<ISongResource>(songsEndpoint.GetEndpointUrl!(), song, {
        headers: defaultHeader
    });



export const DeleteSongRequestAsync = async (songId: number): Promise<AxiosResponse<ISong>> =>
    await Axios.delete<ISongResource>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });
