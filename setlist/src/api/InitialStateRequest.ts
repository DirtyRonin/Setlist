import { setlist } from "../models/DndListModels";
import { GetAllSongs } from "./songApi";
import Configuration from "../Configuration/config";
import { IAppState } from "../App";
import { HashTable } from "../Util/HashTable";

const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = Configuration.EndpointTypeDefinition.Songs.Name;
    const songsResult = await GetAllSongs();

    const songs = songsResult;

    const setlists = {} as HashTable<setlist>;
    setlists[endpointName] = { id: endpointName, title: "All Songs", songIds: Object.keys(songs) };

    const setlistOrder: string[] = [endpointName];
    return { songs, setlists, setlistOrder };
};

export default InitialStateRequest;
