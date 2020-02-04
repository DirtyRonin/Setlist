import { dndList, HashTable, setlist } from "../models/DndListModels";
import { GetAllSongs } from "./songApi";
import { Endpoints } from "../static/config";
import { IAppState } from "../App";



const InitialStateRequest = async (): Promise<IAppState> => {

    const songsResult = await GetAllSongs();

    const songs = songsResult;

    const setlists = {} as HashTable<setlist>;
    setlists[Endpoints.Songs] = { id: Endpoints.Songs, title: "All Songs", songIds: Object.keys(songs) }

    const setlistOrder: string[] = [Endpoints.Songs];
    return { songs, setlists, setlistOrder };
};

export default InitialStateRequest;