import { IApiBandlist, SonglistType, IBandlist, IBandSongRef, ISet, IApiSetList, ISetSongRef } from "../models";
import { ReadSongsFromBand } from ".";

export const ToApiBandlist = (bandlist: IBandlist): IApiBandlist => {
    const { id, title, songs } = bandlist;
    return {
        id:+id,
        title,
        bandsongs: songs ? songs.map(song => { return { songId: song.id } as IBandSongRef }) : [],
        setlists: []
    } as IApiBandlist;
};
export const ToBandlistAsync = async (apiBandlist: IApiBandlist): Promise<IBandlist> => {
    const { id, title, bandsongs } = apiBandlist;
    return {
        id:id.toString(),
        title,
        songlistType: SonglistType.BandList,
        songs: bandsongs ? await ReadSongsFromBand(id) : []
    } as IBandlist;
};

export const ToApiSetList = (setlist : ISet): IApiSetList => {
    const { id, title, songs,bandId } = setlist;
    
    return {
        id:+id,
        title,
        bandId:+bandId,
        setsongs : songs ? songs.map(song => { return { songId: song.id } as ISetSongRef }) : [],
    }as IApiSetList
}

export const ToSetlistAsync = async (apiSetlist: IApiSetList): Promise<ISet> => {
    const { id, title, setsongs ,bandId } = apiSetlist;
    return {
        id:id.toString(),
        title,
        bandId: bandId.toString(),
        songlistType: SonglistType.SetList,
        // songs: setsongs ? await ReadSongsFromSetlist(id,bandId) : []
        songs: []
    } as ISet;
};