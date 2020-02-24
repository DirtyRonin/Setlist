import { IAppState } from "../App";
import { EndpointConfiguration } from "../Configuration";
import { ReadSongsAsync } from "./";
import { ISonglist, SonglistType } from "../models";
import { HashTable } from "../Util/HashTable";
import { ReadBandsAsync, ReadBandsSummaryAsync } from "./bandApi";

export const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = EndpointConfiguration.Songs.Name;
    const songs = await ReadSongsAsync();
    const bands = await ReadBandsAsync();
    const bandsSummary = await ReadBandsSummaryAsync();

    const mainList = {
        id: "mainList_id",
        title: endpointName,
        songs: songs ? songs : [],
        songlistType: SonglistType.MainList
    } as ISonglist;

    const songLists: HashTable<ISonglist> = {};
    songLists[mainList.id] = mainList;

    if (bands) {
        bands.forEach(band => {
            songLists[band.id] = band;
        });
    }

    const songListOrder: Array<string> = Object.keys(songLists);

    const setlistKeys = Object.keys(songLists);
    // const setlistOrder = setlistKeys.length > 0 ? setlistKeys : [];

    return { songLists, songListOrder, availableBandlists: bandsSummary };
};
