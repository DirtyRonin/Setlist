import { HashTable } from "../Util";
import { ISong, ISonglist } from "../models";

export const GetSongIdsFromSonglists = (bands: HashTable<ISonglist>, songId: string): HashTable<string[]> => {
    const readOnlyBands = { ...bands };
    const bandIds = Object.keys(readOnlyBands);

    const hashBandIds: HashTable<string[]> = bandIds.reduce((hashedBandIds, bandId) => {
        hashedBandIds[bandId] = readOnlyBands[bandId].songs
            .filter(song => song.id.toString() === songId)
            .map(song => {
                return { songId };
            });
        return hashedBandIds;
    }, {} as HashTable<any>);

    return hashBandIds;
};

export const RemoveSongFromSonglists = (songlist: HashTable<ISonglist>, songId: string): HashTable<ISonglist> => {
    const readOnlySonglist = { ...songlist };
    const songlistIds = Object.keys(readOnlySonglist);

    const newSonglist: HashTable<ISonglist> = songlistIds.reduce((tempSonglist, songlistId) => {
        const newSongs:ISong[] = readOnlySonglist[songlistId].songs
            .filter(song => song.id.toString() !== songId)
            .map(song => {
                return { ...song };
            });

            tempSonglist[songlistId] = {...readOnlySonglist[songlistId], songs: newSongs} as ISonglist

        return tempSonglist;
    }, {} as HashTable<any>);

    return newSonglist;
};
