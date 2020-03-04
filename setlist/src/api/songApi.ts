import Axios from "axios";
import { ISong } from "../models";
import { EndpointConfiguration, defaultHeader, OdataPostHeader } from "../Configuration";

const songsEndpoint = EndpointConfiguration.Songs;

export const ReadSongsAsync = async (): Promise<Array<ISong>> => {
    const songsResult = await Axios.get<ISong[]>(songsEndpoint.GetEndpointUrl!()
        , {
            headers: defaultHeader
        });

    return songsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const CreateSongAsync = async (song: ISong): Promise<ISong> => {

    const {title,artist,mode} = song;
    const newsong = { title,artist,mode};

    const addResult = await Axios.post<ISong>(songsEndpoint.GetEndpointUrl!(), newsong, {
        headers: defaultHeader
    });

    return addResult.data;
};
export const DeleteSongAsync = async (songId: string): Promise<void> => {
    await Axios.delete(`${songsEndpoint.GetEndpointUrl!()}/${songId}`, {
        headers: defaultHeader
    });
};
