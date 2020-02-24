import { ISonglist, IApiBandlist, SonglistType, IBandlist } from "../models";

export const ToApiBandlist = (bandlist: IBandlist): IApiBandlist => {
    const { id, title } = bandlist;
    return { id, title, bandsongs: [], setlists: [] } as IApiBandlist;
};
export const ToBandlist = (bandlist: IApiBandlist): IBandlist => {
    const { id, title, bandsongs } = bandlist;
    return { id, title, songlistType: SonglistType.BandList, songs: bandsongs } as IBandlist;
};
