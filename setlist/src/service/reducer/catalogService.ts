import { nameof } from "ts-simple-nameof"

import { ISongCatalog, CatalogType, ISetCatalog, IBandCatalog, IBandSummary, ISong, IFilterSongActionProps, INewSongActionProps, INextLinkActionProps, Catalogs } from "../../models";
import { HashTable } from "../../Util/HashTable";
// import { ReadBandsSummaryAsync } from "../../api/bandApi";
import { ReadSetlistsFromBandAsync } from "../../api/setlistApi";
import { ReadSongsAsync, CreateSongAsync } from "../../service";
import { SongCatalog, BandCatalog, Song, FilterSongActionProps } from "../../mapping";
import { QueryBuilder, IsMiminumStringLength } from "../../Util";
import { ICatalogState, CatalogState } from "../../store";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";


export const FetchSongCatalogAsync = async (props: IFilterSongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { Filter,SongCatalogId } = props
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

    const { NextLink, Values: Values, Context, Count } = await ReadSongsAsync(filter);

    const prevSongCatalog = {...catalogs[SongCatalogId]}

    const songCatalog = SongCatalog.Create(Filter, { NextLink, Context, Count },prevSongCatalog.CatalogOptions, Values);

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

export const AddSongToSongCatalogAsync = async (props: INewSongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {

    const { song, songCatalogId } = props
    const newSong = await CreateSongAsync(song)

    if (catalogs == null) { throw ("catalogs are null") }

    const currentSongCatalog = { ...catalogs[songCatalogId] };
    const newSongs = Array.from(currentSongCatalog.Values);
    newSongs.push(newSong);

    const newSongCatalog: ISongCatalog = {
        ...currentSongCatalog,
        Values: newSongs
    };

    const newSongCatalogs: HashTable<ISongCatalog> = {
        ...catalogs,
        [songCatalogId]: newSongCatalog
    };

    return newSongCatalogs;
};

export const FilterSongCatalogAsync = async (props: IFilterSongActionProps, catalogs: HashTable<ISongCatalog>): Promise<HashTable<ISongCatalog>> => {

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
