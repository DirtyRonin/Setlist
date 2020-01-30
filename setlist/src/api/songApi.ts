import Axios from "axios";
import { ACCESS_CONTROL_ALLOW_ORIGIN_HEADER, GetEndpointURL, Endpoints } from "../static/config";
import { Song, HashTable } from "../models/DndListModels";

export const GetAllSongs = async (): Promise<HashTable<Song>> => {
    const songsResult = await Axios.get<Song[]>(GetEndpointURL(Endpoints.Songs), {
        headers: ACCESS_CONTROL_ALLOW_ORIGIN_HEADER
    })

    return songsResult.data.reduce((prev: HashTable<any>, current: Song) => {
        prev[current.id] = { id: current.id, title: `${current.title} - ${current.artist}` };
        return prev;
    }, {} as HashTable<any>);
}