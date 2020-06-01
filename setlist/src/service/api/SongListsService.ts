import { HashTable } from "../../Util";
import { ISong, ISongCatalog } from "../../models";

export const GetSongIdsFromSonglists = (bands: HashTable<ISongCatalog>, songId: string): Map<string, string> => {
    const readOnlyBands = { ...bands };
    const bandIds = Object.keys(readOnlyBands);

    const hashBandIds: Map<string, string> = bandIds.reduce((mappedBandIds, bandId) => {
        if (readOnlyBands[bandId].Values.has(songId))
            mappedBandIds.set(bandId, songId)

        return mappedBandIds;
    }, new Map<string, string>());

    return hashBandIds;
};

export const RemoveSongFromSonglists = (songlist: HashTable<ISongCatalog>, songId: string): HashTable<ISongCatalog> => {
    const readOnlySonglist = { ...songlist };
    const songlistIds = Object.keys(readOnlySonglist);

    const newSonglist: HashTable<ISongCatalog> = songlistIds.reduce((tempSonglist, songlistId) => {
        if(readOnlySonglist[songlistId].Values.has(songId)){
            readOnlySonglist[songlistId].Values.delete(songId)
        }

        tempSonglist[songlistId] = readOnlySonglist[songlistId]

        return tempSonglist;
    }, {} as HashTable<any>);

    return newSonglist;
};
