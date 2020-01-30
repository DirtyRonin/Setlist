import { dndList, HashTable, column } from "../models/DndListModels";
import { GetAllSongs } from "./songApi";
import { Endpoints } from "../static/config";



const InitialStateRequest = async (): Promise<dndList> => {

    const songsResult = await GetAllSongs();

    const tasks = songsResult;

    const columns = {} as HashTable<column>;
    columns[Endpoints.Songs] = { id: Endpoints.Songs, title: "All Songs", taskIds: Object.keys(tasks) }

    const columnOrder: string[] = [Endpoints.Songs];
    return { tasks, columns, columnOrder };
};

export default InitialStateRequest;