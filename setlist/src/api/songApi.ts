import Axios from "axios";
import { song } from "../models";
import { EndpointConfiguration, defaultHeader } from "../Configuration";

const songsEndpoint = EndpointConfiguration.Songs;

export const ReadSongsAsync = async (): Promise<Array<song>> => {
    const songsResult = await Axios.get<song[]>(songsEndpoint.GetEndpointUrl!(), {
        headers: defaultHeader
    });

    return songsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const CreateSongAsync = async (song: song): Promise<song> => {
    const newsong = { ...song, id: "" };

    const addResult = await Axios.post<song>(songsEndpoint.GetEndpointUrl!(), newsong, {
        headers: defaultHeader
    });
    
    return addResult.data;
};
export const DeleteSongAsync = async (songId: string): Promise<void> => {
    const deleteResult = await Axios.delete<song>(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });
};
