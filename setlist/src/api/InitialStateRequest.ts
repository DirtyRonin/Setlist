import { IAppState } from "../App";
import { EndpointConfiguration } from "../Configuration";
import { GetAllSongs } from "./";
import { songlist } from "../models";
import { HashTable } from "../Util/HashTable";

const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = EndpointConfiguration.Songs.Name;
    const songs = await GetAllSongs();

    const mainList = {
        id: "mainList_id",
        title: endpointName,
        songs: songs ? songs : [],
        isLibrary: true,
        isMajorLibrary: true
    } as songlist;

    const songListOrder: Array<string> = [mainList.id];

    const songLists: HashTable<songlist> = {};
    songLists[mainList.id] = mainList;

    const setlistKeys = Object.keys(songLists);
    // const setlistOrder = setlistKeys.length > 0 ? setlistKeys : [];

    return { songLists, songListOrder };
};

export default InitialStateRequest;
