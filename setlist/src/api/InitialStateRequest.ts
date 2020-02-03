import { dndList, HashTable, column } from "../models/DndListModels";
import { GetAllSongs } from "./songApi";
import { Endpoints } from "../static/config";
import { IAppState } from "../App";



const InitialStateRequest = async (): Promise<IAppState> => {

    const songsResult = await GetAllSongs();

    const tasks = songsResult;

    const columns = {} as HashTable<column>;
    columns[Endpoints.Songs] = { id: Endpoints.Songs, title: "All Songs", taskIds: Object.keys(tasks) }

    const columnOrder: string[] = [Endpoints.Songs];
    return { songs: tasks, columns, columnOrder };
};

export default InitialStateRequest;