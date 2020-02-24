import { ISonglist, IApiBandlist, SonglistType } from "../models";

export const ToBandlist = (songlist: ISonglist): IApiBandlist => {
    return { id: songlist.id, title: songlist.title, bandsongs: [], setlists: [] } as IApiBandlist;
};
export const ToSonglist = (bandlist: IApiBandlist): ISonglist => {
    return {
        id: bandlist.id,
        title: bandlist.title,
        songlistType: SonglistType.BandList,
        songs: bandlist.bandsongs
    } as ISonglist;
};
