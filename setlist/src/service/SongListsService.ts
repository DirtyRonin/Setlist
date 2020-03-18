import { HashTable } from "../Util";
import { ISong, ISongCatalog } from "../models";

export const GetSongIdsFromSonglists = (bands: HashTable<ISongCatalog>, songId: string): HashTable<string[]> => {
    const readOnlyBands = { ...bands };
    const bandIds = Object.keys(readOnlyBands);

    const hashBandIds: HashTable<string[]> = bandIds.reduce((hashedBandIds, bandId) => {
        hashedBandIds[bandId] = readOnlyBands[bandId].Songs
            .filter(song => song.Id.toString() === songId)
            .map(song => {
                return { songId };
            });
        return hashedBandIds;
    }, {} as HashTable<any>);

    return hashBandIds;
};

export const RemoveSongFromSonglists = (songlist: HashTable<ISongCatalog>, songId: string): HashTable<ISongCatalog> => {
    const readOnlySonglist = { ...songlist };
    const songlistIds = Object.keys(readOnlySonglist);

    const newSonglist: HashTable<ISongCatalog> = songlistIds.reduce((tempSonglist, songlistId) => {
        const newSongs:ISong[] = readOnlySonglist[songlistId].Songs
            .filter(song => song.Id.toString() !== songId)
            .map(song => {
                return { ...song };
            });

            tempSonglist[songlistId] = {...readOnlySonglist[songlistId], Songs: newSongs} as ISongCatalog

        return tempSonglist;
    }, {} as HashTable<any>);

    return newSonglist;
};
