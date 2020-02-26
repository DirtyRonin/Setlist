import { IApiBandlist, SonglistType, IBandlist, IBandSongRef, ISetlist, IApiSetList, ISetSongRef } from "../models";
import { ReadSongsFromBand } from ".";

export const ToApiBandlist = (bandlist: IBandlist): IApiBandlist => {
    const { id, title, songs } = bandlist;
    return {
        id,
        title,
        bandsongs: songs ? songs.map(song => { return { songId: song.id } as IBandSongRef }) : [],
        setlists: []
    } as IApiBandlist;
};
export const ToBandlistAsync = async (apiBandlist: IApiBandlist): Promise<IBandlist> => {
    const { id, title, bandsongs } = apiBandlist;
    return {
        id,
        title,
        songlistType: SonglistType.BandList,
        songs: bandsongs ? await ReadSongsFromBand(id) : []
    } as IBandlist;
};

export const ToApiSetList = (setlist : ISetlist): IApiSetList => {
    const { id, title, songs } = setlist;
    
    return {
        id,
        title,
        setsongs : songs ? songs.map(song => { return { songId: song.id } as ISetSongRef }) : [],
    }as IApiSetList
}

export const ToSetlistAsync = async (apiSetlist: IApiSetList,bandId :string): Promise<ISetlist> => {
    const { id, title, setsongs } = apiSetlist;
    return {
        id,
        title,
        BandId:bandId,
        songlistType: SonglistType.SetList,
        // songs: setsongs ? await ReadSongsFromSetlist(id,bandId) : []
        songs: []
    } as ISetlist;
};
