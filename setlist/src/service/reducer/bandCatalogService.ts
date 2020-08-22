import { ICatalogState } from "../../store";
import { FilterBandActionProps, BandCatalog } from "../../mapping";
import { HashTable, QueryBuilder, IsMiminumStringLength } from "../../Util";
import { Catalog, IFilterBandActionProps, IBand, IBandCatalog, INextLinkActionProps, IEntityActionProps, IBandEntityActionProps } from "../../models";
import FilterBuilder from "../../Util/oDataQueryBuilder/queryBuilder";
import { nameof } from "ts-simple-nameof";
import { ReadBandsAsync, CreateBandAsync, UpdateBandAsync, DeleteBandAsync } from "..";


export const createEmptyBandCatalog = (catalogState: ICatalogState): ICatalogState => {
    const { catalogs, catalogsOrder, modal } = catalogState

    const defaultActionProps = FilterBandActionProps.Default(BandCatalog.CatalogId)

    const bandCatalog = BandCatalog.CreateAndUpdate(defaultActionProps.filter, { NextLink: "", Count: 0, Context: "" }, {});

    const newCatalogs: HashTable<Catalog> = { ...catalogs, [bandCatalog.Id]: bandCatalog };

    const newCatalogsOrder: Array<string> = [...catalogsOrder, bandCatalog.Id]

    return { catalogs: newCatalogs, catalogsOrder: newCatalogsOrder, modal } as ICatalogState
}

export const fetchBandCatalogAsync = async (props: IFilterBandActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { filter: Filter, catalogId: BandCatalogId } = props
    let query = new QueryBuilder().count()

    const filters: FilterBuilder[] = []

    if (IsMiminumStringLength(Filter.Title)) {
        filters.push(new FilterBuilder().containsFilterExpression(nameof<IBand>(x => x.Title), Filter.Title))
    }

    if (filters.length) {
        query.filter(() => filters.reduce((prev, current) => prev.and(() => current)))
    }

    query = query.orderBy(`${nameof<IBand>(x => x.Title)}`)

    const filter = query.toQuery()

    const { NextLink, Values, Context, Count } = await ReadBandsAsync(filter);

    const prevBandCatalog = { ...catalogs[BandCatalogId] } as IBandCatalog

    const mappedValues = Values?.reduce((map, band) => {
        map.set(band.Id, band)
        return map
    }, new Map<string, IBand>())

    return BandCatalog.Create(Filter, { NextLink, Context, Count }, prevBandCatalog.CatalogOptions, mappedValues);
}

export const fetchBandCatalogNextLinkAsync = async (props: INextLinkActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { NextLink, Values, Context, Count } = await ReadBandsAsync(props.nextLink);

    const prevBandCatalog = { ...catalogs[props.catalogId] } as IBandCatalog

    let newBandCatalog = BandCatalog.AddValues(prevBandCatalog, Values);
    return BandCatalog.UpdateOData(newBandCatalog, { NextLink, Context, Count })
}

export const addBandToBandCatalogAsync = async (props: IEntityActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value: song, catalogId: songCatalogId } = props as IBandEntityActionProps
    const newSong = await CreateBandAsync(song)

    const currentCatalog = { ...catalogs[songCatalogId] } as IBandCatalog;

    const newSongs: Map<string, IBand> = new Map([[newSong.Id, newSong]]);

    currentCatalog.Values.forEach((song, key) =>
        newSongs.set(key, song)
    )

    return {
        ...currentCatalog,
        Values: newSongs
    } as Catalog;
};

export const editBandInCatalogAsync = async (props: IEntityActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value, catalogId } = props as IBandEntityActionProps
    const updatedValue: IBand = await UpdateBandAsync(value)

    const currentCatalog = { ...catalogs[catalogId] } as IBandCatalog;
    currentCatalog.Values.set(updatedValue.Id, updatedValue);

    return currentCatalog
}

export const deleteBandInCatalogAsync = async (props: IEntityActionProps, catalogs: HashTable<Catalog>): Promise<Catalog> => {
    if (catalogs == null) { throw ("catalogs are null") }

    const { value, catalogId: songCatalogId } = props as IBandEntityActionProps
    const deletedValue: IBand = await DeleteBandAsync(value.Id)

    const currentCatalog = { ...catalogs[songCatalogId] }
    currentCatalog.Values.delete(deletedValue.Id);

    return currentCatalog
}
