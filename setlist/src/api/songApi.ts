import Axios from "axios";
import { song } from "../models";
import { HashTable } from "../Util/HashTable";
import {EndpointConfiguration, ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration";

const songsEndpoint = EndpointConfiguration.Songs;

export const GetAllSongs = async (): Promise<Array<song>> => {
    const songsResult = await Axios.get<song[]>(songsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return songsResult.data;

    // return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
    //     prev[current.id] = current;
    //     return prev;
    // }, {} as HashTable<any>);
};

export const AddSong = async (song: song): Promise<song> => {
    const newsong = { ...song, id: "" };

    const addResult = await Axios.post<song>(songsEndpoint.GetEndpointUrl!(), newsong, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });



    return addResult.data;
};
// export const DeleteSong = async (setlistId: string,songId: string): Promise<void> => {
//     // const UpdateSetlist
    
//     const deleteResult = await Axios.post<song>(songsEndpoint.GetEndpointUrl!(), newsong, {
//         headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
//     });

    
// };
