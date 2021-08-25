import { BandCatalog, Band } from "mapping";
import { QueryBuilder, IsMiminumStringLength, FilterBuilder } from "utils";
import { IFilterBandActionProps, IBand, INextLinkActionProps, IBandEntityActionProps, IComponentOrder, DisplayIn, IFilterBandActionResult } from "models";
import { nameof } from "ts-simple-nameof";
import { ReadBandsAsync, CreateBandAsync, UpdateBandAsync, DeleteBandAsync } from "..";



export const createEmptyBandCatalog = (): IComponentOrder => ({
    id: BandCatalog.CatalogId,
    displayIn: DisplayIn.Main,
    value: BandCatalog.CreateAndUpdate()
})

export const fetchBandCatalogAsync = async (props: IFilterBandActionProps): Promise<IFilterBandActionResult> => {

    const { filter: Filter } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    // const expand = `bandsong`
    // filters.push(new FilterBuilder().filterGuidExpression(`${expand}/${nameof<IBandSong>(x => x.BandId)}`,'eq', Filter.Title))

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<IBand>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<IBand>(x => x.Title)}`)

    const filter = query.toQuery()

    return await GetFilterBandActionResult(filter)
}

export const fetchBandCatalogNextLinkAsync = async (props: INextLinkActionProps): Promise<IFilterBandActionResult> =>
    await GetFilterBandActionResult(props.nextLink)


const GetFilterBandActionResult = async (filterQuery: string): Promise<IFilterBandActionResult> => {
    const { NextLink, Values, Context, Count } = await ReadBandsAsync(filterQuery);

    return {
        Values: Values?.reduce((map, band) => {
            map.set(band.Id, band)
            return map
        }, new Map<string, IBand>()),
        OData: { NextLink, Context, Count }
    }
}

export const addBandToBandCatalogAsync = async (props: IBandEntityActionProps): Promise<IBand> =>
    await CreateBandAsync(props.value)

export const editBandInCatalogAsync = async (props: IBandEntityActionProps): Promise<IBand> =>
    await UpdateBandAsync(props.value)

export const deleteBandInCatalogAsync = async (props: IBandEntityActionProps): Promise<string> =>
    (await (DeleteBandAsync(props.value.Id))).Id

export const fetchBandById = async (id: string): Promise<IBand> => {
    let query = new QueryBuilder()
    query.filter(() => new FilterBuilder().filterGuidExpression(nameof<IBand>(x => x.Id), 'eq', id))
    const filter = query.toQuery()

    const band = (await GetFilterBandActionResult(filter)).Values.get(id) ?? Band.EmptyBand()
    return band
}
