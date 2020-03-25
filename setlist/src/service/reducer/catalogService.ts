import { ISongCatalog, SongCatalogType, ISetCatalog, IBandCatalog, IBandSummary, ISong } from "../../models";
import { HashTable } from "../../Util/HashTable";
import {  ReadBandsSummaryAsync } from "../../api/bandApi";
import { ReadSetlistsFromBandAsync } from "../../api/setlistApi";
import { ReadSongsAsync,ReadBandsAsync, CreateSongAsync } from "../../service";
import { SongCatalog, BandCatalog } from "../../mapping";
import { QueryBuilder } from "../../Util";
import {  ICatalogState, INewSong } from "../../store";

export const InitialStateRequest = async (): Promise<ICatalogState> => {
    const songs = await ReadSongsAsync();
    

    // const song = new QueryBuilder().expand("Song").toQuery();
    const bandsongs = new QueryBuilder().expand(`BandSongs($expand=song)`).toQuery();

    const bands = await ReadBandsAsync(bandsongs);

//     const query = new QueryBuilder()
//   .count()
//   .top(5)
//   .expand('NavigationProp')
//   .orderBy('MyPriorityProp')
//   .filter(f => f.filterExpression('Property', 'eq', 'MyValue'))
//   .select('My Properties')
//   .toQuery()

    
    // const setlists = await bands.reduce(async (setlists, band) => {
    //     const result = await setlists;
    //     return result.concat(await ReadSetlistsFromBandAsync(band.id));
    // }, Promise.resolve([] as ISet[]))

    const bandsSummary = {} as HashTable<IBandSummary> /* await ReadBandsSummaryAsync() */;

    const songCatalog = SongCatalog.Create(songs);
    const bandlists = bands.map( band => BandCatalog.Create(band));

    const songLists: HashTable<ISongCatalog> = {};
    songLists[songCatalog.Id] = songCatalog;


    const setlists = [] as ISetCatalog[];

    if (bandlists) {
        bandlists.forEach(band => {
            songLists[band.Id] = band;
        });
    }
    if (setlists) {
        setlists.forEach(setlist => {
            songLists[setlist.Id] = setlist;
        });
    }

    const songListOrder: Array<string> = Object.keys(songLists);

    // const setlistKeys = Object.keys(songLists);

     return { catalogs: songLists, catalogsOrder: songListOrder/* , availableBandlists: bandsSummary */ };

};

export const AddSongToSongCatalog =async (props : INewSong,catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    
    const {song,songCatalogId} = props
    const newSong = await CreateSongAsync(song)

    const currentSongCatalog = catalogs[songCatalogId];
    const newSongs = Array.from(currentSongCatalog.Songs);
    newSongs.push(newSong);

    const newSongCatalog: ISongCatalog = {
        ...currentSongCatalog,
        Songs: newSongs
    };

    const newSongCatalogs: HashTable<ISongCatalog> = {
        ...catalogs,
        [songCatalogId]: newSongCatalog
    };

    return newSongCatalogs;
};
