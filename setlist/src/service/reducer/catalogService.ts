import { nameof } from "ts-simple-nameof"

import { ISongCatalog, CatalogType, ISetCatalog, IBandCatalog, IBandSummary, ISong, IFilterSongActionProps, ISongActionProps, INextLinkActionProps, Catalogs } from "../../models";
import { HashTable } from "../../Util/HashTable";
// import { ReadBandsSummaryAsync } from "../../api/bandApi";
import { ReadSetlistsFromBandAsync } from "../../api/setlistApi";
import { ReadSongsAsync, CreateSongAsync, UpdateSongAsync, DeleteSongAsync } from "../../service";
import { SongCatalog, BandCatalog, Song, FilterSongActionProps } from "../../mapping";
import { QueryBuilder, IsMiminumStringLength } from "../../Util";
import { ICatalogState, CatalogState } from "../../store";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";


export const fetchSongCatalogAsync = async (props: IFilterSongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { Filter, SongCatalogId } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Title), Filter.Title))
    }
    if (IsMiminumStringLength(Filter.Artist)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Artist), Filter.Artist))
    }
    if (IsMiminumStringLength(Filter.Genre)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<ISong>(x => x.Genre), Filter.Genre))
    }
    if (Filter.Nineties) {
        filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Nineties), 'eq', Filter.Nineties))
    }
    if (Filter.Evergreen) {
        filters.push(new FilterBuilder().filterExpression(nameof<ISong>(x => x.Evergreen), 'eq', Filter.Evergreen))
    }


    if (filters.length) {
        query.filter(x => filters.reduce((prev, current) => prev.and(x => current)))
    }

    query = query.orderBy(`${nameof<ISong>(x => x.Artist)},${nameof<ISong>(x => x.Title)}`)

    // query.select('My Properties')
    const filter = query.toQuery()

    const { NextLink, Values, Context, Count } = await ReadSongsAsync(filter);

    const prevSongCatalog = { ...catalogs[SongCatalogId] }

    const mappedValues = Values?.reduce((map, song) => {
        map.set(song.Id, song)
        return map
    }, new Map<string, ISong>())

    const songCatalog = SongCatalog.Create(Filter, { NextLink, Context, Count }, prevSongCatalog.CatalogOptions, mappedValues);

    const newCatalogs = { ...catalogs, [songCatalog.Id]: songCatalog } as HashTable<ISongCatalog>;

    return newCatalogs;
}

export const fetchSongCatalogNextLinkAsync = async (props: INextLinkActionProps, catalogs: HashTable<Catalogs>): Promise<HashTable<Catalogs>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { NextLink, Values, Context, Count } = await ReadSongsAsync(props.NextLink);

    const prevSongCatalog = { ...catalogs[props.CatalogId] }

    let newSongCatalog = SongCatalog.AddValues(prevSongCatalog, Values);
    newSongCatalog = SongCatalog.UpdateOData(newSongCatalog, { NextLink, Context, Count })

    const newCatalogs: HashTable<Catalogs> = { ...catalogs, [newSongCatalog.Id]: newSongCatalog }

    return newCatalogs
}

export const createEmptySongCatalog = (): ICatalogState => {

    const defaultActionProps = FilterSongActionProps.Default(SongCatalog.CatalogId)

    const songCatalog = SongCatalog.CreateAndUpdate(defaultActionProps.Filter, { NextLink: "", Count: 0, Context: "" }, { ShowAddSong: false });

    const catalogs = {} as HashTable<ISongCatalog>
    catalogs[songCatalog.Id] = songCatalog;

    const catalogsOrder: Array<string> = Object.keys(catalogs);

    return { catalogs, catalogsOrder } as ICatalogState

    /* const songs = await ReadSongsAsync();
    

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

    const bandsSummary = {} as HashTable<IBandSummary> //await ReadBandsSummaryAsync();

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

     return { catalogs: songLists, catalogsOrder: songListOrder , availableBandlists: bandsSummary  }
     */

};

export const addSongToSongCatalogAsync = async (props: ISongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { song, songCatalogId } = props
    const newSong = await CreateSongAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] };

    const newSongs: Map<string, ISong> = new Map([[newSong.Id, newSong]]);

    currentCatalog.Values.forEach((song, key) =>
        newSongs.set(key, song)
    )

    const newSongCatalog: ISongCatalog = {
        ...currentCatalog,
        Values: newSongs
    };

    const newSongCatalogs: HashTable<ISongCatalog> = {
        ...catalogs,
        [songCatalogId]: newSongCatalog
    };

    return newSongCatalogs;
};

export const editSongInCatalogAsync = async (props: ISongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { song, songCatalogId } = props
    const updatedSong: ISong = await UpdateSongAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] }
    currentCatalog.Values.set(updatedSong.Id, updatedSong);

    const newSongCatalogs: HashTable<ISongCatalog> = {
        ...catalogs,
        [songCatalogId]: currentCatalog
    };

    return newSongCatalogs;
}

export const deleteSongInCatalogAsync = async (props: ISongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { song, songCatalogId } = props
    const deletedSong: ISong = await DeleteSongAsync(song.Id)

    const currentCatalog = { ...catalogs[songCatalogId] }
    currentCatalog.Values.delete(deletedSong.Id);

    const newSongCatalogs: HashTable<ISongCatalog> = {
        ...catalogs,
        [songCatalogId]: currentCatalog
    };

    return newSongCatalogs;
}

export const filterSongCatalogAsync = async (props: IFilterSongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {

    const { Filter, Refresh: ToBeUpdated } = props
    const query = new QueryBuilder().count()


    if (IsMiminumStringLength(Filter.Title)) {
        query.filter(f => f.startsWithFilterExpression(nameof<ISong>(x => x.Title), Filter.Title))
    }
    query.orderBy(nameof<ISong>(x => x.Title))

    // query.select('My Properties')
    query.toQuery()

    return catalogs
}
