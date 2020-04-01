import { IApiBandlist, CatalogType, IBandCatalog, IBandSongRef, ISetCatalog, IApiSetList, ISetSongRef } from "../models";
import { ReadSongsFromBand } from ".";

// export const ToApiBandlist = (bandlist: IBandCatalog): IApiBandlist => {
//     const { Id: id, Title: title, Songs: songs } = bandlist;
//     return {
//         Id:id,
//         Title: title,
//         Bandsongs: songs ? songs.map(song => { return { SongId: song.Id } as IBandSongRef }) : [],
//         Setlists: []
//     } as IApiBandlist;
// };
// export const ToBandlistAsync = async (apiBandlist: IApiBandlist): Promise<IBandCatalog> => {
//     const { Id: id, Title: title, Bandsongs: bandsongs } = apiBandlist;
//     return {
//         Id:id.toString(),
//         Title: title,
//         SonglistType: CatalogType.BandList,
//         Songs: bandsongs ? await ReadSongsFromBand(id) : []
//     } as IBandCatalog;
// };

// export const ToApiSetList = (setlist : ISetCatalog): IApiSetList => {
//     const { Id: id, Title: title, Songs: songs,BandId: bandId } = setlist;
    
//     return {
//         Id:id,
//         Title: title,
//         BandId:+bandId,
//         Setsongs : songs ? songs.map(song => { return { SongId: song.Id } as ISetSongRef }) : [],
//     }as IApiSetList
// }

// export const ToSetlistAsync = async (apiSetlist: IApiSetList): Promise<ISetCatalog> => {
//     const { Id: id, Title: title, Setsongs: setsongs ,BandId: bandId } = apiSetlist;
//     return {
//         Id:id.toString(),
//         Title: title,
//         BandId: bandId.toString(),
//         SonglistType: CatalogType.SetList,
//         // songs: setsongs ? await ReadSongsFromSetlist(id,bandId) : []
//         Songs: [],
//         ToBeUpdated:false
//     } as ISetCatalog;
// };