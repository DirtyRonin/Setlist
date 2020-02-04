import Axios from "axios";
import Configuration, { ACCESS_CONTROL_ALLOW_ORIGIN_HEADER } from "../Configuration/config";
import { song } from "../models/DndListModels";
import { HashTable } from "../Util/HashTable";

const songsEndpoint = Configuration.EndpointTypeDefinition.Songs;

export const GetAllSongs = async (): Promise<HashTable<song>> => {
    const songsResult = await Axios.get<song[]>(songsEndpoint.GetEndpointUrl!(), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    });

    return songsResult.data.reduce((prev: HashTable<any>, current: song) => {
        prev[current.id] = current;
        return prev;
    }, {} as HashTable<any>);
};

export const AddSong = async (song: song): Promise<song> => {
    const newsong = { ...song, id: "" };

    const songResult = await Axios.post<song>(songsEndpoint.GetEndpointUrl!(), newsong, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" }
    });

    return songResult.data;
};
