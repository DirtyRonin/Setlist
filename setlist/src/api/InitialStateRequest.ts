import { IAppState } from "../App";
import { EndpointConfiguration } from "../Configuration";
import { ReadSongsAsync } from "./";
import { ISonglist, SonglistType, ISet, IBandlist, IBandSummary } from "../models";
import { HashTable } from "../Util/HashTable";
import { ReadBandsAsync, ReadBandsSummaryAsync } from "./bandApi";
import { ReadSetlistsFromBandAsync } from "./setlistApi";

export const InitialStateRequest = async (): Promise<IAppState> => {
    const endpointName = EndpointConfiguration.Songs.Name;
    const songs = await ReadSongsAsync();
    const bands = await ReadBandsAsync();
    // const setlists = await bands.reduce(async (setlists, band) => {
    //     const result = await setlists;
    //     return result.concat(await ReadSetlistsFromBandAsync(band.id));
    // }, Promise.resolve([] as ISet[]))

    const bandsSummary = {} as HashTable<IBandSummary> /* await ReadBandsSummaryAsync() */;

    const mainList = {
        id: "mainList_id",
        title: endpointName,
        songs: songs ? songs : [],
        songlistType: SonglistType.MainList
    } as ISonglist;

    const songLists: HashTable<ISonglist> = {};
    songLists[mainList.id] = mainList;

    
    const setlists=[] as ISet[];

    if (bands) {
        bands.forEach(band => {
            songLists[band.id] = band;
        });
    }
    if (setlists) {
        setlists.forEach(setlist => {
            songLists[setlist.id] = setlist;
        });
    }

    const songListOrder: Array<string> = Object.keys(songLists);

    const setlistKeys = Object.keys(songLists);
    // const setlistOrder = setlistKeys.length > 0 ? setlistKeys : [];

    return { songLists, songListOrder, availableBandlists: bandsSummary };
};
