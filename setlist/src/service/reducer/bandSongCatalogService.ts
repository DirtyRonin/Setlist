import { Catalog, IStatusBandSongCatalogActionProps, IFilterBandSongActionProps, IBandSong, IBandSongCatalog, IBandSongCatalogOptions, ISong, INextLinkActionProps } from "../../models";
import { FilterBandSongActionProps, BandSongCatalog } from "../../mapping";
import { ICatalogState } from "../../store";
import { HashTable, QueryBuilder, IsMiminumStringLength } from "../../Util";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";
import { nameof } from "ts-simple-nameof";
import { ReadBandSongsAsync } from "..";

export const createEmptyBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

    const { bandId } = props;
    const { catalogs, catalogsOrder, modal } = catalogState

    const defaultActionProps = FilterBandSongActionProps.Default(bandId)

    //get bandSong Title only until it will be delievered by fetch
    const parentName = catalogs['Band Catalog_id'].Values.get(bandId)?.Title

    const bandSongCatalog = BandSongCatalog.CreateAndUpdate(bandId, defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {}, undefined, parentName);

    

    const newCatalogs: HashTable<Catalog> = { ...catalogs, [bandSongCatalog.Id]: bandSongCatalog };

    const newCatalogsOrder: Array<string> = [...catalogsOrder, bandSongCatalog.Id]

    return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
}

export const fetchBandSongCatalogAsync = async (props: IFilterBandSongActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { filter: Filter, catalogId: BandCatalogId } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    const songExpand = `${nameof<IBandSong>(x => x.Song)}`

    filters.push(new FilterBuilder().filterGuidExpression(nameof<IBandSong>(x => x.BandId), 'eq', Filter.BandId))
    
    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Title)}`, Filter.Title))
    }
    if (IsMiminumStringLength(Filter.Artist)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Artist)}`, Filter.Artist))
    }
    if (IsMiminumStringLength(Filter.Genre)) {
        filters.push(new FilterBuilder().containsFilterExpression(`${songExpand}/${nameof<ISong>(x => x.Genre)}`, Filter.Genre))
    }
    if (Filter.Nineties) {
        filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Nineties)}`, 'eq', Filter.Nineties))
    }
    if (Filter.Evergreen) {
        filters.push(new FilterBuilder().filterExpression(`${songExpand}/${nameof<ISong>(x => x.Evergreen)}`, 'eq', Filter.Evergreen))
    }
    // example expand and filter
    // https://stackoverflow.com/questions/51525409/odata-multiple-expands-and-filter
    // e.g. https://localhost:5001/odata/BandSongs/?$expand=Song&$filter=song/title eq 'No Limit'
    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    //query = query.orderBy(`${nameof<IBandSong>(x => x.Song.Title)}`)

    query.expand(songExpand)

    const filter = query.toQuery()

    const { NextLink, Values, Context, Count } = await ReadBandSongsAsync(filter);

    const prevBandSongCatalog = { ...catalogs[BandCatalogId] } as IBandSongCatalog

    const mappedValues = Values?.reduce((map, bandSong) => {
        map.set(bandSong.Id, bandSong)
        return map
    }, new Map<string, IBandSong>())

    return BandSongCatalog.Create(Filter.BandId, Filter, { NextLink, Context, Count }, prevBandSongCatalog.CatalogOptions, mappedValues, prevBandSongCatalog.Title);
}

export const fetchBandSongCatalogNextLinkAsync = async (props: INextLinkActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { NextLink, Values, Context, Count } = await ReadBandSongsAsync(props.nextLink);

    const prevBandSongCatalog = { ...catalogs[props.catalogId] } as IBandSongCatalog

    const newSongCatalog = BandSongCatalog.AddValues(prevBandSongCatalog, Values);
    return BandSongCatalog.UpdateOData(newSongCatalog, { NextLink, Context, Count })
}

export const closeBandSongCatalog = (props: IStatusBandSongCatalogActionProps, catalogState: ICatalogState): ICatalogState => {

    const { bandId: parentId } = props;
    const { catalogs, catalogsOrder, modal } = catalogState

    const bandSongCatalogId = BandSongCatalog.GetCatalogId(parentId);

    const newCatalogs: HashTable<Catalog> = { ...catalogs };
    delete newCatalogs[bandSongCatalogId];

    const newCatalogsOrder: Array<string> = catalogsOrder.filter(order => order !== bandSongCatalogId)

    return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
}