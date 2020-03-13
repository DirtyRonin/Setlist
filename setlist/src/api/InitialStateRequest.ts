import { IAppState } from "../App";
import { ISonglist, SonglistType, ISet, IBandlist, IBandSummary, ISong } from "../models";
import { HashTable } from "../Util/HashTable";
import { ReadBandsAsync, ReadBandsSummaryAsync } from "./bandApi";
import { ReadSetlistsFromBandAsync } from "./setlistApi";
import { ReadSongsAsync } from "../service";
import { CreateMainList } from "../mapping";

export const InitialStateRequest = async (): Promise<IAppState> => {
    const songs = await ReadSongsAsync();
    const bands = await ReadBandsAsync();
    // const setlists = await bands.reduce(async (setlists, band) => {
    //     const result = await setlists;
    //     return result.concat(await ReadSetlistsFromBandAsync(band.id));
    // }, Promise.resolve([] as ISet[]))

    const bandsSummary = {} as HashTable<IBandSummary> /* await ReadBandsSummaryAsync() */;

    const mainList = CreateMainList(songs);

    const songLists: HashTable<ISonglist> = {};
    songLists[mainList.id] = mainList;


    const setlists = [] as ISet[];

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
