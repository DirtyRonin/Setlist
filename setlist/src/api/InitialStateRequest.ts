import { IAppState } from "../App";
import { EndpointConfiguration } from "../Configuration";
import { ReadSongsAsync } from "./";
import { songlist } from "../models";
import { HashTable } from "../Util/HashTable";
import { ReadBandsAsync } from "./bandApi";

export const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = EndpointConfiguration.Songs.Name;
    const songs = await ReadSongsAsync();
    const bands = await ReadBandsAsync();

    const mainList = {
        id: "mainList_id",
        title: endpointName,
        songs: songs ? songs : [],
        isBandList: true,
        isMainList: true
    } as songlist;

    const songLists: HashTable<songlist> = {};
    songLists[mainList.id] = mainList;

    if (bands) {
        bands.forEach(band => {
            songLists[band.id] = {
                id: band.id,
                title: band.title,
                isBandList: band.isBandList,
                isMainList: false,
                songs:band.bandsongs
            } as songlist;
        });
    }

    const songListOrder: Array<string> = Object.keys(songLists);

    const setlistKeys = Object.keys(songLists);
    // const setlistOrder = setlistKeys.length > 0 ? setlistKeys : [];

    return { songLists, songListOrder };
};
