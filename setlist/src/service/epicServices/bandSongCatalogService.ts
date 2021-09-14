import { nameof } from "ts-simple-nameof";

import { IFilterBandSongActionProps, IBandSong, ISong, INextLinkActionProps, IFilterBandSongActionResult, IBandSongEntityActionProps } from "models";
import { BandSong } from "mapping";
import {  QueryBuilder, IsMiminumStringLength,FilterBuilder } from "utils";
import { CreateBandSongAsync, DeleteBandSongAsync, ReadBandSongsAsync, UpdateBandSongAsync } from "..";



export const fetchBandSongCatalogAsync = async (props: IFilterBandSongActionProps): Promise<IFilterBandSongActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    const songExpand = `${nameof<IBandSong>(x => x.Song)}`

    filters.push(new FilterBuilder().filterGuidExpression(nameof<IBandSong>(x => x.BandId), 'eq', Filter.BandId))

    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Title)}`, Filter.Query))
    }
    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Artist)}`, Filter.Query))
    }
    if (IsMiminumStringLength(Filter.Query)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Genre)}`, Filter.Query))
    }
    // if (Filter.Nineties) {
    //     filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Nineties)}`, 'eq', Filter.Nineties))
    // }
    // if (Filter.Evergreen) {
    //     filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Evergreen)}`, 'eq', Filter.Evergreen))
    // }

    // example expand and filter
    // https://stackoverflow.com/questions/51525409/odata-multiple-expands-and-filter
    // e.g. https://localhost:5001/odata/BandSongs/?$expand=Song&$filter=song/title eq 'No Limit'
    
    
    //reduce all filter builders to one with all the fragments
    const result = filters.reduce((prev, current) => {
        const stuff = prev.or(()=>current)
        return stuff
    },new FilterBuilder())

    if (filters.length) {
        // concat the fragments with or and give it to the query
        query.filter(() => new FilterBuilder().or(() => result))
    }

    query = query.orderBy(`${songExpand}/${nameof<ISong>(x => x.Artist)},${songExpand}/${nameof<ISong>(x => x.Title)}`)

    query.expand(songExpand)

    const filter = query.toQuery()

    return await GetFilterBandSongActionResult(filter);
}

const GetFilterBandSongActionResult = async (filterQuery: string): Promise<IFilterBandSongActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadBandSongsAsync(filterQuery);

    return {
        Values: Values?.reduce((map, bandSong) => {
            map.set(bandSong.Id, bandSong)
            return map
        }, new Map<string, IBandSong>()),
        OData: { NextLink, Context, Count }
    }
}

export const fetchBandSongCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandSongActionResult> =>
    await GetFilterBandSongActionResult(props.nextLink)

export const NewBandSong = async (props: IBandSongEntityActionProps): Promise<IBandSong> =>
    await CreateBandSongAsync(props.value)

    export const editBandSongInCatalogAsync = async (props: IBandSongEntityActionProps): Promise<IBandSong> =>
    await UpdateBandSongAsync(props.value)

export const deleteBandSongInCatalogAsync = async (props: IBandSongEntityActionProps): Promise<string> =>
    (await (DeleteBandSongAsync(props.value.Id))).Id

export const fetchBandSongById = async (id: string): Promise<IBandSong> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<IBandSong>(x => x.Id), 'eq',id))
    
    const songExpand = `${nameof<IBandSong>(x => x.Song)}`
    query.expand(songExpand)
    
    const filter = query.toQuery()

    const bandSong = (await GetFilterBandSongActionResult(filter)).Values.get(id) ?? BandSong.EmptyBandSong()
    return bandSong
}
