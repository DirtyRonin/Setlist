import { HashTable } from "../Util";
import { song, songlist } from "../models";

export const GetSongIdsInBandlists = (bands: HashTable<songlist>, songId: string): HashTable<string[]> => {
    const readOnlyBands = { ...bands };
    const bandIds = Object.keys(readOnlyBands);

    const hashBandIds: HashTable<string[]> = bandIds.reduce((hashedBandIds, bandId) => {
        hashedBandIds[bandId] = readOnlyBands[bandId].songs
            .filter(song => song.id === songId)
            .map(song => {
                return { songId };
            });
        return hashedBandIds;
    }, {} as HashTable<any>);

    return hashBandIds;
};

export const RemoveSongFromSonglists = (songlist: HashTable<songlist>, songId: string): HashTable<songlist> => {
    const readOnlySonglist = { ...songlist };
    const songlistIds = Object.keys(readOnlySonglist);

    const newSonglist: HashTable<songlist> = songlistIds.reduce((tempSonglist, songlistId) => {
        const newSongs:song[] = readOnlySonglist[songlistId].songs
            .filter(song => song.id !== songId)
            .map(song => {
                return { ...song };
            });

            tempSonglist[songlistId] = {...readOnlySonglist[songlistId], songs: newSongs} as songlist

        return tempSonglist;
    }, {} as HashTable<any>);

    return newSonglist;
};
